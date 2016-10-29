/**
*
* AddNewSerials
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

class AddNewSerials extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    createLabel: 'إضافة',
    dialogLabel: 'إضافة كروت',
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
        this.props.onAddClick();
      }}
    />,
  ];
  return actions;
  }

  render() {
    let {
      open,
      formFields
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
          <div className={classNames("serialsNumber")}>
            <TextField
              floatingLabelText=" سعر الكروت"
              onChange={(e)=> {
                this.props.onFormFieldDataChanged({serialsPrice: e.target.value})
              }}
              />
          </div>
          <div className={classNames("serialsFieldContainer")}>
            <TextField
              fullWidth={true}
              floatingLabelText="أضف ارقام الكروت"
              multiLine={true}
              rows={10}
              onChange={(e)=> {
                this.props.onFormFieldDataChanged({serials: e.target.value})
              }}
              />
          </div>
        </div>
        </Dialog>
    );
  }
}

export default AddNewSerials;
