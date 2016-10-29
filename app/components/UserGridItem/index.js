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
  MenuItem,RaisedButton
} from 'material-ui'
import formatDate from 'utils/formatingDate'

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
      offerEndDate,
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
      sortName,
      dateFormat
    } = this.props
    let sortTitle = ''
    switch (sortName) {
      case 'online':
        sortTitle ="متصل"
        break;
      case 'disabled':
        sortTitle = "موقوف"
        break;
      case 'limited':
        sortTitle = "منتهي"
        break;
      default:
        sortTitle= "الكل"
    }
    let iconBtn = <RaisedButton
      primary={true}
      label="خيارات">
    </RaisedButton>
    let iconBtn2 = <FlatButton
      primary={true}
      label={sortTitle}>
    </FlatButton>
    return (
      <div className="">
        <div className={classNames("userGridItem",{
            userGridItemHover: this.state.hover,
            online: !!active && !this.state.hover,
            disabled: disabled == "true" && !this.state.hover,
            limited: this.props.limited
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
            {!!!this.props.checkbox ? <IconMenu
              iconButtonElement={iconBtn}
              >
              <div className={classNames("dropDown")}>
                <FlatButton secondary={true} label="تجديد" onClick={() => {
                    this.props.onRenewClick();
                  }} />
                <FlatButton secondary={true} label="تعديل" onClick={() => {
                    this.props.onEditClick();
                  }}/>
                <FlatButton secondary={true} label={disabled == "true" ? "تفعيل" : "إيقاف"} onClick={() => {
                    this.props.onDisableClick();
                  }} />
                <FlatButton secondary={true} label="حذف" onClick={() => {
                  this.props.onDeleteClick();
                }} />
              </div>
            </IconMenu> :
            <IconMenu
              iconButtonElement={iconBtn2}
              >
              <div className={classNames("dropDown")}>
                <FlatButton secondary={true} label="الكل" onClick={() => {
                    this.props.sorting('all')
                  }} />
                <FlatButton secondary={true} label="متصل" onClick={() => {
                    this.props.sorting('online')
                  }} />
                <FlatButton secondary={true} label="موقوف" onClick={() => {
                    this.props.sorting('disabled')
                  }}/>
                <FlatButton secondary={true} label="منتهي" onClick={() => {
                    this.props.sorting('limited')
                }} />
              </div>
            </IconMenu>
          }
          </div>
          <div className={classNames("padding")} onClick={()=> this.props.onEditClick()}>
            <span>{comment}</span>
          </div>
          <div className={classNames("padding")} onClick={()=> this.props.onEditClick()}>
            <span>{name}</span>
          </div>
          <div className={classNames("padding")} onClick={()=> this.props.onEditClick()}>
            <span>{profile}</span>
          </div>
          <div className={classNames("padding")} onClick={()=> this.props.onEditClick()}>
            <span>{bytesIn}</span>
          </div>
          <div className={classNames("padding")} onClick={()=> this.props.onEditClick()}>
            <span>{!!dateFormat ? offerEndDate : formatDate(offerEndDate)}</span>
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
