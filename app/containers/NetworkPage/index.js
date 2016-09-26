/*
 *
 * NetworkPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectNetworkPage from './selectors';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import NewNetworkForm from 'components/NewNetworkForm'
var classNames = classNamesBind.bind(classes);
import UserGridItem from 'components/UserGridItem'
import CreateNewForm from 'components/CreateNewForm'
import {
  addNewMikrotikUserFormDataChanged,
  fetchAllMikrotikProfiles,
  addNewMikrotikUser,
} from './actions'
import {
  Paper,
  Toolbar,
  ToolbarGroup,
  RaisedButton,
  FlatButton,
  Dialog,
  CircularProgress
} from 'material-ui'

var addNewUserFormFields = [
  {
    name: 'comment',
    title: 'الأسم'
  },
  {
    name: 'username',
    title: 'اسم المستخدم'
  },
  {
    name: 'password',
    title: 'كلمة السر'
  },
  {
    name: 'email',
    title: 'البريد الإلكترونى'
  }

]

export class NetworkPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      addNewUserDialogOpened: false
    }
  }
  toggleNewUserDialog(){
    this.setState({
      addNewUserDialogOpened: !this.state.addNewUserDialogOpened
    })
  }
  renderUsers(){
    if(!this.props.users)
      return
    return this.props.users.data.map((user, index)=>{
      return (
        <UserGridItem
          key={index}
          name={user.name}
          password={user.password}
          profile={user.profile}
          bytesIn={user['bytes-in']}
          bytesOut={user['bytes-out']}
          comment={user.comment}
          />
      )
    })
  }
  renderAddNewUserDialog(){
    let {
      fetching
    } = this.props
    const actions = [
      <FlatButton
        label="إلغاء"
        primary={true}
        onClick={() => {
          this.toggleNewUserDialog()
        }}
      />,
      <FlatButton
        label="إضافة"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.toggleNewUserDialog()
          this.props.onAddNewMikrotikUser()
        }}
      />,
    ];
    return(
      <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.addNewUserDialogOpened}
        >
          {!fetching ?
          <CreateNewForm
            formFields={addNewUserFormFields}
            formData={this.props.newUserForm}
            onFormDataChanged={(formData)=>{
              this.props.onAddNewMikrotikFormDataChanged(formData)
            }}
            /> :
            <CircularProgress
              color="rgb(255, 64, 129)"
              mode="indeterminate"
              />}
        </Dialog>
    )
  }
  render() {
    return (
      <div className={classNames("networkPage")}>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              secondary={true}
              label=" + إضافة مستخدم"
              onClick={() => {
                this.props.fetchMikrotikProfiles()
                this.toggleNewUserDialog()
              }}
              />
          </ToolbarGroup>
        </Toolbar><br/>
        <Paper>
          <div className={classNames("usersGridContainer")}>
            {this.renderUsers()}
          </div>
        </Paper>
        {this.renderAddNewUserDialog()}
      </div>
    );
  }
}

const mapStateToProps = selectNetworkPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddNewMikrotikUser: () => dispatch(addNewMikrotikUser()),
    fetchMikrotikProfiles: () => dispatch(fetchAllMikrotikProfiles()),
    onAddNewMikrotikFormDataChanged: (user) => dispatch(addNewMikrotikUserFormDataChanged(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkPage);
