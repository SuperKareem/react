/*
 *
 * SerialsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSerialsPage from './selectors';
import styles from './styles.css';

export class SerialsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.serialsPage}>
      </div>
    );
  }
}

const mapStateToProps = selectSerialsPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SerialsPage);
