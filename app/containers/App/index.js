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
import { selectLoading } from './selectors'
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import Header from 'components/Header'

var classNames = classNamesBind.bind(classes);
var injectTapEventPlugin = require("react-tap-event-plugin");
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
         <div  dir="rtl" className={classNames("container")}>
           <div className={classNames("header")}>
             <Header
               push={(url)=>{
                 this.props.dispatch(push(url))
               }}
               isFetching={this.props.isFetching}
               />
           </div>
           <div className={classNames("wrapper")}>
             {this.props.children}
           </div>
         </div>
       </MuiThemeProvider>
     );
   }
 }

const mapStateToProps = createStructuredSelector({
  isFetching: selectLoading()
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
