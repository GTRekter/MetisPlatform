import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DictionaryService from '../services/DictionaryService';
import ModalLayout from '../components/ModalLayout';
import WordTypeList from '../components/WordTypeList';

export default class WordTypeManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wordTypes: [],
      name: "",
      code: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickRemoveWordType = this.onClickRemoveWordType.bind(this);
    this.onSubmitAddWordType = this.onSubmitAddWordType.bind(this);
  }
  componentDidMount() {
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
  onClickRemoveWordType = (id) => {
    DictionaryService.removeWordTypeById(id)
      .then(() => {
        console.log(id)
        this.setState({
          wordTypes: this.state.wordTypes.filter(x => x.id !== id)
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onSubmitAddWordType = (event) => {
    event.preventDefault();
    DictionaryService.addWordType(this.state.name, this.state.description)
      .then((data) => {
        this.setState({
          wordTypes: [...this.state.wordTypes, data],
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
              <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#wordTypeModal">
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
                  <h6 className="text-white text-capitalize ps-3">Word Types</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <WordTypeList wordTypes={this.state.wordTypes} onClickRemoveWordTypeCallback={this.onClickRemoveWordType} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalLayout id="wordTypeModal" title="Add Word Type" subtitle="Add a new word type.">
          <form onSubmit={this.onSubmitAddWordType}>
            <div className="card-body">
              <div className="row">
                <div className="col-12">
                  <div className="input-group input-group-static">
                    <label>Name</label>
                    <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                  </div>
                </div>
                <div className="col-12">
                  <div className="input-group input-group-dynamic">
                    <textarea className="form-control" rows="3" placeholder="Description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
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