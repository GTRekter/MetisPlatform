import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import LanguageList from '../components/LanguageList';
import DictionaryService from '../services/DictionaryService';
import ModalLayout from '../components/ModalLayout';

export default class LanguageManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      languages: [],
      name: "",
      code: "",
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
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
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
  onSubmitAddLanguage = (event) => {
    event.preventDefault();
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
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className="btn-toolbar mb-2 mb-md-0">
              <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#languageModal">
                <FontAwesomeIcon className='position-relative opacity-10' icon={faPlus} />
                <span className='px-2'>Add</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-info shadow-info border-radius-lg pt-4 pb-3">
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

        <ModalLayout id="languageModal" title="Add Language" subtitle="Add a new language.">
          <form onSubmit={this.onSubmitAddLanguage}>
            <div className="card-body">
              <div className="row">
                <div className="col-12 col-xl-6">
                  <div className="input-group input-group-static">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-12 col-xl-6">
                  <div className="input-group input-group-static">
                    <label>Code</label>
                    <input className="form-control" type="text" maxLength="5" name="code" value={this.state.code} onChange={this.handleInputChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer px-2">
              <button type="reset" className="btn bg-gradient-secondary mx-2" data-bs-dismiss="modal">Reset</button>
              <button type="submit" className="btn bg-gradient-primary">Save changes</button>
            </div>
          </form>
        </ModalLayout>
      </div>
    );
  }
}