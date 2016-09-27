/**
*
* NetworksGrid
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);

import {
  Paper,

} from 'material-ui'

class NetworksGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={classNames("networksGrid")}>
        <div className={classNames("girdContainer")}>
          <Paper>
            {this.props.list.map((item, index) => {
              return(
                item
              )
            })}
          </Paper>
        </div>
      </div>
    );
  }
}

export default NetworksGrid;
