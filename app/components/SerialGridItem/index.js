/**
*
* SerialGridItem
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import NewNetworkForm from 'components/NewNetworkForm'
import formatDate from 'utils/formatingDate'
import {
  Checkbox,
  FlatButton,
  IconMenu,
  IconButton,
  MenuItem,
  RaisedButton,
} from 'material-ui'

class SerialGridItem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    showDots: true
  }
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
      serial,
      price,
      active,
      checkbox,
      index,
      dateFormat,
      date,
      sortName
    } = this.props
    let sortTitle = ''
    switch (sortName) {
      case 'online':
        sortTitle ="مفعل"
        break;
      case 'disabled':
        sortTitle = "موقوف"
        break;
      default:
        sortTitle = "الكل"
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
            disabled: !active
          })}
          onMouseOver={()=>{
            this.setState({hover: true})
          }}
          onMouseOut={()=>{
            this.setState({hover: false})
          }}
          onClick={()=>{
            !!this.props.onClick ? this.props.onClick() : null
          }}
          >

          {!!! this.props.sortName ? <div className={classNames("index")}>
            <IconMenu
              iconButtonElement={iconBtn}
              >
              <div className={classNames("dropDown")}>
                <FlatButton secondary={true} label="تعديل" onClick={() => {
                    this.props.onEditClick();
                  }}/>
                <FlatButton secondary={true} label={!active ? "تفعيل" : "إيقاف"} onClick={() => {
                    this.props.onDisableClick();
                  }} />
                <FlatButton secondary={true} label="حذف" onClick={() => {
                  this.props.onDeleteClick();
                }} />
              </div>
            </IconMenu>
          </div> : <IconMenu
            iconButtonElement={iconBtn2}
            >
            <div className={classNames("dropDown")}>
              <FlatButton secondary={true} label="الكل" onClick={() => {
                  this.props.sorting('all')
                }} />
              <FlatButton secondary={true} label="مفعل" onClick={() => {
                  this.props.sorting('online')
                }} />
              <FlatButton secondary={true} label="موقوف" onClick={() => {
                  this.props.sorting('disabled')
                }}/>
            </div>
          </IconMenu>}
          <div className={classNames("userGridItem")}
            onClick={()=>{
              !active ? this.props.onActiveClick() : null
            }}
            >
            <div className={classNames("padding")}>
              <span>{serial}</span>
            </div>
            <div className={classNames("padding")}>
              <span>{price} جـ</span>
            </div>
            <div className={classNames("padding")}>
              <span>{!!dateFormat ? date : formatDate(date)}</span>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
export default SerialGridItem;
