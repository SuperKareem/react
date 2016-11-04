/**
*
* DialogComponent
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import CreateNewForm from 'components/CreateNewForm'
var classNames = classNamesBind.bind(classes);
import {
  Dialog, DropDownMenu, FlatButton,TextField, RaisedButton
} from 'material-ui'

class DialogComponent extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    addBtn: true
  }

  getActions(){
    const actions = [
      <FlatButton
      label="إلغاء"
      primary={true}
      onClick={() => {
        this.props.onCancelClick();
      }}
    />,
  this.props.addBtn ? <RaisedButton
      label={this.props.createLabel}
      secondary={true}
      onClick={() => {
        this.props.onAddClick();
      }}
    />: null,
  ];
  return actions;
  }

  render() {
    let {
      open,
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
        <div className={classNames("dialogConatainer")} dir="rtl">
          {this.props.children}
        </div>
        </Dialog>
    );
  }
}

export default DialogComponent;
