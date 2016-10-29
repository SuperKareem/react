/*
 *
 * ProfilesContainer
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectProfilesContainer from './selectors';
import { selectCurrentProfiles } from 'containers/App/selectors'
import { createStructuredSelector } from 'reselect'
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import styles from './styles.css';
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
  MenuItem, Popover
} from 'material-ui'
import ProfileGridItem  from 'components/ProfileGridItem'
import CreateNewForm  from 'components/CreateNewForm'
import DialogComponent  from 'components/DialogComponent'

import {
  addNewProfileFormData,
  addNewProfile,
  selectProfile,
  deleteProfile,
} from './actions'

var newProfileFormFiedls = [
  {
    name: 'name',
    title: 'أسم العرض'
  },
  {
    name: 'offerPrice',
    title: 'سعر العرض'
  },
  {
    name: 'downloadSpeed',
    title: 'سرعة التحميل'
  },
  {
    name: 'uploadSpeed',
    title: 'سرعة الرفع (التحميل / 4)'
  },
  {
    name: 'downloadLimit',
    title: 'التحميل (جيجا)'
  },
  {
    name: 'uploadLimit',
    title: 'الرفع (جيجا)'
  },
  {
    name: 'offerLifetime',
    title: 'مدة العرض'
  },

]



export class ProfilesContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      newOfferDialogOpend: false,
      deleteProfileOpen: false,
      limitEndOffer: 'اختر العرض',
      profileMenuOpen: false,
    }
  }

  toggleAddNewOfferDialog(){
    this.setState({
      limitEndOffer: 'اختر العرض',
      newOfferDialogOpend: !this.state.newOfferDialogOpend
    })
  }
  renderProfilesDropDownMenu(onProfileSelected){
    let {currentProfiles} = this.props;
    return(
      <div className={classNames("limitEndOffer")} style={{padding: 20}}>
        <h4>عرض انتهاء الداونلود</h4>
        <RaisedButton
          secondary={true}
          onClick={event => this.setState({profileMenuOpen: true, anchorEl: event.currentTarget})}
          label={this.state.limitEndOffer}
          />
           <Popover
            open={this.state.profileMenuOpen}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={()=> this.setState({profileMenuOpen: false})}
            >
            <div className={classNames("dropdownClass")}>
              {!!currentProfiles && currentProfiles.length > 0 ? currentProfiles.map((profile, index)=>{
                return(
                  <FlatButton
                    key={index}
                    secondary={true}
                    label={profile.name}
                    onClick={()=>{
                      this.props.onNewProfileFormDataChanged({...this.props.newProfileFormData, ...{limitEndOffer: profile.name}})
                      this.setState({limitEndOffer: profile.name, profileMenuOpen: false})
                    }}
                    />
                )
              }): null}
            </div>
          </Popover>
      </div>
    )
  }
    renderAddNewProfile(){
      const actions = [
        <FlatButton
          label="إلغاء"
          primary={true}
          onClick={() => {
            this.toggleAddNewOfferDialog()
          }}
        />,
      <RaisedButton
          label="إضافة"
          primary={true}
          onClick={() => {
            this.props.onAddNewProfile()
            this.toggleAddNewOfferDialog()
          }}
        />,
      ];
      let {newProfileFormData} = this.props.profilesState
      let {onNewProfileFormDataChanged} = this.props
      return(
        <Dialog
          titleStyle={{
            textAlign: 'right'
          }}
            title="إضافة عرض جديد"
            actions={actions}
            modal={false}
            autoScrollBodyContent={true}
            open={this.state.newOfferDialogOpend}
          >
            <div className={classNames("formContainer")}>
              <CreateNewForm
                formFields={newProfileFormFiedls}
                formData={newProfileFormData}
                calculateUploadSpeed={true}
                onFormDataChanged={(formData)=>{
                  onNewProfileFormDataChanged(formData)
                }}
                />
              {this.renderProfilesDropDownMenu()}
            </div>
          </Dialog>
      )
    }


  renderCurrentProfiles(){
    let {currentProfiles} = this.props;
    let elements = !!currentProfiles.length > 0 ? currentProfiles.map((profile, index) => {
      return(
        <ProfileGridItem
          key={index}
          checkbox={false}
          showDots={true}
          name={profile.name}
          downloadLimit={profile.downloadLimit}
          uploadLimit={profile.uploadLimit}
          downloadSpeed={profile.downloadSpeed}
          uploadSpeed={profile.uploadSpeed}
          offerLifetime={profile.offerLifetime}
          offerPrice={profile.offerPrice}
          onDeleteClick={()=>{
            this.props.onSelectProfile(profile)
            this.setState({deleteProfileOpen: true})
          }}
          />
      )
    }) : null
    return elements
  }
  render() {
    return (
      <div className={styles.profilesContainer}>
        <Toolbar>
          <ToolbarGroup>
            <RaisedButton
              secondary={true}
              label="إضاف عرض جديد"
              onClick={() => {
                this.setState({newOfferDialogOpend: true})
              }}
              />
          </ToolbarGroup>
        </Toolbar><br />
      <Paper className={classNames("profilesWrapper")}>
          <ProfileGridItem
            checkbox={true}
            name="أسم العرض"
            downloadLimit="داونلود"
            showDots={true}
            uploadLimit="ابلود"
            downloadSpeed="السرعة"
            offerLifetime="مدة العرض ( يوم )"
            offerPrice="سعر العرض"
            />
          <div className={classNames("profilesTableBody")}>
            {this.renderCurrentProfiles()}
          </div>
          {this.renderAddNewProfile()}
          <DialogComponent
            open={this.state.deleteProfileOpen}
            dialogLabel="حذف عرض"
            addBtn={true}
            createLabel="حذف"
            onCancelClick={()=> this.setState({deleteProfileOpen: false})}
            onAddClick={()=> {
              this.props.onDeleteProfile()
              this.setState({deleteProfileOpen: false})
            }}
            >
            <h3>هل انت متاكد ؟</h3>
          </DialogComponent>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  profilesState: selectProfilesContainer(),
  currentProfiles: selectCurrentProfiles()
})

function mapDispatchToProps(dispatch) {
  return {
    onNewProfileFormDataChanged: profile => dispatch(addNewProfileFormData(profile)),
    onAddNewProfile: ()=> dispatch(addNewProfile()),
    onSelectProfile: profile => dispatch(selectProfile(profile)),
    onDeleteProfile: () => dispatch(deleteProfile()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesContainer);
