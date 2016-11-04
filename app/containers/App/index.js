/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import { connect } from 'react-redux';
import { push } from 'react-router-redux'
import { createStructuredSelector } from 'reselect'
import Banner from './banner-metal.jpg';
import notoFont from './NotoKufiArabic-Regular.ttf';
import { selectLoading, selectCurrentUser } from './selectors'
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import Header from 'components/Header'
import back from './back.jpg'
import { Paper } from 'material-ui'
var classNames = classNamesBind.bind(classes);
var injectTapEventPlugin = require("react-tap-event-plugin");
import {
  logout
} from './actions'
import {
  MuiThemeProvider
 } from 'material-ui'
 export class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
   constructor(props){
     super(props)
     injectTapEventPlugin()
   }
   componentDidMount(){
   }

   render(){
     return (
       <MuiThemeProvider>
         <div
           style={{
             backgroundImage: `url(${back})`,
             fontFamily: `url(${notoFont})`
           }}
           dir="rtl" className={classNames("container")}>
           <div className={classNames("header")}>
             <Header
               push={(url)=>{
                 this.props.dispatch(push(url))
               }}
               isFetching={this.props.isFetching}
               currentUser={this.props.currentUser}
               onLogout={()=>{
                 this.props.onLogout()
               }}
               />
           </div>
           <div className={classNames("wrapper")}>
             <Paper className={classNames("wrapperPaper")}>
               {this.props.children}
             </Paper>
           </div>
         </div>
       </MuiThemeProvider>
     );
   }
 }

const mapStateToProps = createStructuredSelector({
  isFetching: selectLoading(),
  currentUser: selectCurrentUser()
});

export function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
