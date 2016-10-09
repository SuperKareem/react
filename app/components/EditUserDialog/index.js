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
  Dialog, DropDownMenu, FlatButton,TextField,
} from 'material-ui'

class EditUserDialog extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
        <TextField
          disabled={true}
          floatingLabelText="العرض"
          defaultValue={this.props.currentUserProfile}
          />
        <div style={{paddingTop: 16}}>
          <DropDownMenu
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
                    }}
                    />
                )
              }): null}
            </div>
          </DropDownMenu>
        </div>
        <TextField
          disabled={true}
          floatingLabelText="نوع الحساب"
          defaultValue={this.props.user.accountType}
          />
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
