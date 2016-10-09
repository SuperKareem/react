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
import EditUserDialog from 'components/EditUserDialog'
import { selectedUsersChanged, deleteSelectedUsers } from './actions'
import form from './formData'
import {
  addNewMikrotikUserFormDataChanged,
  fetchAllMikrotikProfiles,
  addNewMikrotikUser,
  addNewMikrotikUserErrorOk,
  onUserToEditDataChanged,
  editUserData,
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
  Checkbox,
  MenuItem
} from 'material-ui'

export class NetworkPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      addNewUserDialogOpened: false,
      searchUser:'',
      currentProfile: 'العرض ',
      newAccountType: 'نوع الحساب',
      selectedUsers: 0,
      editDialogOpend: false,
      currentUserToEdit: false,
      macAddressChecked: false
    }
    this.selectedUsers = [];
    this.addNewUserFormFields = form.newUserFormData
    this.editUserFromFields = form.editUserFromData
    this.accountTypes = form.accountTypes
  }
  resetCurrentProfileState(){
    this.setState({
      currentProfile:  'العرض ',
      newAccountType: 'نوع الحساب',
      currentUserToEdit: false
    })
  }
  toggleNewUserDialog(){
    this.setState({
      addNewUserDialogOpened: !this.state.addNewUserDialogOpened
    })
  }
  deleteUser(user){
    this.props.onUsersSelectionChanged(user)
    this.props.onDeleteSelectedUsers();
  }
  editUser(user, changedData ){

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
              index={index}
              edit={true}
              key={index}
              checkbox={false}
              name={user.name}
              password={user.password}
              profile={user.profile}
              bytesIn={user['bytes-in']}
              bytesOut={user['bytes-out']}
              comment={user.comment}
              active={!!user.active}
              onEditClick={() => {
                this.props.onUsersSelectionChanged(user)
                this.toggleEditDialog(user)
              }}
              onDeleteClick={() => {
                this.deleteUser(user)
              }}
              onDisableClick={()=>{
                this.props.onUsersSelectionChanged(user)
                this.props.onEditUserDataChanged({...user, ...{disabled: !user.disabled}})
                this.props.onEditUser()

              }}
                />
          )
        }
      } else {
        return (
          <UserGridItem
            index={index}
            edit={true}
            key={index}
            checkbox={false}
            name={user.name}
            password={user.password}
            profile={user.profile}
            bytesIn={user['bytes-in']}
            bytesOut={user['bytes-out']}
            comment={user.comment}
            active={!!user.active}
            disabled={user.disabled == "true"}
            onEditClick={() => {
              this.props.onUsersSelectionChanged(user)
              this.toggleEditDialog(user)
            }}
            onDeleteClick={() => {
              this.deleteUser(user)
            }}
            onDisableClick={()=>{
              console.log(user.disabled);
              this.props.onUsersSelectionChanged(user)
              this.props.onEditUserDataChanged({...user, ...{disabled: user.disabled == "true" ? false : true}})
              this.props.onEditUser()

            }}
            />

        )
      }
    })
  }
  toggleEditDialog(currentUserToEdit){
    this.setState({currentUserToEdit: currentUserToEdit});
    this.setState({editDialogOpend: !this.state.editDialogOpend})
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
      <div className={classNames("profileDropDown")}>
        <h4>{this.state.currentProfile}</h4>
        <DropDownMenu
          value={this.props.newUserForm.profile}
          >
          <div className={classNames("dropdownClass")}>
            {!!profiles.data && profiles.data.length > 0 ? profiles.data.map((profile, index)=>{
              return(
                <FlatButton
                  key={index}
                  secondary={true}
                  label={profile.name}
                  onClick={()=>{
                    this.props.onAddNewMikrotikFormDataChanged({...this.props.newUserForm, ...{profile: profile.name}})
                    this.setState({currentProfile: profile.name})
                  }}
                  />
              )
            }): null}
          </div>
        </DropDownMenu>
      </div>
    )
  }
  renderAccountTypeDropdown(){
    return(
      <div className={classNames("profileDropDown")}>
        <h4>{this.state.newAccountType}</h4>
        <DropDownMenu
          value={this.props.newUserForm.profile}
          >
          <div className={classNames("dropdownClass")}>
            {this.accountTypes.map((type, index)=>{
              return(
                <FlatButton
                  key={index}
                  secondary={true}
                  label={type.title}
                  onClick={()=>{
                    this.props.onAddNewMikrotikFormDataChanged({...this.props.newUserForm, ...{accountType: type.name}})
                    this.setState({newAccountType: type.title})
                  }}
                  />
              )
            })}
          </div>
        </DropDownMenu>
      </div>
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
          this.resetCurrentProfileState();
        }}
      />,
      <RaisedButton
        label="إضافة"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          this.toggleNewUserDialog()
          this.props.onAddNewMikrotikUser()
          this.resetCurrentProfileState();

        }}
      />,
    ];
    return(
      <Dialog
          title="إضافة مستخدم جديد"
          titleStyle={{
            textAlign: 'right'
          }}
          actions={actions}
          modal={false}
          autoScrollBodyContent={true}
          open={this.state.addNewUserDialogOpened}
        >
          {!fetching && !!profiles.data ?
            <div dir="rtl" className={classNames("formContainer")}>
              <div className={classNames("dropDowns")}>
                {this.renderProfilesDropDownMenu()}
                {this.renderAccountTypeDropdown()}
              </div>
              <CreateNewForm
                formFields={this.addNewUserFormFields}
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
        </Toolbar>
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
            <div dir="rtl" className={classNames("usersTableBody")}>
              {this.renderUsers()}
            </div>
          </div>
        </Paper>
        {this.renderAddNewUserDialog()}
        {this.renderErrorDialog()}
        <EditUserDialog
          open={this.state.editDialogOpend}
          autoFormFields={this.editUserFromFields}
          user={this.state.currentUserToEdit}
          profiles={this.props.profiles}
          currentUserProfile={this.state.currentUserToEdit.profile}
          accountTypes={this.accountTypes}
          currentUserAccountType={this.state.currentUserToEdit.accountType}
          onAutoFormDataChanged={(formData)=>{
            this.props.onEditUserDataChanged(formData)
          }}
          onProfileChanged={(profile)=>{
            this.props.onEditUserDataChanged({...this.props.editUserData, ...{profile}})
          }}
          onEditClick={()=>{
            this.toggleEditDialog(false)
            this.props.onEditUser()
          }}
          onCancelClick={()=>{
            this.toggleEditDialog(false)
          }}
          />
      </div>
    );
  }
}

const mapStateToProps = selectNetworkPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onAddNewMikrotikUser: () => dispatch(addNewMikrotikUser()),
    onDeleteSelectedUsers: ()=> dispatch(deleteSelectedUsers()),
    fetchMikrotikProfiles: () => dispatch(fetchAllMikrotikProfiles()),
    onAddNewMikrotikUserErrorOk: () => dispatch(addNewMikrotikUserErrorOk()),
    onUsersSelectionChanged: (user) => dispatch(selectedUsersChanged(user)),
    onEditUserDataChanged: (user) => dispatch(onUserToEditDataChanged(user)),
    onEditUser: () => dispatch(editUserData()),
    onAddNewMikrotikFormDataChanged: (user) => dispatch(addNewMikrotikUserFormDataChanged(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkPage);
