const express = require("express");
const puppeteer = require("puppeteer");
const dayjs = require("dayjs");
// 创建服务器router
const router = express.Router();
// 文件处理
const upload = require("./modules/uploadImg");
// 引入连接池
const { conn, pool } = require("../mysql/index");
const axios = require("axios");

let refresh_token =
  "122.3c6c1b35141ce423a52faa540654abf3.YnLXYMxlTALa6H-WBLDwxaoVt7G98bNGQ8ea1i8.6oa3ug";
let access_token =
  "121.4c902ca467c6a88f5f16e19f07c38270.YgfKog-oMaQhvrzCHKegCzlUyFUsSwdXsxdQ4Tw.5WAKUw";
let expires_in = "";
const apiKey = "PLFuZ5UHascuRd9cANO6SrMdP8GhX6lF";
const secretKey = "rYhbIuz4YWqK3PTNqzpK5xRzGGpNjbp1";
// 注册
router.post("/signUp", async (req, res) => {
  console.log(req.body);
  const { name, password } = req.body;
  const sql1 = `select count(name) from user where name='${name}';`;
  const sql2 = "insert into user set ?;";
  const data = { name, password };
  const results = await conn(sql1);
  if (results.code === 200) {
    if (results.data[0]["count(name)"] === 0) {
      const results = await conn(sql2, data);
      res.json(results);
    } else {
      res.json({ code: 200, msg: "该名称已被注册" });
    }
  } else {
    res.json(results);
  }
});

// 登录
router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const sql = `select * from user where name='${name}' and password='${password}';`;
  const results = await conn(sql);
  if (results.code === 200) {
    if (results.data.length !== 0) {
      res.json(results);
    } else {
      res.json({ code: 200, msg: "该账号不存在，请先注册后再次尝试" });
    }
  } else {
    res.json(results);
  }
});

router.get("/overview", (req, res) => {
  console.log(dayjs().subtract(90, "day").format("YYYYMMDD"));
  const params = {
    access_token: access_token,
    site_id: "18341059",
    method: "overview/getTimeTrendRpt",
    start_date: "20220701",
    end_date: dayjs().format("YYYYMMDD"),
    metrics: "pv_count,visitor_count",
  };
  axios
    .get("https://openapi.baidu.com/rest/2.0/tongji/report/getData", {
      params: {
        access_token: access_token,
        site_id: "18341059",
        method: "overview/getTimeTrendRpt",
        start_date: dayjs().subtract(90, "day").format("YYYYMMDD"),
        end_date: dayjs().format("YYYYMMDD"),
        metrics: "pv_count,visitor_count",
      },
    })
    .then((result) => {
      if (result.data && result.data.error_code === 111) {
        res.json({
          code: 111,
          data: result.data.result,
          message: "token过期,正在重新刷新token",
        });
      }
      res.json({
        code: 200,
        data: result.data.result,
        message: "获取数据成功",
      });
    })
    .catch((err) => {
      console.log(err, 666);
      if (err.data && err.data.error_code === 110) {
        res.json({
          code: 110,
          data: [],
          message: "token过期,正在重新刷新token",
        });
      }
    });
});

router.get("/refreshToken", (req, res) => {
  axios({
    url: "http://openapi.baidu.com/oauth/2.0/token",
    method: "get",
    params: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
      client_id: apiKey,
      client_secret: secretKey,
    },
  })
    .then((result) => {
      refresh_token = result.data.refresh_token;
      access_token = result.data.access_token;
      expires_in = result.data.expires_in;
      res.json({ code: 200, data: result.data, message: "获取数据成功" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ code: 2001, message: err.data });
    });
});

// 获取文章列表
router.get("/articleList", async (req, res) => {
  const { page, pageSize } = req.query;
  let sql = "";
  if (req.query.id) {
    sql = `select * from articleList where id=${req.query.id}`;
  } else {
    sql = `select * from articleList order by id DESC limit ${
      (page - 1) * pageSize
    },${pageSize}`;
  }
  const results1 = await conn(sql, null);
  const sqlS = "select count(*) from articleList";
  const results2 = await conn(sqlS, null);
  res.json({
    code: 200,
    data: results1.data,
    total: results2.data[0]["count(*)"],
    msg: results1.msg,
  });
});

// 获取文章列表(博客端)
router.get("/publishArticleList", async (req, res) => {
  const { page, pageSize } = req.query;
  let sql = "";
  let countSql = "";
  // 所有文章总数
  const sqlS = "select count(*) from articleList where articleStatus=1";
  // 条件查询
  if (req.query.type) {
    // 点击分类后的查询
    if (req.query.type === "category") {
      sql = `select * from articleList where classifyId=${
        req.query.id
      } and articleStatus=1 limit ${(page - 1) * pageSize},${pageSize}`;
      countSql = `select count(*) from articleList where classifyId=${req.query.id} and articleStatus=1`;
    }
  } else {
    // 查询某一文章具体信息
    if (req.query.id) {
      sql = `select * from articleList where id=${req.query.id} and articleStatus=1`;
      const results = await conn(sql, null);
      res.json(results);
      return;
    } else {
      sql = `select * from articleList where articleStatus=1 order by id DESC limit ${
        (page - 1) * pageSize
      },${pageSize}`;
      countSql = "select count(*) from articleList where articleStatus=1";
    }
  }
  const results1 = await conn(sql, null);
  const results2 = await conn(countSql, null);
  const results3 = await conn(sqlS, null);
  res.json({
    code: 200,
    data: {
      rows: results1.data,
      conditionTotal: results2.data[0]["count(*)"], // 条件查询后的总数
      total: results3.data[0]["count(*)"],
    }, // 所有文章总数
    msg: results1.msg,
  });
});

// 保存草稿
router.post("/saveDraft", async (req, res) => {
  console.log(req.query, req.params, req.body);
  const {
    id,
    title,
    articleContent,
    articleStatus,
    classifyId,
    describe,
    coverUrl,
  } = req.body;
  let sql = "";
  let saveSql = "";
  let data = null;
  if (id) {
    sql = `select * from articleList where id=${id}`;
    const results = await conn(sql, null);
    if (results.code === 200) {
      saveSql = "update articleList set ?  where id=?";
      data = [
        {
          id,
          title,
          articleContent,
          articleStatus,
          classifyId,
          describe,
          coverUrl,
        },
        id,
      ];
      res.json(await conn(saveSql, data));
    } else {
      res.json(results);
    }
  } else {
    saveSql = "insert into articleList set ?;";
    // const returnSql = 'select max(id) from articleList;'
    const returnSql = "SELECT LAST_INSERT_ID();";
    data = {
      title,
      articleContent,
      articleStatus,
      classifyId,
      describe,
      coverUrl,
    };
    const results = await conn(saveSql, data);
    if (results.code === 200) {
      console.log(results.code);
      const res1 = await conn(returnSql, data);
      console.log(res1);
      res1.data = { id: res1.data[0]["LAST_INSERT_ID()"] };
      console.log(res1.data, 9999);
      res.json(res1);
    } else {
      res.json(results);
    }
  }
});

//发布
router.put("/publish", async (req, res) => {
  const { id } = req.body;
  let sql = "";
  if (id.split(",").length > 1) {
    sql = `update articleList set articleStatus = 1  where id in (${id})`;
  } else {
    sql = `update articleList set articleStatus = 1  where id=${id}`;
  }
  const results = await conn(sql);
  res.json(results);
});

// 删除文章
router.delete("/deleteArticle", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  let sql = "";
  if (id.split(",").length > 1) {
    sql = `delete from articleList where id in (${id})`;
  } else {
    sql = `delete from articleList where id=${id}`;
  }
  const results = await conn(sql);
  res.json(results);
});

// 图片上传
router.post("/uploadImg", upload.array("file", 10), (req, res) => {
  const data = req.files.map((item) => {
    console.log("文件类型：%s", item.mimetype);
    console.log("原始文件名：%s", item.originalname);
    console.log("文件大小：%s", item.size);
    console.log("文件保存路径：%s", item.path);
    console.log("文件新名称：%s", item.filename);
    const obj = {
      mimetype: item.mimetype,
      originalname: item.originalname,
      size: item.size,
      path: `/public/uploads/${item.filename}`,
    };
    return obj;
  });
  res.json({ code: 200, data: data });
});

// 获取分类列表
router.get("/classifyList", async (req, res) => {
  const sql = `select * from classifylist order by id desc`;
  const results = await conn(sql, null);
  res.json(results);
});

// 获取文章分类列表
router.get("/artClassifyList", async (req, res) => {
  const sql = `select a.*, count(*) as 'artNum' from classifylist as a 
  INNER JOIN articlelist as b 
  WHERE a.id = b.classifyId
  GROUP BY a.id
  order by id asc
  `;
  const results = await conn(sql, null);
  res.json(results);
});

// 添加分类
router.post("/saveClassify", async (req, res) => {
  const { name, describe } = req.body;
  const sql = "insert into classifyList set ?;";
  const data = { name, describe };
  const results = await conn(sql, data);
  res.json(results);
});

// 查询友链
router.get("/friendShipList", async (req, res) => {
  const sql = "select * from friendShip";
  const results = await conn(sql, null);
  // results.data.map(async(item) => {
  //   return await init(item)
  // })
  res.json(results);
});

const setScreenShot = async (item) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  if (item.blogUrl !== "https://www.candy.icu/") {
    const rres = await page.goto(item.blogUrl); //对整个页面截图
    console.log(rres, 8555);
    await page.waitForTimeout(5000);
    await page.screenshot({
      path: `./public/screenshot/${item.id}.png`, //图片保存路径
      type: "png",
      fullPage: false, //边滚动边截图
    });
    const sql = "update friendShip set ?  where id=?";
    const data = [{ screenshot: `/public/screenshot/${item.id}.png` }, item.id];
    const results = await conn(sql, data);
    console.log(results);
    console.log("OK");
  }
  return `/public/screenshot/${item.id}.png`;
};
module.exports = router;
