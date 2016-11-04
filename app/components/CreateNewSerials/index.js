/**
*
* CreateNewSerials
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

class CreateNewSerials extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    createLabel: 'إنشاء',
    dialogLabel: 'إنشاء كروت جديدة',
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
      label={this.props.createLabel}
      secondary={true}
      keyboardFocused={true}
      onClick={() => {
        this.props.onCreateClick();
      }}
    />,
  ];
  return actions;
  }

  render() {
    let {
      open,
      autoFormFields,
      autoFormData
    } = this.props;
    return (
      <Dialog
          title={this.props.dialogLabel}
          titleStyle={{
            textAlign: 'right'
          }}
          actions={this.getActions()}
          modal={false}
          autoScrollBodyContent={true}
          open={open}
        >
        <div className={classNames("editUserForm")} dir="rtl">
          <CreateNewForm
            formFields={autoFormFields}
            formData={autoFormData}
            onFormDataChanged={(formData)=>{
              this.props.onAutoFormDataChanged(formData)
            }}
            />
        </div>
        </Dialog>
    );
  }
}

export default CreateNewSerials;
