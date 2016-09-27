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
  LinearProgress
} from 'material-ui'
import { push } from 'react-router-redux'
var menuItems = [
  {
    title: 'الشبكات',
    push: '/main'
  },
  {
    title: "العروض",
    push: '/profiles'
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
  renderDrawer(){
    let leftButton = <IconButton
                        iconClassName={classNames("fa", "fa-bars")}
                        onClick={() => {
                          this.toggleDrawer()
                        }}
                        />
    return(
      <Drawer
        open={this.state.drawerDocked}
        openSecondary={true}
        overlayStyle={{
          backgroundColor: `rgba(0,0,0,.5)`,
          zIndex: 1000
        }}
        >
        <div className={classNames("menuContainer")}>
          <AppBar
            iconElementLeft={leftButton}
            >
          </AppBar>
          {menuItems.map((item, index)=>{
            return(
              <FlatButton
                key={index}
                label={item.title}
                style={{
                  width: '100%',
                }}
                onClick={() => {
                  this.toggleDrawer()
                  this.props.push(item.push)
                }}
                />
            )
          })}
        </div>
      </Drawer>
    )
  }
  renderLoadIndicator(){
    let {isFetching} = this.props;
    if(isFetching){
      return(
        <div className={classNames("indicator")}>
          <LinearProgress color="rgb(255, 64, 129)" mode="indeterminate" /><br />
        </div>
      )
    }
  }
  render() {
    let rightButton = <IconButton
                        iconClassName={classNames("fa", "fa-ellipsis-v")}
                        />
    let leftButton = <IconButton
                        iconClassName={classNames("fa", "fa-bars")}
                        onClick={() => {
                          this.toggleDrawer()
                        }}
                        />
                      // <AppBar
                      //   title="MikroTik System "
                      //   iconElementRight={rightButton}
                      //   iconElementLeft={leftButton}
                      //   onLeftIconButtonTouchTap={()=>{
                      //     this.toggleDrawer()
                      //   }}
                      //   showMenuIconButton={false}
                      //   >
                      // </AppBar> <br />
    return (
      <div className={classNames("header")}>
        <AppBar
              className={classNames("appBar")}
              showMenuIconButton={true}
              iconElementLeft={leftButton}
              title="Micro Net System">
            </AppBar>
          {this.renderLoadIndicator()}
        {this.renderDrawer()}
        <br />
      </div>
    );
  }
}

export default Header;
