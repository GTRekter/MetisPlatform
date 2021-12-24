import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBook } from '@fortawesome/free-solid-svg-icons'
import DictionaryList from '../components/DictionaryList';
import FormCardLayout from '../components/FormCardLayout';
import DictionaryService from '../services/DictionaryService';


export default class DictionaryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dictionaries: [],
      name: "",
      code: ""
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onSubmitAddDictionary = this.onSubmitAddDictionary.bind(this);
  }
  componentDidMount() {
    DictionaryService.getAllDictionaries()
      .then((data) => {
        this.setState({
          dictionaries: data
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  onSubmitAddDictionary = () => {
    DictionaryService.addDictionary(this.state.name, this.state.code)
      .then((data) => {
        this.setState({
          dictionaries: [...this.state.dictionaries, data],
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onClickRemove = (id) => {
    DictionaryService.removeDictionaryById(id)
      .then(() => {
        this.setState({
          dictionaries: this.state.dictionaries.filter(x => x.id !== id)
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
            icon={faBook}
            title="Add Dictionary"
            subtitle="Add a new dictionary."
            onSubmitCallback={this.onSubmitAddDictionary}>
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
                  <h6 className="text-white text-capitalize ps-3">Dictionaries</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <DictionaryList dictionaries={this.state.dictionaries} onClickRemoveCallback={this.onClickRemove} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}