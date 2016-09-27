/**
*
* ProfileGridItem
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import NewNetworkForm from 'components/NewNetworkForm'
var classNames = classNamesBind.bind(classes);

import {
  Checkbox
} from 'material-ui'

class ProfileGridItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  defaultProps = {
    checkbox: true
  }
  render() {
    let {
      name,
      password,
      profile,
      disabled,
      uptime,
      bytesIn,
      bytesOut,
      comment
    } = this.props
    return (
      <div className="">
        <div className={classNames("userGridItem")}>
          <div className={classNames("padding")}>
          {this.props.checkbox ?   <Checkbox />: null}
          </div>
          <div className={classNames("padding")}>
            <span>{name}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{name}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{password}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{profile}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{bytesIn}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{bytesOut}</span>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}

// <div className={classNames("padding")}>
//   <span>{uptime}</span>
// </div>
export default ProfileGridItem;
