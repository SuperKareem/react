/**
*
* Signin
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import {
  TextField, RaisedButton, Paper
 } from 'material-ui'
class Signin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    username: React.PropTypes.string.isRequired,
    password: React.PropTypes.string.isRequired,
    onSigninClick: React.PropTypes.func.isRequired,
    onUsernameChange: React.PropTypes.func.isRequired,
    onPasswordChange: React.PropTypes.func.isRequired
  }
  render() {
    let {
      username,
      password,
      onSigninClick,
      onUsernameChange,
      onPasswordChange
    } = this.props;
    return (
      <div className={classNames("signin")}>
        <Paper>
          <div className={classNames("signinContainer")}>
            <h1>تسجيل الدخول</h1>
            <TextField
              floatingLabelText="أسم المستخدم"
              fullWidth={true}
              defaultValue={username}
              onChange={(e) => {
                onUsernameChange(e)
              }}
              /><br />
            <TextField
              floatingLabelText="كلمة السر"
              fullWidth={true}
              defaultValue={password}
              onChange={(e) => {
                onPasswordChange(e)
              }}
              /><br />
            <RaisedButton
              label="تسجيل الدخول"
              primary={true}
              onClick={()=>{
                onSigninClick(username, password)
              }}
              />
          </div>
        </Paper>
      </div>
    );
  }
}

export default Signin;
