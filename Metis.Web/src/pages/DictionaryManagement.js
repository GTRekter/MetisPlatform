import React, { Component } from 'react';
import FormLayout from '../components/FormLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DictionaryService from '../services/DictionaryService';

export default class DictionaryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languages: [],
      wordTypes: [],
      correct: [],
      topics: [],
      currentWord: "",
      currentTopic: ""
    }
  }
  componentDidMount() {
    DictionaryService.getAllLanguages()
      .then((data) => {
        this.setState({
          languages: data
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    DictionaryService.getAllWordTypes()
      .then((data) => {
        this.setState({
          wordTypes: data
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  render() {
    return (
      <FormLayout>
        <div className="col-12">
          <p className="text-sm">
            Add a new word to the choosen dictionary.
          </p>
        </div>
        <div className="row">
          <div className="col-12 col-xl-4">
            <div className="input-group input-group-static">
              <label>Word</label>
              <input className="form-control" type="text" />
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="input-group input-group-static mb-4">
              <label className="ms-0">Language</label>
              <select className="form-control">
                {
                  this.state.languages.map((language, index) =>
                    <option key={index}>{language.name}</option>
                  )
                }
              </select>
              <span class="input-group-text px-2">
                <FontAwesomeIcon className='position-relative opacity-10' icon={faPlus} />
              </span>
            </div>
          </div>
          <div className="col-12 col-xl-4">
            <div className="input-group input-group-static mb-4">
              <label className="ms-0">Type</label>
              <select className="form-control">
                {
                  this.state.wordTypes.map((wordType, index) =>
                    <option key={index}>{wordType.name}</option>
                  )
                }
              </select>
              <span class="input-group-text px-2">
                <FontAwesomeIcon className='position-relative opacity-10' icon={faPlus} />
              </span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="input-group input-group-dynamic">
              <textarea className="form-control" rows="3" placeholder="Example"></textarea>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12">
            <div className="input-group input-group-dynamic">
              <textarea className="form-control" rows="3" placeholder="Description"></textarea>
            </div>
          </div>
        </div>
      </FormLayout>
    );
  }
}