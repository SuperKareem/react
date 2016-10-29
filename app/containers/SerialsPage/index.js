/*
 *
 * SerialsPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSerialsPage from './selectors';
import classes from './styles.css'
import classNamesBind from 'classnames/bind';
var classNames = classNamesBind.bind(classes);

import AddNewSerials from 'components/AddNewSerials'
import SerialGridItem from 'components/SerialGridItem'
import PrintSerials from 'components/PrintSerials'
import DialogComponent from 'components/DialogComponent'
import forms from './formData'
import CreateNewSerials from 'components/createNewSerials'
import copy from 'copy-to-clipboard'
import {
  createNewSerialsFormDataChanged,
  updateSerialDataChanged,
  createNewSerials,
  selectSerial,
  updateSerial,
  deleteSerial,
  addNewSerialsFormDataChanged,
  addNewSerials,
} from './actions'
import {
  Toolbar,
  ToolbarGroup,
  TextField,
  RaisedButton,
  FlatButton,
  Paper,
} from 'material-ui'


export class SerialsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
      serialSearch: '',
      createNewSerialsOpen: false,
      editSerialOpen: false,
      addNewSerialsOpen: false,
      renderByPrice: false,
      printSerialsOpen: false,
      serialsToPrint: '',
      serialsToPrintPrice: '',
      serialInfoOpen: false,
      serialInfo:'',
      sortName: 'all',
      pageNum: 1
    }
  }
  renderToolbar(){
    return(
      <Toolbar className={classNames("toolbar")}>
        <ToolbarGroup>
          <div className={classNames("searchField")}>
            <TextField
              defaultValue={this.state.serialSearch}
              floatingLabelText="بحث عن كرت"
              onChange={(e)=>{
                this.setState({
                  serialSearch: e.target.value
                })
              }}
              />
          </div>
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton
            primary={true}
            label={this.state.renderByPrice ? "إظهار الكروت": "طباعة كروت"}
            onClick={() => {
              this.setState({renderByPrice: !this.state.renderByPrice})
            }}
            />
          <RaisedButton
            secondary={true}
            label="إنشاء كروت جديدة +"
            onClick={() => {
              this.setState({createNewSerialsOpen: !this.state.createNewSerialsOpen})
            }}
            />
            <RaisedButton
              secondary={true}
              label=" إضافة كروت +"
              onClick={() => {
                this.setState({addNewSerialsOpen: !this.state.addNewSerialsOpen})
              }}
              />
        </ToolbarGroup>
      </Toolbar>
    )
  }
  renderSerialGridItem(serial, index){
    return(
      <SerialGridItem
        key={index}
        index={index}
        serial={serial.license}
        date={new Date(serial.date).toDateString()}
        price={serial.price}
        active={serial.active}
        onActiveClick={()=>{
          this.setState({serialInfo: serial,serialInfoOpen: true})
        }}
        onEditClick={()=>{
          this.props.onSelectSerial(serial)
          this.setState({editSerialOpen: !this.state.editSerialOpen})
        }}
        onDeleteClick={()=>{
          this.props.onSelectSerial(serial)
          this.props.onDeleteSerial()
        }}
        onDisableClick={()=>{
          this.props.onSelectSerial(serial)
          this.props.onUpdateSerialDataChanged({...serial, ...{active: !serial.active}})
          this.props.onUpdateSerial()
        }}
        />
    )
  }
  renderSerials(){
    let {serials} = this.props;
    if(!serials){
      return;
    }
    return(
      <div className="">
        <SerialGridItem
          index="م"
          active
          serial="رقم الكرت"
          price="السعر"
          checkbox={true}
          date="التاريخ"
          dateFormat={true}
          sortName={this.state.sortName}
          disabled={true}
          sorting={(sortBy) => {
            this.setState({sortName: sortBy})
          }}
          />
        <div className={classNames("serialsGridContainer")}>
          {serials.map((serial, index)=>{
            let maxIndex = this.state.pageNum * 10;
            let minIndex = (this.state.pageNum - 1 ) * 10;
            if(index < maxIndex && index > minIndex){
              if(this.state.serialSearch == ''){
                if(this.state.sortName == 'online'){
                  if(serial.active){
                    return this.renderSerialGridItem(serial, index)
                  }
                }
                else if(this.state.sortName == 'disabled'){
                  if(!serial.active){
                    return this.renderSerialGridItem(serial, index)
                  }
                }
                else {
                  return this.renderSerialGridItem(serial, index)
                }
              } else {
                if(serial.license.indexOf(this.state.serialSearch) != -1|| serial.price.toString().indexOf(this.state.serialSearch) != -1){
                  return this.renderSerialGridItem(serial, index)
                }
              }
            }
          })}
        </div>
      </div>
    )
  }
  renderSerialsByPrice(){
    let {serials} = this.props;
    if(!serials)
      return;
    let group = [];
    let prices = [];
    serials.map((serial, index) => {
      if(prices.lastIndexOf(serial.price) == -1){
        let obj = {
          price: serial.price,
          number: 1,
          date: new Date(serial.date).toDateString()
        }
        group.push(obj)
        prices.push(serial.price)
      } else {
        group[prices.lastIndexOf(serial.price)].number = group[prices.lastIndexOf(serial.price)].number + 1
      }
    })
    return(
      <div className="">
        <SerialGridItem
          serial="سعر الكروت"
          date="عدد الكروت"
          price="تاريخ الإنتاج"
          showDots={false}
          active={true}
          onEditClick={()=>{
          }}
          onDeleteClick={()=>{
          }}
          onDisableClick={()=>{
          }}
          />
        <div className={classNames("serialsGridContainer")}>
          {group.map((serial, index)=>{
            return(
              <SerialGridItem
                showDots={false}
                key={index}
                serial={serial.price}
                date={serial.number}
                price={new Date(serial.date).toDateString()}
                active={true}
                onClick={() => {
                  let _serials = ''
                  serials.map(s => {
                    if(s.price == serial.price){
                      _serials = _serials + s.license + '\n'
                    }
                  })
                  this.setState({
                    serialsToPrintPrice: serial.price,
                    serialsToPrint: _serials,
                    printSerialsOpen: true
                  })
                }}
                />
            )
          })}
        </div>
      </div>
    )
  }
  render() {
    return (
      <div className={classNames("serialsPage")}>
        {this.renderToolbar()}
        <Paper>
          {!this.state.renderByPrice ?
          this.renderSerials() :
          this.renderSerialsByPrice()}
          <div className={classNames("pagingContainer")}>
            <div>
              <RaisedButton
                label="السابق"
                primary={true}
                disabled={((this.state.pageNum - 1) < 1)}
                onClick={()=> {
                  if((this.state.pageNum - 1) > 1)
                    this.setState({pageNum: this.state.pageNum - 1})
                  }
                }
              />
            </div>
            <div>
              <FlatButton
                label={`صفحة رقم ${this.state.pageNum}`}
              />
            </div>
            <div>
              <RaisedButton
                label="التالي"
                primary={true}
                disabled={!(((this.props.serials.length / 10) - (this.state.pageNum + 1)) > -1)}
                onClick={()=> {
                  let {pageNum} = this.state
                  let max = this.props.serials.length / 10;
                  if((max - (pageNum + 1)) > -1)
                    this.setState({pageNum: pageNum + 1})
                  }
                }
              />
            </div>
          </div>
        </Paper>
        <CreateNewSerials
          open={this.state.createNewSerialsOpen}
          autoFormFields={forms.newSerialsFormData}
          autoFormData={this.props.createNewSerialsFormData}
          onAutoFormDataChanged={(formData)=>{
            this.props.onCreateNewSerialsFormDataChanged(formData);
          }}
          onCancelClick={()=>{
            this.setState({createNewSerialsOpen: false})
          }}
          onCreateClick={()=>{
            this.props.onCreateNewSerials()
            this.setState({createNewSerialsOpen: false})
          }}
          />
        <CreateNewSerials
          open={this.state.editSerialOpen}
          autoFormFields={forms.editSerialFormData}
          autoFormData={this.props.selectedSerial}
          createLabel="تعديل"
          dialogLabel="تعديل كرت"
          onAutoFormDataChanged={(formData) => {
            this.props.onUpdateSerialDataChanged({...this.props.selectedSerial, ...formData})
          }}
          onCreateClick={()=>{
            this.props.onUpdateSerial()
            this.setState({editSerialOpen: false})
          }}
          onCancelClick={()=>{
            this.setState({editSerialOpen: false})
          }}
          />
        <AddNewSerials
          open={this.state.addNewSerialsOpen}
          formFields={this.props.addNewSerialsFormData}
          onFormFieldDataChanged={(formData)=> {
            this.props.onAddNewSerialsFormDataChanged({...this.props.addNewSerialsFormData, ...formData})
          }}
          onAddClick={() => {
            this.props.onAddNewSerials()
            this.setState({addNewSerialsOpen: false})
          }}
          onCancelClick={() => {
            this.setState({addNewSerialsOpen: false})
          }}
          />
        <PrintSerials
          open={this.state.printSerialsOpen}
          serials={this.state.serialsToPrint}
          serialsPrice={this.state.serialsToPrintPrice}
          onCancelClick={()=> {
            this.setState({printSerialsOpen: false})
          }}
          onAddClick={()=> {
            copy(this.state.serialsToPrint)
            this.setState({printSerialsOpen: false})
          }}
          />
        <DialogComponent
          open={this.state.serialInfoOpen}
          addBtn={false}
          dialogLabel="شحن بواسطة"
          onCancelClick={()=>{
            this.setState({serialInfoOpen: false})
          }}
          >
            {!!this.state.serialInfo.username ?
              <div className={classNames("row")}>
                <span>الاسم : {this.state.serialInfo.comment} </span>
                <span>اسم المستخدم : {this.state.serialInfo.username}</span>
              </div>:
              <div>
                <span>تم الايقاف من قبل المدير</span>
              </div>
          }
        </DialogComponent>
      </div>
    );
  }
}

const mapStateToProps = selectSerialsPage();

function mapDispatchToProps(dispatch) {
  return {
    onCreateNewSerialsFormDataChanged: (newData) => dispatch(createNewSerialsFormDataChanged(newData)),
    onCreateNewSerials: () => dispatch(createNewSerials()),
    onUpdateSerialDataChanged: (newData) => dispatch(updateSerialDataChanged(newData)),
    onSelectSerial: (serial) => dispatch(selectSerial(serial)),
    onUpdateSerial: () => dispatch(updateSerial()),
    onDeleteSerial: () => dispatch(deleteSerial()),
    onAddNewSerialsFormDataChanged: (newData) => dispatch(addNewSerialsFormDataChanged(newData)),
    onAddNewSerials: ()=> dispatch(addNewSerials()),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SerialsPage);
