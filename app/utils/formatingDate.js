export default function formatDate(currentDate) {
  var monthNames = [
    "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12"
  ];

  var dayNames = [
    "الاحد" , "الاتنين" , "الثلاثاء", "الأربعاء" , "الخميس" , "الجمعة" , "السبت"
  ]
  let date = new Date(currentDate);
  var day = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();
  var dayNum = date.getDate();
  let formatedDate = `${dayNames[day]} ${dayNum} / ${monthNames[month]} / ${year}`
  if(formatedDate.indexOf("NaN") != -1){
    return "غير مشترك بعرض"
  } else {
    return formatedDate
  }
}
