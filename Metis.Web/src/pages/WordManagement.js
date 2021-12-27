import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLanguage } from '@fortawesome/free-solid-svg-icons'
import FormCardLayout from '../components/FormCardLayout';
import DictionaryService from '../services/DictionaryService';
import WordTypeService from '../services/WordTypeService';
import WordService from '../services/WordService';
import WordList from '../components/WordList';

export default class WordManagement extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dictionaries: [],
      wordTypes: [],
      words: [],
      id: null,
      text: "",
      idDictionary: 0,
      idWordType: 0,
      description: "",
      example: "",
      translations: []
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmitAddWord = this.onSubmitAddWord.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onChangeTransition = this.onChangeTransition.bind(this);
  }
  componentDidMount() {
    DictionaryService.getAllDictionaries()
      .then((data) => {
        this.setState({
          dictionaries: data,
          idDictionary: data.filter(function(o){return o.primary}).id
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
      WordTypeService.getAllWordTypes()
      .then((data) => {
        this.setState({
          wordTypes: data,
          idWordType: data[0].id
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    WordService.getAllWords()
      .then((data) => {
        this.setState({
          words: data
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  onClickRemove = (id) => {
    DictionaryService.removeWordById(id)
      .then(() => {
        this.setState({
          words: this.state.words.filter(x => x.id !== id)
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  onClickEdit = () => {

  };
  onChangeTransition= (event, index, idDictionary) => {
    let translations = this.state.translations;
    translations.splice(index, 1, { idDictionary: idDictionary, text: event.target.value })
    this.setState({
      translations: translations
    })
  };
  onSubmitAddWord = () => {
    // DictionaryService.addWord(this.state.text, this.state.idDictionary, this.state.idWordType, this.state.description, this.state.example)
    // .then((data) => {
    //   this.setState({
    //     words: [...this.state.words, data],
    //   })
    // })
    // .catch(function (ex) {
    //   console.log('Response parsing failed. Error: ', ex);
    // });
    DictionaryService.addWordWithTranslations(this.state.text, this.state.idDictionary, this.state.idWordType, this.state.description, this.state.example, this.state.translation)
      .then((data) => {
        this.setState({
          words: [...this.state.words, data],
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    console.log(this.state.translation);
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
          <FormCardLayout className={`${this.state.isCreationFormVisible ? "visually-hidden" : ""}`}
            icon={faLanguage}
            title="Add Word"
            subtitle="Add a new word to a choosen dictionary."
            onSubmitCallback={this.onSubmitAddWord}>
            <div className="row">
              <div className="col-12 col-xl-4">
                <div className="input-group input-group-static">
                  <label>Word</label>
                  <input className="form-control" type="text" name="text" value={this.state.text} onChange={this.handleInputChange} />
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="input-group input-group-static mb-4">
                  <label className="ms-0">Dictionary</label>
                  <select className="form-control" name="idDictionary" disabled value={this.state.idDictionary} onChange={this.handleInputChange}>
                    {
                      this.state.dictionaries.map((dictionary, index) =>
                        <option key={index} value={dictionary.id}>{dictionary.name}</option>
                      )
                    }
                  </select>
                </div>
              </div>
              <div className="col-12 col-xl-4">
                <div className="input-group input-group-static mb-4">
                  <label className="ms-0">Type</label>
                  <select className="form-control" name="idWordType" value={this.state.idWordType} onChange={this.handleInputChange}>
                    {
                      this.state.wordTypes.map((wordType, index) =>
                        <option key={index} value={wordType.id}>{wordType.name}</option>
                      )
                    }
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="input-group input-group-dynamic">
                  <textarea className="form-control" rows="3" placeholder="Description" name="description" value={this.state.description} onChange={this.handleInputChange}></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="input-group input-group-dynamic">
                  <textarea className="form-control" rows="3" placeholder="Example" name="example" value={this.state.example} onChange={this.handleInputChange}></textarea>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <h6 className="mb-0">Translations</h6>
              </div>
            </div>
            <div className="row">
              {
                this.state.dictionaries.map((dictionary, index) => {
                  if (dictionary.id != this.state.idDictionary) {
                    return <div key={index} className="col-12 col-xl-4">
                      <div className="input-group input-group-static">
                        <label>{dictionary.name}</label>
                        {/* <input className="form-control" type="text" name={`translation[${dictionary.id}]`} value={this.state.translation[this.state.idDictionary]} onChange={this.handleInputChange} /> */}
                        <input className="form-control" type="text" name={`translation[${dictionary.id}]`} value={this.state.translation[this.state.index]} onChange={(event) => this.onChangeTransition(event, index, dictionary.id)} />
                      </div>
                    </div>
                  }
                })
              }
            </div>
          </FormCardLayout>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="card my-4">
              <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                <div className="bg-gradient-dark shadow-dark border-radius-lg pt-4 pb-3">
                  <h6 className="text-white text-capitalize ps-3">Words</h6>
                </div>
              </div>
              <div className="card-body px-0 pb-2">
                <div className="table-responsive p-0">
                  <WordList words={this.state.words} dictionaries={this.state.dictionaries} onClickRemoveCallback={this.onClickRemove} onClickEditCallback={this.onClickEdit} />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}