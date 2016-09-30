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
      downloadSpeed,
      downloadLimit,
      disabled,
      uptime,
      uploadLimit,
      offerLifetime,
      uploadSpeed,
      offerPrice
    } = this.props
    return (
      <div className="">
        <div className={classNames("profileGridItem")}>
          <div className={classNames("padding")}>
            <Checkbox
              disabled={this.props.checkbox}
              />
          </div>
          <div className={classNames("padding")}>
            <span>{name}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{downloadSpeed}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{uploadSpeed}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{downloadLimit}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{uploadLimit}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{offerLifetime}</span>
          </div>
          <div className={classNames("padding")}>
            <span>{offerPrice}</span>
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
