/**
*
* ProfilesGrid
*
*/

import React from 'react';

import classes from './styles.css'
import classNamesBind from 'classnames/bind';
import NewNetworkForm from 'components/NewNetworkForm'
var classNames = classNamesBind.bind(classes);
import {
  Paper,RaisedButton
} from 'material-ui'
var colors = [
  '#FDD835','#3949AB','#00ACC1','#D81B60','#1E88E5','#FDD835','#3949AB','#00ACC1','#D81B60','#1E88E5'
]
class ProfilesGrid extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    if(!!!this.props.profiles[0]){
      return null;
    }
    let {
      profiles
    } = this.props;
    return (
      <div className={classNames("profilesGrid")}>
        {profiles.map((profile, index)=>{
          return(
            <div key={index} className={classNames("profileWrapper")}
              onClick={()=>{
                this.props.onSubscribeClick(profile);
              }}
              >
              <Paper>
                <div className={classNames("profileDetials")}>
                  <div className={classNames("priceHolder")}>
                    <div className={classNames("price")}>
                      <RaisedButton labelColor="white" backgroundColor={colors[index]}
                        label={`${profile.offerPrice} جـ`}>
                      </RaisedButton>
                    </div>
                  </div>
                  <div className={classNames("name")}>
                    <h3>{profile.name}</h3>
                  </div>
                  <div className={classNames("details")}>
                    <div className={classNames("row")}>
                      <span className={classNames("mainColor")}>السرعة</span>
                      <span className={classNames("secColor")}>{(profile.downloadSpeed / 1024)} MB</span>
                    </div>
                    <div className={classNames("row")}>
                      <span className={classNames("mainColor")}>كمية التحميل</span>
                      <span className={classNames("secColor")}>{profile.downloadLimit}<span> </span>GB</span>
                    </div>
                    <div className={classNames("row")}>
                      <span className={classNames("mainColor")}> مدة العرض</span>
                      <span className={classNames("secColor")}>{profile.offerLifetime} يوم</span>
                    </div>
                    <div className={classNames("row")}>
                      <RaisedButton secondary={true}
                        label="إشتراك"
                        />
                    </div>
                  </div>
                </div>
              </Paper>
            </div>
          )
        })}
      </div>
    );
  }
}

export default ProfilesGrid;
