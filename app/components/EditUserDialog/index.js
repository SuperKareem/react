/**
*
* EditUserDialog
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import CreateNewForm from 'components/CreateNewForm'
var classNames = classNamesBind.bind(classes);
import {
  Dialog, DropDownMenu, FlatButton,TextField, Popover, RaisedButton
} from 'material-ui'

class EditUserDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      profileMenuOpen: false
    }
  }
  getActions(){
    const actions = [<FlatButton
      label="إلغاء"
      primary={true}
      onClick={() => {
        this.props.onCancelClick();
      }}
    />,
    <FlatButton
      label="تعديل"
      secondary={true}
      keyboardFocused={true}
      onClick={() => {
        this.props.onEditClick();
      }}
    />,
  ];
  return actions;
  }

  renderProfilesDropDownMenu(){
    let {profiles} = this.props;
    
    return(
      <div className={classNames("profileDropDown")}>
        <div className={classNames("row")}>
          <span> العرض </span>
          <RaisedButton
            secondary={true}
            onClick={event => this.setState({profileMenuOpen: true, anchorEl: event.currentTarget})}
            label={this.props.currentUserProfile}
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
                      this.props.onProfileChanged(profile)
                      this.setState({profileMenuOpen: false})
                    }}
                    />
                )
              }): null}
            </div>
          </Popover>
        </div>
          <div className={classNames("row")}>
            <span>نوع الحساب</span>
            <RaisedButton
              disabled={true}
              label={this.props.user.accountType}
              />
          </div>
      </div>
    )
  }

  render() {
    let {
      open,
      autoFormFields,
      user,
    } = this.props;
    if(!!!user){
      return null
    }
    return (
      <Dialog
          title="تعديل مستخدم"
          titleStyle={{
            textAlign: 'right'
          }}
          actions={this.getActions()}
          modal={false}
          autoScrollBodyContent={true}
          open={open}
        >
        <div className={classNames("editUserForm")} dir="rtl">
          <div className={classNames("dropDowns")}>
            {this.renderProfilesDropDownMenu()}
          </div>
          <CreateNewForm
            formFields={autoFormFields}
            formData={user}
            onFormDataChanged={(formData)=>{
              this.props.onAutoFormDataChanged(formData)
            }}
            />
        </div>
        </Dialog>
    );
  }
}

export default EditUserDialog;
