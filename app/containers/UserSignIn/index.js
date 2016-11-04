/*
 *
 * UserSignIn
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectUserSignIn from './selectors';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import { push } from 'react-router-redux'
var classNames = classNamesBind.bind(classes);
import {
  formDataChanged,
  signin,
  cancelErorrs
} from './actions'
import Signin from 'components/Signin'
import DialogComponent from 'components/DialogComponent'
import logo from './logo.png'
export class UserSignIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

  }
  render() {
    let {
      userFormData,
      onSigninClick,
      onFormDataChanged,
    } = this.props;
    return (
      <div dir="rtl" className={classNames('userSignIn')}>
        <div className={classNames("logo")}>
          <div className={classNames("logoImg")} style={{
              backgroundImage: `url(${logo})`
            }}>

          </div>
        </div>
        <Signin
          admin={false}
          username={userFormData.username}
          password={userFormData.password}
          onUsernameChange={e => {
            onFormDataChanged({...userFormData, ...{username: e.target.value}})
          }}
          onPasswordChange={e=> {
            onFormDataChanged({...userFormData, ...{password: e.target.value}})
          }}
          onSigninClick={onSigninClick}
          onChangeRoute={ (route) => {
            this.props.onChangeRoute(route)
          }}
          />
        <DialogComponent
          open={!!this.props.errors}
          dialogLabel="خطأ"
          addBtn={false}
          onCancelClick={()=>{
            this.props.onCancelClick()
          }}
          >
          <h3>{this.props.errors}</h3>
        </DialogComponent>
      </div>
    );
  }
}

const mapStateToProps = selectUserSignIn();

function mapDispatchToProps(dispatch) {
  return {
    onFormDataChanged: (newData) => dispatch(formDataChanged(newData)),
    onSigninClick: () => dispatch(signin()),
    onChangeRoute: route => dispatch(push(route)),
    onCancelClick: ()=> dispatch(cancelErorrs()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignIn);
