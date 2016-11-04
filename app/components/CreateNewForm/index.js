/**
*
* CreateNewForm
*
*/

import React from 'react';


import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);
import {orange500, blue500} from 'material-ui/styles/colors';

import {
  TextField,
  Checkbox
} from 'material-ui'
class CreateNewForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let {
      formFields,
      formData,
      onFormDataChanged
    } = this.props
    return (
      <div dir="rtl" className={classNames("createNewForm")}>
        {formFields.map((field, index) => {
          if(!!field.type){
            if(field.type == "checkbox"){
              return(
                <div key={index} className="fullWidth">
                  <Checkbox
                    label={field.title}
                    onCheck={()=>{
                      field.onCheck();
                    }}
                    />
                </div>
              )
            }
          } else if (!!field.auto) {
            return(
              <div key={index} className="">
                <TextField
                  floatingLabelText={field.title}
                  fullWidth={true}
                  disabled={!!field.disabled}
                  defaultValue={!!formData.downloadSpeed ? (formData.downloadSpeed / 4) : '' }
                  onChange={(e) => {
                    console.log((formData.downloadSpeed / 4));
                    onFormDataChanged({...formData, ...{[`${field.name}`]: !!formData.downloadSpeed ? (formData.downloadSpeed / 4) : ''}})
                  }}
                  />
                <br />
              </div>
            )
          } else {
            if(field.name == "email"){
              return(
                <div key={index} className="">
                  <TextField
                    floatingLabelText={field.title}
                    fullWidth={true}
                    rows={5}
                    disabled={!!field.disabled}
                    defaultValue={!!field.date ? new Date(formData[field.name]).toDateString() : formData[field.name]}
                    onChange={(e) => {
                      onFormDataChanged({...formData, ...{[`${field.name}`]: e.target.value}})
                    }}
                    />
                  <br />
                </div>
              )
            }
            return(
              <div key={index} className="">
                <TextField
                  floatingLabelText={field.title}
                  fullWidth={true}
                  disabled={!!field.disabled}
                  defaultValue={!!field.date ? new Date(formData[field.name]).toDateString() : formData[field.name]}
                  onChange={(e) => {
                    onFormDataChanged({...formData, ...{[`${field.name}`]: e.target.value}})
                  }}
                  />
                <br />
              </div>
            )
          }
        })}
      </div>
    );
  }
}

export default CreateNewForm;
