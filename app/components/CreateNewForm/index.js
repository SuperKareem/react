/**
*
* CreateNewForm
*
*/

import React from 'react';

import styles from './styles.css';
import {
  TextField
} from 'material-ui'
class CreateNewForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    let {
      formFields,
      formData,
      onFormDataChanged
    } = this.props
    return (
      <div dir="rtl" className={styles.createNewForm}>
        {formFields.map((field, index) => {
          return(
            <div key={index} className="">
              <TextField
                floatingLabelText={field.title}
                fullWidth={true}
                defaultValue={formData[field.name]}
                onChange={(e) => {
                  onFormDataChanged({...formData, ...{[`${field.name}`]: e.target.value}})
                }}
                />
              <br />
            </div>
          )
        })}
      </div>
    );
  }
}

export default CreateNewForm;
