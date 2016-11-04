/**
*
* Header
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import {
  AppBar,
  IconButton,
  Drawer,
  MenuItem,
  FlatButton,
  LinearProgress,
  RaisedButton,Toolbar,
  ToolbarGroup,
} from 'material-ui'
import { push } from 'react-router-redux'
var menuItems = [
  {
    title: 'مستخدمين',
    push: '/network'
  },
  {
    title: "العروض",
    push: '/profiles'
  },
  {
    title: "الكروت",
    push: '/serials'
  },
  {
    title: "السجل",
    push: '/logs'
  }
]
class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      drawerDocked: false
    }
  }
  toggleDrawer(){
    this.setState({
      drawerDocked: !this.state.drawerDocked
    })
  }

  renderLoadIndicator(){
    let {isFetching} = this.props;
    if(isFetching){
      return(
        <div className={classNames("indicator")}>
          <LinearProgress color="rgb(255, 64, 129)" mode="indeterminate" />
        </div>
      )
    }
  }
  render() {
    return (
      <div className={classNames("header")}>
        {!!this.props.currentUser ?
           <Toolbar>
             <ToolbarGroup>
               {menuItems.map((item, index)=>{
                 return(
                   <RaisedButton
                     primary={true}
                     key={index}
                     label={item.title}
                     onClick={() => {
                       this.props.push(item.push)
                     }}
                     />
                 )
               })}
             </ToolbarGroup>
             <ToolbarGroup>
               <RaisedButton
                 secondary={true}
                 label="تسجيل الخروج"
                 onClick={() => {
                   this.props.onLogout()
                   this.props.push("/signin")
                 }}
                 />
             </ToolbarGroup>
           </Toolbar>
           : null}
        {this.renderLoadIndicator()}
      </div>
    );
  }
}

export default Header;
