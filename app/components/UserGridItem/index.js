/**
*
* UserGridItem
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import NewNetworkForm from 'components/NewNetworkForm'

import {
  Checkbox,
  FlatButton,
  IconMenu,
  IconButton,
  MenuItem,
} from 'material-ui'

class UserGridItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      userChecked: false,
      hover: false
    }
  }
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
      comment,
      index,
      onUserSelected,
      onUserDeselected,
      active,
    } = this.props
    let iconBtn = <FlatButton
      secondary={true}
      disabled={this.props.checkbox}
      iconClassName={classNames("fa")}>
      <i className={classNames("fa","fa-ellipsis-v", "v")}></i>
    </FlatButton>
    return (
      <div className="">
        <div className={classNames("userGridItem",{
            userGridItemHover: this.state.hover,
            online: !!active && !this.state.hover,
            disabled: !!disabled && !this.state.hover
          })}
          onMouseOver={()=>{
            this.setState({hover: true})
          }}
          onMouseOut={()=>{
            this.setState({hover: false})
          }}
          onClick={()=>{
          }}
          >
          <div className={classNames("padding")}>
            <IconMenu
              iconButtonElement={iconBtn}
              >
              <div className={classNames("dropDown")}>
                <FlatButton secondary={true} label="تجديد" onClick={() => {
                  }} />
                <FlatButton secondary={true} label="تعديل" onClick={() => {
                    this.props.onEditClick();
                  }}/>
                <FlatButton secondary={true} label={disabled ? "تفعيل" : "إيقاف"} onClick={() => {
                    this.props.onDisableClick();
                  }} />
                <FlatButton secondary={true} label="حذف" onClick={() => {
                  this.props.onDeleteClick();
                }} />
              </div>
            </IconMenu>
          </div>
          <div className={classNames("padding")}>
            <span>{comment}</span>
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
export default UserGridItem;
