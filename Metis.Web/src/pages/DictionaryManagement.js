import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import DictionaryList from '../components/DictionaryList';
import DictionaryService from '../services/DictionaryService';
import DictionaryEnableForm from '../components/DictionaryEnableForm'
import Pagination from '../components/Pagination';

export default class DictionaryManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      itemsPerPage: 30,
      pages: 0,
      page: 1
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onClickRemove = this.onClickRemove.bind(this);
    this.onSubmitAddDictionary = this.onSubmitAddDictionary.bind(this);
  }
  componentDidMount() {
    DictionaryService.getEnabledDictionariesCount()
      .then((data) => {
        this.setState({
          pages: Math.floor(data / this.state.itemsPerPage)
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    DictionaryService.getEnabledDictionariesByPage(this.state.page, this.state.itemsPerPage)
      .then((data) => {
        this.setState({
          items: data,
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    DictionaryService.getDictionaries()
      .then((data) => {
        this.setState({
          pages: Math.floor(data / this.state.itemsPerPage)
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  onSubmitAddDictionary = () => {
    DictionaryService.addDictionary(this.state.name, this.state.code, this.state.primary)
      .then((data) => {
        let items = this.state.items;
        console.log(items);
        if (this.state.primary) {
          console.log(items);
          items.map(el => el.primary ? { ...el, primary: false } : el);
          console.log(items);
        }
        this.setState({
          items: [...items, data],
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onClickChangePage = (pageNumber) => { 
    DictionaryService.getDictionariesByPage(pageNumber, this.state.itemsPerPage)
      .then((data) => {
        this.setState({
          items: data,
          page: pageNumber
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onClickEdit = () => {
    // DictionaryService.removeDictionaryById(id)
    //   .then(() => {
    //     this.setState({
    //       dictionaries: this.state.dictionaries.filter(x => x.id !== id)
    //     })
    //   })
    //   .catch(function (ex) {
    //     console.log('Response parsing failed. Error: ', ex);
    //   });
  };
  onClickRemove = (id) => {
    DictionaryService.disableDictionaryById(id)
      .then(() => {
        this.setState({
          items: this.state.items.filter(x => x.id !== id)
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

        <div className="collapse" id="collapseCreationForm">
          <DictionaryEnableForm />
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
                <DictionaryList dictionaries={this.state.items} onClickRemoveCallback={this.onClickRemove} onClickEditCallback={this.onClickEdit} />
                <Pagination pages={this.state.pages} page={this.state.page} onClickChangePageCallback={this.onClickChangePage} />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}