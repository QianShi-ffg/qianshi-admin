export default function(time) {
  const newDate = new Date(time)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  month = month < 10 ? '0' + month : month
  const day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate() 
  return `${year}年${month}月${day}日`
}
