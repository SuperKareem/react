/*
 *
 * Logs
 *
 */

import React from 'react';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);

import formatLog from './formatLogs'
import { connect } from 'react-redux';
import selectLogs from './selectors';
import {
  fetchSystemLogs,
  fetchMikrotikLogs,
  logout
} from './actions'
import {
  Toolbar,
  ToolbarGroup,
  RaisedButton,Paper,
} from 'material-ui'
import formatDate from 'utils/formatingDate'
export class Logs extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      currentLogs: 'systemLogs',
    }
  }
  renderToolbar(){
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton
            primary={true}
            label="النظام"
            onClick={() => {
              this.props.onFetchSystemLogs();
              this.setState({currentLogs: 'systemLogs'})
            }}
            />
          <RaisedButton
            primary={true}
            label="الشحن"
            onClick={() => {
              this.props.onFetchSystemLogs();
              this.setState({currentLogs: 'charge'})
            }}
            />
          <RaisedButton
            primary={true}
            label="ميكروتيك"
            onClick={() => {
              this.props.onFetchMikrotikLogs();
              this.setState({currentLogs: 'mikrotik'})
            }}
            />
        </ToolbarGroup>
      </Toolbar>
    )
  }
  renderLogLine(log){
    let _log = formatLog(log)
    return(
      <div className={classNames("logWrapper")}>
        <div className={classNames("log")}>
          <div className={classNames("event")}>
            <h3>تم {_log.action} {_log.type} <span className={classNames("secColor")}>{log.data}</span> من قبل <span className={classNames("mainColor")}>{log.user}</span></h3>
          </div>
          <div dir="ltr" className={classNames("time")}>
            <h4> ||  {_log.time} || {formatDate(log.date)} </h4>
          </div>
        </div>
        <hr />
      </div>
    )
  }
  renderPage(){
    let reversed;
    let reversedMikro;
    if(!this.props.systemLogs){
      return null
    } else {
      reversed = this.props.systemLogs.slice(0).reverse();
    }
    if(!this.props.mikrotikLogs && this.state.currentLogs == "mikrotikLogs"){
      return null
    } else {
      if(!!this.props.mikrotikLogs)
        reversedMikro = this.props.mikrotikLogs.slice(0).reverse();
    }
    switch (this.state.currentLogs) {
      case "systemLogs":
        return(
          <div className={classNames("logsWrapper")}>
            {reversed.map((log, index)=> {
              if(log.action != "charge"){
                return(
                  <div key={index} className={classNames("logContainer")}>
                    {this.renderLogLine(log)}
                  </div>
                )
              }
            })}
          </div>
        )
        break;
      case "charge":
        return(
          <div className={classNames("logsWrapper")}>
            {reversed.map((log, index)=> {
              if(log.action == "charge"){
                return(
                  <div key={index} className={classNames("logContainer")}>
                    {this.renderLogLine(log)}
                  </div>
                )
              }
            })}
          </div>
        )
        break;
        case "mikrotik":
          return(
            <div className={classNames("logsWrapper")}>
              {reversedMikro.map((log, index)=> {
                  return(
                    <div dir="ltr"key={index} className={classNames("logContainer")}>
                      <div>
                        <div className={classNames("mikorLogWrapper")}>
                          <span>{log.message} </span> <span> {log.time}</span>
                        </div>
                        <hr />
                      </div>
                    </div>
                  )
              })}
            </div>
          )
          break;
      default:

    }
  }
  render() {
    return (
      <div>
        <Paper>
          <div className={classNames("toolbarWrapper")}>
            {this.renderToolbar()}
          </div>
          <div>
            <Paper className={classNames("pageWrapper")}>
              {this.renderPage()}
            </Paper>
          </div>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = selectLogs();

function mapDispatchToProps(dispatch) {
  return {
    onFetchSystemLogs: ()=> dispatch(fetchSystemLogs()),
    onFetchMikrotikLogs: ()=> dispatch(fetchMikrotikLogs()),
    onLogout: ()=> dispatch(logout()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Logs);
