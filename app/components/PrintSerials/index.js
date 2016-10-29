/**
*
* PrintSerials
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

class PrintSerials extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    createLabel: "طباعة",
    dialogLabel: 'إضغط Ctrl + c',
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
      serialsPrice,
      serials
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
              defaultValue={serialsPrice}
              disabled={true}
              />
          </div>
          <div className={classNames("serialsFieldContainer")}>
            <TextField
              fullWidth={true}
              disabled={true}
              multiLine={true}
              rows={10}
              floatingLabelText=" أرقام الكروت"
              defaultValue={serials}
              />
          </div>
        </div>
        </Dialog>
    );
  }
}

export default PrintSerials;
