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
  MenuItem
} from 'material-ui'
import ProfileGridItem  from 'components/ProfileGridItem'
import CreateNewForm  from 'components/CreateNewForm'
import { addNewProfileFormData, addNewProfile } from './actions'

var newProfileFormFiedls = [
  {
    name: 'name',
    title: 'أسم العرض'
  },
  {
    name: 'uploadSpeed',
    title: 'سرعة الابلود'
  },
  {
    name: 'downloadSpeed',
    title: 'سرعة الداونلود'
  },
  {
    name: 'uploadLimit',
    title: 'داونلود'
  },
  {
    name: 'downloadLimit',
    title: 'ابلود'
  },
  {
    name: 'offerLifetime',
    title: 'مدة العرض'
  },
  {
    name: 'offerPrice',
    title: 'سعر العرض'
  },
]



export class ProfilesContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state = {
      newOfferDialogOpend: false
    }
  }

  toggleAddNewOfferDialog(){
    this.setState({
      newOfferDialogOpend: !this.state.newOfferDialogOpend
    })
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
        <FlatButton
          label="إضافة"
          primary={true}
          keyboardFocused={true}
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
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            autoScrollBodyContent={true}
            open={this.state.newOfferDialogOpend}
          >
            <div className={classNames("formContainer")}>
              <CreateNewForm
                formFields={newProfileFormFiedls}
                formData={newProfileFormData}
                onFormDataChanged={(formData)=>{
                  onNewProfileFormDataChanged(formData)
                }}
                />
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
          name={profile.name}
          downloadLimit={profile.downloadLimit}
          uploadLimit={profile.uploadLimit}
          downloadSpeed={profile.downloadSpeed}
          uploadSpeed={profile.uploadSpeed}
          offerLifetime={profile.offerLifetime}
          offerPrice={profile.offerPrice}
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
        <Paper>
          <ProfileGridItem
            checkbox={true}
            name="أسم العرض"
            downloadLimit="داونلود"
            uploadLimit="ابلود"
            downloadSpeed="سرعة الداونلود"
            uploadSpeed="سرعة الابلود"
            offerLifetime="مدة العرض ( يوم )"
            offerPrice="سعر العرض"
            />
          {this.renderCurrentProfiles()}
          {this.renderAddNewProfile()}
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
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilesContainer);
