// 导入vue
import Vue from 'vue'
// 按需导入需要的组件
import {
  DatePicker,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Dialog,
  Menu,
  Submenu,
  MenuItem,
  Input,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  Form,
  FormItem,
  Tag,
  Icon,
  Upload,
  Card,
  Container,
  Header,
  Aside,
  Main,
  MessageBox,
  Message
} from 'element-ui'
// 注册组件
Vue.use(DatePicker)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Tag)
Vue.use(Icon)
Vue.use(Upload)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
// 注册方法
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
