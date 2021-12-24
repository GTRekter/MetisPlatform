import React, { Component } from 'react';
import FormCardLayout from '../components/FormCardLayout';
import DictionaryService from '../services/DictionaryService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

export default class DictionaryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languages: [],
      wordTypes: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
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
      <div>
        <div className="row">
          <div className="col-12">
            <div className="btn-toolbar mb-2 mb-md-0">
              <button className="btn btn-secondary" data-bs-toggle="collapse" data-bs-target="#collapseCreationForm" aria-expanded="false" aria-controls="collapseCreationForm">
                <FontAwesomeIcon className='position-relative opacity-10' icon={faPlus} />
                <span className='px-2'>Add</span>
              </button>
            </div>
          </div>
        </div>

        <div class="collapse" id="collapseCreationForm">
          <FormCardLayout className={`${this.state.isCreationFormVisible ? "visually-hidden" : ""}`}
            title="Add Word"
            subtitle="Add a new word to the choosen dictionary."
            onSubmitCallback={this.onSubmitAddLanguage}>
            <div className="row">
              <div className="col-12 col-xl-4">
                <div className="input-group input-group-static">
                  <label>Word</label>
                  <input className="form-control" type="text" />
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="input-group input-group-static mb-4">
                  <label className="ms-0">Dictionary</label>
                  <select className="form-control">
                    {
                      this.state.languages.map((language, index) =>
                        <option key={index}>{language.name}</option>
                      )
                    }
                  </select>
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
          </FormCardLayout>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Languages</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  {/* <LanguageList languages={this.state.languages} onClickRemoveLanguageCallback={this.onClickRemoveLanguage} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}