/*
 *
 * SigninPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import {
  selectUsername,
  selectPassword,
  selectIsLoading
} from './selectors';
import { createStructuredSelector } from 'reselect'
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import { replace } from 'react-router-redux';
import {
  usernameChange,
  passwordChange,
  signinRequest
} from './actions'
import Signin from 'components/Signin'

export class SigninPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount(){
  }
  render() {
    let {
      username,
      password,
      isLoading,
      onSigninClick,
      onUsernameChange,
      onPasswordChange,
      onChangeRoute
    } = this.props;
    return (
      <div dir="rtl" className={classNames('signinPage')}>
        <Signin
          username={username}
          password={password}
          onUsernameChange={onUsernameChange}
          onPasswordChange={onPasswordChange}
          onSigninClick={onSigninClick}
          />
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  username: selectUsername(),
  password: selectPassword(),
  isLoading: selectIsLoading()
});

export function mapDispatchToProps(dispatch) {
  return {
    onUsernameChange: (e) => dispatch(usernameChange(e.target.value)),
    onPasswordChange: (e) => dispatch(passwordChange(e.target.value)),
    onSigninClick: () => dispatch(signinRequest()),
    onChangeRoute: (url) => dispatch(replace(url)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SigninPage);
