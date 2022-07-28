export default function(time) {
  const newDate = new Date(time)
  const year = newDate.getFullYear()
  const month = newDate.getMonth()
  const day = newDate.getDay()
  return `${year}年${month}月${day}日`
}
