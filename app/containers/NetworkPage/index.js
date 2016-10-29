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
import DialogComponent from 'components/DialogComponent'
import { selectedUsersChanged, deleteSelectedUsers } from './actions'
import form from './formData'
import {
  addNewMikrotikUserFormDataChanged,
  fetchAllMikrotikProfiles,
  addNewMikrotikUser,
  addNewMikrotikUserErrorOk,
  onUserToEditDataChanged,
  editUserData,
  fetchMikrotikUsersIntervalFun,
  renewProfile,
  renewProfileSelected
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
  MenuItem, Popover
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
      macAddressChecked: false,
      renewUserOpened: false,
      profileMenuOpen: false,
      sorting: 'all',
      pageNum: 1,
      deleteUserOpen: false,
      userToDelete: null,
    }
    this.selectedUsers = [];
    this.addNewUserFormFields = form.newUserFormData
    this.editUserFromFields = form.editUserFromData
    this.accountTypes = form.accountTypes
  }
  componentDidMount(){

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
  sorting(index, user){
    switch (this.state.sorting) {
      case "online":
        if(!!user.active){
          return this.renderUserItem(index, user);
        }
        break;
      case "disabled":
        if(user.disabled == "true"){
          return this.renderUserItem(index, user);
        }
        break;
      case "limited":
        if(user['bytes-in'] >= user['limit-bytes-in']){
          return this.renderUserItem(index, user);
        }
        break;
      default:
        return this.renderUserItem(index, user);
        break;
    }
  }
  renderUserItem(index, user){
    return (
      <UserGridItem
        index={index}
        edit={true}
        key={index}
        offerEndDate={new Date(user.offerEndDate).toDateString()}
        checkbox={false}
        name={user.name}
        password={user.password}
        profile={user.profile}
        bytesIn={user['bytes-in']}
        bytesOut={user['bytes-out']}
        comment={user.comment}
        limited={user['bytes-in'] >= user['limit-bytes-in']}
        active={!!user.active}
        disabled={user.disabled}
        onEditClick={() => {
          this.props.onUsersSelectionChanged(user)
          this.toggleEditDialog(user)
        }}
        onDeleteClick={() => {
          this.setState({
            userToDelete: user,
            deleteUserOpen: true
          })
        }}
        onRenewClick={() => {
          this.props.onUsersSelectionChanged(user)
          this.setState({renewUserOpened: true})
        }}
        onDisableClick={()=>{
          this.props.onUsersSelectionChanged(user)
          this.props.onEditUserDataChanged({...user, ...{disabled: user.disabled == "true" ? "false" : "true"}})
          this.props.onEditUser()
        }}
          />
    )
  }
  renderUsers(){
    if(!this.props.users || !!!this.props.users.data.map )
      return

    let {
      searchUser
    } = this.state;
    return this.props.users.data.map((user, index)=>{
      let maxIndex = this.state.pageNum * 10;
      let minIndex = (this.state.pageNum - 1 ) * 10;
      if(index < maxIndex && index > minIndex){
        if(searchUser != ''){
          if(user.name.toLowerCase().indexOf(searchUser) != -1 ||
          (!!user.comment &&
            user.comment.toLowerCase().indexOf(searchUser) != -1)){
              return this.sorting(index, user);
            }
          } else {
            return this.sorting(index, user)
          }
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
  renderProfilesDropDownMenu(onProfileSelected){
    let {profiles} = this.props;
    return(
      <div className={classNames("")} style={{padding: 20}}>
        <RaisedButton
          secondary={true}
          onClick={event => this.setState({profileMenuOpen: true, anchorEl: event.currentTarget})}
          label={this.state.currentProfile}
          />
           <Popover
            open={this.state.profileMenuOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={()=> this.setState({profileMenuOpen: false})}
            >
            <div className={classNames("dropdownClass")}>
              {!!profiles.data && profiles.data.length > 0 ? profiles.data.map((profile, index)=>{
                return(
                  <FlatButton
                    key={index}
                    secondary={true}
                    label={profile.name}
                    onClick={()=>{
                      !!onProfileSelected ?
                      onProfileSelected(profile) :
                      this.props.onAddNewMikrotikFormDataChanged({...this.props.newUserForm, ...{profile: profile.name}})
                      this.setState({currentProfile: profile.name, profileMenuOpen: false})
                    }}
                    />
                )
              }): null}
            </div>
          </Popover>
      </div>
    )
  }
  renderAccountTypeDropdown(){
    return(
      <div className={classNames("")} style={{padding: 20}}>
        <RaisedButton
          secondary={true}
          onClick={event => this.setState({accountTypesOpen: true, anchorEl: event.currentTarget})}
          label={this.state.newAccountType}
          />
           <Popover
            open={this.state.accountTypesOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={()=> this.setState({accountTypesOpen: false})}
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
                      this.setState({newAccountType: type.title, accountTypesOpen: false})
                    }}
                    />
                )
              })}
            </div>
          </Popover>
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
    let onProfileSelected = (profile) => {
      this.props.onRenewProfileSelected(profile)
    }
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
            <FlatButton
              label="الغاء البحث"
              onClick={()=> this.setState({searchUser: ''})}
            />
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
              offerEndDate="تاريخ الإنتهاء"
              profile="العرض"
              bytesIn="التحميل"
              bytesOut="ابلود"
              comment="الأسم"
              dateFormat={true}
              sortName={this.state.sorting}
              sorting={(sortBy)=>{
                this.setState({sorting: sortBy})
              }}
              />
            <div dir="rtl" className={classNames("usersTableBody")}>
              {this.renderUsers()}
            </div>
          </div>
          <div className={classNames("pagingContainer")}>
            <div>
              <RaisedButton
                label="السابق"
                primary={true}
                disabled={((this.state.pageNum - 1) < 1)}
                onClick={()=> {
                  if((this.state.pageNum - 1) > 1)
                    this.setState({pageNum: this.state.pageNum - 1})
                  }
                }
              />
            </div>
            <div>
              <FlatButton
                label={`صفحة رقم ${this.state.pageNum}`}
              />
            </div>
            <div>
              <RaisedButton
                label="التالي"
                primary={true}
                disabled={!(((this.props.users.data.length / 10) - (this.state.pageNum + 1)) > -1)}
                onClick={()=> {
                  let {pageNum} = this.state
                  let max = this.props.users.data.length / 10;
                  if((max - (pageNum + 1)) > -1)
                    this.setState({pageNum: pageNum + 1})
                  }
                }
              />
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
            this.setState({currentUserToEdit: {...this.state.currentUserToEdit, ...{profile: profile.name}}})
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
          <DialogComponent
            open={this.state.renewUserOpened}
            createLabel="تجديد"
            dialogLabel="تجديد الإشتراك"
            onCancelClick={()=>{
              this.setState({renewUserOpened: false})
              this.resetCurrentProfileState()
            }}
            onAddClick={()=>{
              this.props.onRenewProfile()
              this.setState({renewUserOpened: false})
            }}
            >
            <div className={classNames("offerChoosing")}>
              <h3>
                اختيار العرض
              </h3>
              {this.renderProfilesDropDownMenu(onProfileSelected)}
            </div>
        </DialogComponent>
        <DialogComponent
        open={this.state.deleteUserOpen}
        createLabel="حذف"
        dialogLabel="حذف مستخدم"
        onCancelClick={()=>{
          this.setState({deleteUserOpen: false})
        }}
        onAddClick={()=>{
          this.deleteUser(this.state.userToDelete)
          this.setState({deleteUserOpen: false})
        }}
        >
        <div>
          <h3>هل انت متأكد من الحذف</h3>
        </div>
      </DialogComponent>
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
    onFetchInterval: ()=> dispatch(fetchMikrotikUsersIntervalFun()),
    onEditUser: () => dispatch(editUserData()),
    onRenewProfileSelected : (profile) => dispatch(renewProfileSelected(profile)),
    onRenewProfile : () => dispatch(renewProfile()),
    onAddNewMikrotikFormDataChanged: (user) => dispatch(addNewMikrotikUserFormDataChanged(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NetworkPage);
