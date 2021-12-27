import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import FormCardLayout from './FormCardLayout'
import DictionaryService from '../services/DictionaryService';

export default class DictionaryEnableForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      idDictionary: "",
      primary: false
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitEnableDictionary = this.onSubmitEnableDictionary.bind(this);
  }
  componentDidMount() {
    DictionaryService.getDictionaries()
      .then((data) => {
        this.setState({
          items: data
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  onSubmitEnableDictionary = () => {
    DictionaryService.enableDictionary(this.state.idDictionary)
      .then((data) => {
        // let items = this.state.items;
        // console.log(items);
        // if (this.state.primary) {
        //   console.log(items);
        //   items.map(el => el.primary ? { ...el, primary: false } : el);
        //   console.log(items);
        // }
        // this.setState({
        //   items: [...items, data],
        // })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  render() {
    return (
      <FormCardLayout className={`${this.state.isCreationFormVisible ? "visually-hidden" : ""}`}
        icon={faLanguage}
        title="Add Dictionary"
        subtitle="Add a new dictionary."
        onSubmitCallback={this.onSubmitEnableDictionary}>
        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-static mb-4">
              <label className="ms-0">Dictionary</label>
              <select className="form-control" name="idDictionary" value={this.state.idDictionary} onChange={this.handleInputChange}>
                {
                  this.state.items.map((item, index) =>
                    <option key={index} value={item.id}>{item.name}</option>
                  )
                }
              </select>
            </div>
          </div>
        </div>
      </FormCardLayout>
    );
  }
}