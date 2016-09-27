/*
 *
 * ProfilesContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectProfilesContainer from './selectors';
import { selectCurrentProfiles } from 'containers/App/selectors'
import { createStructuredSelector } from 'reselect'
import styles from './styles.css';
import {
  Paper,
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FlatButton,
  Dialog,
  CircularProgress,
  TextField,
  DropDownMenu,
  MenuItem
} from 'material-ui'
import { UserGridItem } from 'components/UserGridItem'

export class ProfilesContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.profilesContainer}>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              secondary={true}
              label="إضاف عرض جديد"
              />
          </ToolbarGroup>
        </Toolbar>
        <Paper>
          
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profilesState: selectProfilesContainer(),
  currentProfiles: selectCurrentProfiles()
})

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesContainer);
