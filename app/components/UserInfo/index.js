/**
*
* UserInfo
*
*/

import React from 'react';
import CircularProgress from 'components/CircularProgress'

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import formatDate from 'utils/formatingDate'
import {
  Paper,RaisedButton
} from 'material-ui'
var colors = [
  '#00BFA5','#FFD600','#FF6D00','#DD2C00'
]
class UserInfo extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let {user} = this.props;
    let downloadLimit = parseFloat(user["limit-bytes-in"]);
    let userDownloaded = parseFloat(user["bytes-in"]);
    let downloadPercentage = ((userDownloaded * 100) / downloadLimit)
    let offerEndDate = new Date(user._doc.offerEndDate).toDateString();

    var date1 = new Date(user._doc.offerEndDate);
    var date2 = new Date();
    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let index = 0;
    if(downloadPercentage > 45)
      index = 1
    if(downloadPercentage > 60)
      index = 2
    if(downloadPercentage > 79)
      index = 3
    return (
      <div className={classNames("userInfo")}>
          <div className={classNames("infoContainer")}>
            <Paper className={classNames("info")}>
              <div className={classNames("row")}>
                <span className={classNames("mainColor")}>أسم المستخدم</span>
                <span className={classNames("secColor")}>{user.name}</span>
              </div>
              <div className={classNames("row")}>
                <span className={classNames("mainColor")}>العرض</span>
                <span className={classNames("secColor")}>{user._doc.offerHasEnd ? "انت غير مشترك بعرض" : user.profile}</span>
              </div>
              <div className={classNames("row")}>
                <span className={classNames("mainColor")}>كمية التحميل</span>
                <span className={classNames("secColor")}>GB {userDownloaded} / GB {downloadLimit} </span>
              </div>
              {!user._doc.offerHasEnd ?
                <div className={classNames("")}>
                  <div className={classNames("row")}>
                    <span className={classNames("mainColor")}>تاريح انتهاء العرض</span>
                    <span className={classNames("secColor")}>{formatDate(offerEndDate)}</span>
                  </div>
                  <div className={classNames("row")}>
                    <span className={classNames("mainColor")}>الايام المتبقية</span>
                    <span className={classNames("secColor")}>{diffDays} يوم</span>
                  </div>
                </div> :
                null}
            </Paper>
            <div className={classNames("")}>
              <Paper className={classNames("downloadCircle")}>
                <span>كمية التحميل</span>
                <CircularProgress
                  radius={70}
                  percentage={downloadPercentage}
                  strokeWidth={10}
                  color={colors[index]}
                  />
              </Paper>
            </div>
          </div>
      </div>
    );
  }
}

export default UserInfo;
