window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  console.log(e.matches)
  if (e.matches) {
    // 系统开启暗色模式后做什么
    return 
  } else {
    // 系统关闭暗色模式后做什么
  }
})

if (window.matchMedia('prefers-color-scheme: dark').matches) {
  // 是暗色模式做什么
} else {
  // 非暗色模式做什么
}