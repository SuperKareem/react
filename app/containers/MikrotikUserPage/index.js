/*
 *
 * MikrotikUserPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import selectMikrotikUserPage from './selectors';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);

import ChargeCard from 'components/ChargeCard'
import ProfilesGrid from 'components/ProfilesGrid'
import DialogComponent from 'components/DialogComponent'
import UserInfo from 'components/UserInfo'
import formatDate from 'utils/formatingDate'
import {
  setSerial,
  chargeSerial,
  setProfileToSubscribe,
  profileSubscribe ,
  removeErorr,
  removeChargedSuccess,
} from './actions'
import {
  Paper,
  RaisedButton, FlatButton,
  Toolbar,
  ToolbarGroup,
  Tabs, Tab,
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui'
import {
  selectCurentMikrotikUser
} from 'containers/App/selectors'
import logo from './logo.png'
import { profilesFetch } from './actions'
export class MikrotikUserPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      page: '',
      chargeCardOpen: false,
      subscribeOpen: false,
      profileToSubscribe: false,
    }
  }
  renderUserInfo(){
    let {user} = this.props;
    return(
      <div className="">
      </div>
    )
  }
  renderHeader(){
    let {user} = this.props;
    if(!!!user._doc){
      return;
    }
    return (
      <div className="">
        <br />
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              primary={true}
              label="معلومات المستخدم"
              onClick={() => {
                this.setState({page: ''})
              }}
              />
            <RaisedButton
              primary={true}
              label="تجديد الاشتراك"
              onClick={() => {
                this.props.onProfilesFetch()
                this.setState({page: 'profiles'})
              }}
              />
          </ToolbarGroup>
          <ToolbarGroup>
            <RaisedButton
              secondary={true}
              label="شحن كرت"
              onClick={() => {
                this.setState({chargeCardOpen: true})
              }}
              />
            <Paper style={{backgroundColor: '#3F51B5'}}>
              <div className={classNames("toolbarBalance")}>
                <h3>{`الرصيد ${user._doc.balance} جـ`}</h3>
              </div>
            </Paper>
          </ToolbarGroup>
        </Toolbar><br />
      <div className={classNames("logo")}>
        <div className={classNames("logoImg")} style={{
            backgroundImage: `url(${logo})`
          }}>
        </div>
        <div className={classNames("support")}>
          <h3>للدعم الفنى الاتصال علي </h3>
          <h4 style={{color: '#00C853'}}>01222241697</h4>
          <h4 style={{color: '#2196F3'}}>01272166466</h4>
        </div>
      </div>
      </div>
    )
  }

  renderPage(){
    let {page, profileToSubscribe} = this.state;
    let {profiles} = this.props.userPage
    let {user} = this.props
    if(!user._doc.offerHasEnd){
      doLogin(user._doc.username, user._doc.password);
      // this.props.onLogIntoMikrotik();
    }
    formatDate(user._doc.offerEndDate)
    switch (page) {
      case 'profiles':
          return(
            <div>
              <ProfilesGrid
                onSubscribeClick={profile => {
                  this.setState({profileToSubscribe: profile, subscribeOpen: true})
                }}
                profiles={profiles}
                />
              {user._doc.balance >= profileToSubscribe.offerPrice && user._doc.offerHasEnd ?
                <DialogComponent
                open={this.state.subscribeOpen}
                createLabel="إشتراك"
                dialogLabel="تجديد الإشتراك"
                onCancelClick={()=>{
                  this.setState({subscribeOpen: false})
                }}
                onAddClick={()=>{
                  this.props.onSetProfileToSubscribe(profileToSubscribe)
                  this.props.onProfileSubscribe()
                  this.setState({subscribeOpen: false})
                }}
                >
                <div>
                  <h3>هل تريد دفع <span style={{color: 'brown'}}>{profileToSubscribe.offerPrice}</span> جنيهاً للإشتراك بـ {profileToSubscribe.name} لمدة {profileToSubscribe.offerLifetime} يوماً</h3>
                </div>
              </DialogComponent> :
              <DialogComponent
                open={this.state.subscribeOpen}
                createLabel="شحن كرت"
                dialogLabel={user._doc.offerHasEnd ? "الرصيد لا يكفى" : "لم تنتهي فترة الاشتراك"}
                addBtn={user._doc.offerHasEnd}
                onCancelClick={()=>{
                  this.setState({subscribeOpen: false})
                }}
                onAddClick={()=>{
                  this.setState({subscribeOpen: false, chargeCardOpen: true})
                }}
                >
                {!user._doc.offerHasEnd ?
                  <h3>  لم تنتهى مدة الاشتراك بعد لا يمكنك التجديد </h3>:
                  <h3>لا يوجد لديك رصيد كافي للإشتراك بالعرض</h3>}
              </DialogComponent>
            }
            </div>
          )
      default:
        return (
          <div>
            <UserInfo
              user={user}
              />
              <div className={classNames("socialMenu")}>
                <a href="http://www.google.com" className={classNames("icon", "google")}></a>
                <a href="http://www.facebook.com" className={classNames("icon", "facebook")}></a>
                <a href="http://www.youtube.com" className={classNames("icon", "youtube")}></a>
                <a href="http://www.yallakora.com" className={classNames("icon", "yallakora")}></a>
                <a href="http://www.almasryalyoum.com" className={classNames("icon", "masry")}></a>
                <a href="http://www.youm7.com" className={classNames("icon", "youm7")}></a>
                <a href="http://www.akhbarak.net" className={classNames("icon", "akhbrak")}></a>
              </div>

              <h3 className={classNames("copy")}>Copy rights reserved to MICRONET TEAM 	&copy; 2017</h3>
          </div>
        )
    }
  }
  render() {
    let{userPage, user} = this.props
    return (
      <div className={classNames("mikrotikUserPage")}>
        {this.renderHeader()}
        <Paper>
          <div className={classNames("pageContainer")}>
              {this.renderPage()}
          </div>
        </Paper>
        <ChargeCard
          open={this.state.chargeCardOpen}
          onAddClick={serial => {
            this.props.setSerial(serial)
            this.props.onChargeSerial()
            this.setState({chargeCardOpen: false})
          }}
          onCancelClick={()=>{
            this.setState({chargeCardOpen: false})
          }}
          />
        <DialogComponent
          open={userPage.errors}
          addBtn={false}
          dialogLabel="خطأ"
          onCancelClick={()=> this.props.onRemoveError()}
          >
          <div>
            <span>{userPage.errorMsg}</span>
          </div>
        </DialogComponent>
        <DialogComponent
          open={userPage.chargedSuccessful && user.profile != "default" && user._doc.offerHasEnd}
          dialogLabel="تم"
          createLabel="تجديد"
          onAddClick={()=>{
            this.props.onSetProfileToSubscribe({name: user.profile})
            this.props.onProfileSubscribe()
            this.props.onRemoveChargedSuccess()
          }}
          onCancelClick={()=> this.props.onRemoveChargedSuccess()}
          >
          <div>
            <h3> تم شحن الكرت بنجاح , هل تريد تجديد الاشتراك على نفس العرض  السابق ؟</h3>
          </div>
        </DialogComponent>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  userPage: selectMikrotikUserPage(),
  user: selectCurentMikrotikUser()
});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    setSerial: serial => dispatch(setSerial(serial)),
    onChargeSerial: () => dispatch(chargeSerial()),
    onProfilesFetch: () => dispatch(profilesFetch()),
    onSetProfileToSubscribe: profile => dispatch(setProfileToSubscribe(profile)),
    onRemoveError: ()=> dispatch(removeErorr()),
    onRemoveChargedSuccess: ()=> dispatch(removeChargedSuccess()),
    onProfileSubscribe: () => dispatch(profileSubscribe()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MikrotikUserPage);
