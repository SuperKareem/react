export default function formatLog(log) {
  let formatedLog = {}
  switch (log.action) {
    case "add":
      formatedLog.action = "إضافة"
      break;
    case "edit":
      formatedLog.action = "تعديل بيانات"
      break;
    case "delete":
      formatedLog.action = "حذف"
      break;
    case "charge":
      formatedLog.action = "شحن"
      break;
    case "subscribe":
      formatedLog.action = " تجديد الاشتراك علي "
      break;
  }
  switch (log.type) {
    case "serial":
      formatedLog.type = "كرت بـ"
      break;
    case "account":
      formatedLog.type = "المشترك"
      break;
    case "offer":
      formatedLog.type = "عرض"
      break;

  }

  let date = new Date(log.date)
  let h = date.getHours();
  let m = date.getMinutes();
  let am = ""
  if(h > 12 ){
    h = h - 12
    am = "pm"
  }else{
    am = "am"
  }
  if(m < 9){
    m = `0${m}`
  }
  if(h < 9){
    h = `0${h}`
  }
  let time = `${h} : ${m} ${am}`;
  formatedLog.time = time;
  return formatedLog;
}
