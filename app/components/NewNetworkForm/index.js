/**
*
* NewNetworkForm
*
*/

import React from 'react';


import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import {
  Paper,
  TextField,
  RaisedButton
 } from 'material-ui'
class NewNetworkForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    networkForm: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired,
      password: React.PropTypes.string.isRequired,
      networkName: React.PropTypes.string.isRequired,
      mikrotikIp: React.PropTypes.string.isRequired,
    }),
    onNetworkFormDataChanged: React.PropTypes.func.isRequired
  }
  render() {
    let {
      networkForm,
      onNetworkFormDataChanged
    } = this.props;
    return (
      <div dir="rtl" className={classNames("addNewNetwork")}>
          <div className={classNames("addNewNetworkContainer")}>
            <TextField
              floatingLabelText=" أسم الشبكة"
              fullWidth={true}
              defaultValue={networkForm.networkName}
              onChange={(e) => {
                onNetworkFormDataChanged({...networkForm,...{networkName: e.target.value}})
              }}
              /><br />
            <TextField
              floatingLabelText=" IP السيرفر"
              fullWidth={true}
              defaultValue={networkForm.mikrotikIp}
              onChange={(e) => {
                onNetworkFormDataChanged({...networkForm,...{mikrotikIp: e.target.value}})
              }}
              /><br />
            <TextField
              floatingLabelText="أسم المستخدم"
              fullWidth={true}
              defaultValue={networkForm.username}
              onChange={(e) => {
                onNetworkFormDataChanged({...networkForm,...{username: e.target.value}})
              }}
              /><br />
            <TextField
              floatingLabelText="كلمة السر"
              fullWidth={true}
              defaultValue={networkForm.password}
              onChange={(e) => {
                onNetworkFormDataChanged({...networkForm,...{password: e.target.value}})
              }}
              /><br />
          </div>
      </div>
    );
  }
}

export default NewNetworkForm;
