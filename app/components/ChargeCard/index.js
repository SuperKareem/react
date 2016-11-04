/**
*
* ChargeCard
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

class ChargeCard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static defaultProps = {
    createLabel: "شحن",
    dialogLabel: 'شحن كرت',
  }
  constructor(props){
    super(props)
    this.state = {
      serial: ''
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
      label={this.props.createLabel}
      secondary={true}
      keyboardFocused={true}
      onClick={() => {
        this.props.onAddClick(this.state.serial);
      }}
    />,
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
        <div className={classNames("editUserForm")} dir="rtl">
          <div className={classNames("serialsNumber")}>
            <TextField
              floatingLabelText="أدخل رقم كرت الشحن"
              fullWidth={true}
              defaultValue={this.state.serial}
              onChange={e => {
                this.setState({serial: e.target.value})
              }}
              />
          </div>
        </div>
        </Dialog>
    );
  }
}

export default ChargeCard;
