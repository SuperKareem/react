var newUserFormData =  [
  {
    name: 'comment',
    title: 'الأسم'
  },
  {
    name: 'username',
    title: 'اسم المستخدم'
  },
  {
    name: 'password',
    title: 'كلمة السر'
  },
  {
    name: 'macAddress',
    title: 'ماك'
  },
  {
    name: 'balance',
    title: 'الرصيد'
  },
  {
    name: 'mobile',
    title: 'رقم الموبايل'
  },
  {
    name: 'email',
    title: 'ملاحظات'
  },
]
var editUserFromData = [
  {
    name: 'name',
    title: 'اسم المستخدم'
  },
  {
    name: 'password',
    title: 'كلمة السر'
  },
  {
    name: 'comment',
    title: 'الأسم'
  },
  {
    name: 'offerEndDate',
    date: true,
    title: 'تاريخ الإنتهاء'
  },
  {
    name: 'balance',
    title: 'الرصيد'
  },
  {
    name: 'macAddress',
    title: 'ماك'
  },
  {
    name: 'mobile',
    title: 'رقم الموبايل'
  },
  {
    name: 'bytes-in',
    disabled: true,
    title: 'Download'
  },
  {
    name: 'bytes-out',
    disabled: true,
    title: 'Upload'
  },
  {
    name: 'limit-bytes-in',
    title: 'كوتة التحميل'
  },
  {
    name: 'limit-bytes-out',
    title: 'كوتة الرفع'
  },
  {
    name: 'uptime',
    disabled: true,
    title: 'Up Time'
  },
  {
    name: 'email',
    title: 'ملاحظات'
  },
]

var accountTypes = [
  {
    name: 'default',
    title: 'عادى'
  },
  {
    name: 'broadband',
    title: 'برود باند'
  }
]

export default {
  newUserFormData : newUserFormData,
  editUserFromData: editUserFromData,
  accountTypes: accountTypes,
}
