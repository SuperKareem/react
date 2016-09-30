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
var classNames = classNamesBind.bind(classes);
import NewNetworkForm from 'components/NewNetworkForm'
import UserGridItem from 'components/UserGridItem'
import CreateNewForm from 'components/CreateNewForm'
import {
  addNewMikrotikUserFormDataChanged,
  fetchAllMikrotikProfiles,
  addNewMikrotikUser,
  addNewMikrotikUserErrorOk
} from './actions'
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
      addNewUserDialogOpened: false,
      searchUser:''
    }
  }
  toggleNewUserDialog(){
    this.setState({
      addNewUserDialogOpened: !this.state.addNewUserDialogOpened
    })
  }
  renderUsers(){
    if(!this.props.users )
      return

    let {
      searchUser
    } = this.state;
    return this.props.users.data.map((user, index)=>{
      if(searchUser != ''){
        if(user.name.toLowerCase().indexOf(searchUser) != -1 ||
          (!!user.comment &&
          user.comment.toLowerCase().indexOf(searchUser) != -1)){
          return (
            <UserGridItem
              key={index}
              checkbox={false}
              name={user.name}
              password={user.password}
              profile={user.profile}
              bytesIn={user['bytes-in']}
              bytesOut={user['bytes-out']}
              comment={user.comment}
                />
          )
        }
      } else {
        return (
          <UserGridItem
            key={index}
            checkbox={false}
            name={user.name}
            password={user.password}
            profile={user.profile}
            bytesIn={user['bytes-in']}
            bytesOut={user['bytes-out']}
            comment={user.comment}
            />
        )
      }
    })
  }
  renderErrorDialog(){
    let {
      isExist,
      error
    } = this.props.errors.addNewMikrotikUser
    const actions = [
      <RaisedButton
        label="إغلاق"
        secondary={true}
        onClick={() => {
          this.props.onAddNewMikrotikUserErrorOk()
        }}
      />]
      return(
        <Dialog
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={isExist}
          >
          <div dir="rtl" className="">
            {error}
          </div>
        </Dialog>
      )
  }
  renderProfilesDropDownMenu(){
    let {profiles} = this.props;
    return(
      <DropDownMenu
        value={this.props.newUserForm.profile}
        >
          {!!profiles.data && profiles.data.length > 0 ? profiles.data.map((profile, index)=>{
            return(
                <FlatButton
                  key={index}
                  secondary={true}
                  label={profile.name}
                  onClick={()=>{
                  this.props.onAddNewMikrotikFormDataChanged({...this.props.newUserForm, ...{profile: profile.name}})
                }}
                />
            )
          }): null}
      </DropDownMenu>
    )
  }

  renderAddNewUserDialog(){
    let {
      fetching,
      profiles
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
          autoScrollBodyContent={true}
          open={this.state.addNewUserDialogOpened}
        >
          {!fetching && !!profiles.data ?
            <div className={classNames("formContainer")}>
              {this.renderProfilesDropDownMenu()}
              <CreateNewForm
                formFields={addNewUserFormFields}
                formData={this.props.newUserForm}
                onFormDataChanged={(formData)=>{
                  this.props.onAddNewMikrotikFormDataChanged(formData)
                }}
                />
            </div> :
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
        <Toolbar className={classNames("toolbar")}>
          <ToolbarGroup>
            <RaisedButton
              secondary={true}
              label=" + إضافة مستخدم"
              onClick={() => {
                this.props.fetchMikrotikProfiles()
                this.toggleNewUserDialog()
              }}
              />
            <div className={classNames("searchField")}>
              <TextField
                defaultValue={this.state.searchUser}
                floatingLabelText="بحث عن مستخدم"
                onChange={(e)=>{
                  this.setState({
                    searchUser: e.target.value
                  })
                }}
                />
            </div>
          </ToolbarGroup>
        </Toolbar><br/>
        <Paper>
          <div className={classNames("usersGridContainer")}>
            <UserGridItem
              checkbox={true}
              name="اسم المستخدم"
              password={"كلمة السر"}
              profile="العرض"
              bytesIn="داونلود"
              bytesOut="ابلود"
              comment="الأسم"
              />
            {this.renderUsers()}
          </div>
        </Paper>
        {this.renderAddNewUserDialog()}
        {this.renderErrorDialog()}
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
    onAddNewMikrotikUserErrorOk: () => dispatch(addNewMikrotikUserErrorOk()),
    onAddNewMikrotikFormDataChanged: (user) => dispatch(addNewMikrotikUserFormDataChanged(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkPage);
