import React, { Component } from 'react';
import FormCardLayout from '../components/FormCardLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faFont } from '@fortawesome/free-solid-svg-icons'
import LanguageList from '../components/LanguageList';
import DictionaryService from '../services/DictionaryService';

export default class LanguageManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languages: [],
      name: "",
      code: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickRemoveLanguage = this.onClickRemoveLanguage.bind(this);
    this.onSubmitAddLanguage = this.onSubmitAddLanguage.bind(this);
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
  }
  onSubmitAddLanguage = () => {
    DictionaryService.addLanguage(this.state.name, this.state.code)
      .then((data) => {
        this.setState({
          languages: [...this.state.languages, data],
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onClickRemoveLanguage = (id) => {
    DictionaryService.removeLanguageById(id)
      .then(() => {
        this.setState({
          languages: this.state.languages.filter(x => x.id !== id)
        })
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
            icon={faFont}
            title="Add Language"
            subtitle="Add a new language to the available dictionaries."
            onSubmitCallback={this.onSubmitAddLanguage}>
            <div className="row">
              <div className="col-12 col-xl-6">
                <div className="input-group input-group-static">
                  <label>Name</label>
                  <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-xl-6">
                <div className="input-group input-group-static">
                  <label>ISO Code</label>
                  <input className="form-control" type="text" maxLength="5" name="code" value={this.state.code} onChange={this.handleInputChange} />
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
                  <LanguageList languages={this.state.languages} onClickRemoveLanguageCallback={this.onClickRemoveLanguage} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}