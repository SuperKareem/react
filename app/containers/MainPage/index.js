/*
 *
 * MainPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { push } from 'react-router-redux';
import NetworksGrid from 'components/NetworksGrid';
import selectMainPage from './selectors';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import NewNetworkForm from 'components/NewNetworkForm'
var classNames = classNamesBind.bind(classes);
import {
  selectCurrentUser,
 } from 'containers/App/selectors'
import {
  selectIsLoading,
  selectNetworkForm,
  selectNetworks
} from './selectors'
import {
  RaisedButton,
  Toolbar,
  ToolbarGroup,
  Dialog,
  FlatButton,
  LinearProgress,
  Paper
} from 'material-ui'
import {
  networkFormDataChanging,
  addNewNetwork
 } from './actions'
 import { networkSelected } from 'containers/App/actions'

export class MainPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      opendDialog: false
    }
  }
  getNetworkGridElements(){
    let {networks} = this.props;
    let elements = !!networks.data && !!networks.data.length > 0 ?
    networks.data.map((item, index)=>{
      return(
          <div key={index} className={classNames("networkItem")}>
              <FlatButton
                label={item.name}
                onClick={() => {
                  this.props.onNetworkSelected(item)
                }}
                />
          </div>
      )
    }) : []
    return elements
  }
  // renderLoadIndicator(){
  //   let {isLoading} = this.props;
  //   if(isLoading){
  //     return(
  //       <div className="">
  //         <LinearProgress color="rgb(255, 64, 129)" mode="indeterminate" /><br />
  //       </div>
  //     )
  //   }
  // }
  renderDialog(){
    let {
      networkForm,
      onNetworkFormDataChanged,
      addNewNetwork
    } = this.props;
    const actions = [
      <FlatButton
        label="إلغاء"
        primary={true}
        onClick={() => {
          this.toggleDialog()
        }}
      />,
      <FlatButton
        label="إضافة"
        primary={true}
        keyboardFocused={true}
        onClick={() => {
          addNewNetwork()
          this.toggleDialog()
        }}
      />,
    ];
    return(
      <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.opendDialog}
          onRequestClose={this.handleClose}
        >
          <NewNetworkForm
            networkForm={networkForm.data}
            onNetworkFormDataChanged={onNetworkFormDataChanged}
            />
        </Dialog>
    )
  }
  toggleDialog(){
    this.setState({
      opendDialog: !this.state.opendDialog
    })
  }
  render() {
    return (
      <div className={classNames("mainPage")}>
        <div className={classNames("indicator")}>
        </div>
        <div className={classNames("networksContainer")}>
          <div className="">
            <Toolbar>
              <ToolbarGroup firstChild={true}>
                <RaisedButton
                  label=" + إضافة شبكه"
                  secondary={true}
                  onClick={() => {
                    this.toggleDialog()
                  }}
                  />
              </ToolbarGroup>
            </Toolbar> <br />
            <div className={classNames("grid")}>
              <NetworksGrid
                list={this.getNetworkGridElements()}
                />
            </div> <br />
          </div>
          {this.renderDialog()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading(),
  currentUser: selectCurrentUser(),
  networkForm: selectNetworkForm(),
  networks: selectNetworks()
});

function mapDispatchToProps(dispatch) {
  return {
    onNetworkFormDataChanged: (network)=> dispatch(networkFormDataChanging({...network})),
    addNewNetwork: ()=> dispatch(addNewNetwork()),
    onNetworkSelected: (network) => {
      dispatch(networkSelected(network))
    },
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
