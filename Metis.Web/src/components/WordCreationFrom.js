import React, { Component } from 'react';
import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import FormCardLayout from './FormCardLayout';
import DictionaryService from '../services/DictionaryService';
import WordTypeService from '../services/WordTypeService';
import WordService from '../services/WordService';

export default class WordCreationFrom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dictionaries: [],
      wordTypes: [],   
      translations: [],
      text: "",
      description: "",
      example: "",
      dictionaryId: 0,
      wordTypeId: 0
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitAddWord = this.onSubmitAddWord.bind(this);
    this.onChangeTransition = this.onChangeTransition.bind(this);
  }
  componentDidMount() {
    DictionaryService.getEnabledDictionaries()
      .then((data) => {
        this.setState({
          dictionaries: data,
          dictionaryId: data.filter((dictionary) => dictionary.primary === true)[0].id
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
    WordTypeService.getWordTypes()
      .then((data) => {
        this.setState({
          wordTypes: data,
          wordTypeId: data[0].id
        })
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  }
  onChangeInput = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  onChangeTransition = (event, index, dictionaryId) => {
    let translations = this.state.translations;
    translations.splice(index, 1, { dictionaryId: dictionaryId, text: event.target.value })
    this.setState({
      translations: translations
    })
  };
  onSubmitAddWord = () => {
    WordService.addWordWithTranslations(this.state.text, this.state.dictionaryId, this.state.wordTypeId, this.state.description, this.state.example, this.state.translations)
      .then((data) => {
        this.props.onClickAddCallback(data);
      })
      .catch(function (ex) {
        console.log('Response parsing failed. Error: ', ex);
      });
  };
  render() {
    let dictionaries = this.state.dictionaries.map((dictionary, index) =>
      <option key={index} value={dictionary.id}>{dictionary.name}</option>
    )
    let wordTypes = this.state.wordTypes.map((wordType, index) =>
      <option key={index} value={wordType.id}>{wordType.name}</option>
    )
    let translations = this.state.dictionaries
      .filter((dictionary) => dictionary.id !== this.state.dictionaryId)
      .map((dictionary, index) =>
        <div key={index} className="col-12 col-xl-4">
          <div className="input-group input-group-static">
            <label>{dictionary.name}</label>
            <input className="form-control" type="text" name={`translation[${dictionary.id}]`} value={this.state.translations[this.state.index]} onChange={(event) => this.onChangeTransition(event, index, dictionary.id)} />
          </div>
        </div>
      )
    return (
      <div>
        <FormCardLayout className={`${this.state.isCreationFormVisible ? "visually-hidden" : ""}`}
          icon={faLanguage}
          title="Add Word"
          subtitle="Add a new word to a choosen dictionary."
          onSubmitCallback={this.onSubmitAddWord}>
          <div className="row">
            <div className="col-12 col-xl-4">
              <div className="input-group input-group-static">
                <label>Word</label>
                <input className="form-control" type="text" name="text" value={this.state.text} onChange={this.onChangeInput} />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="input-group input-group-static mb-4">
                <label className="ms-0">Dictionary</label>
                <select className="form-control" name="dictionaryId" disabled value={this.state.dictionaryId} onChange={this.onChangeInput}>
                  {dictionaries}
                </select>
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="input-group input-group-static mb-4">
                <label className="ms-0">Type</label>
                <select className="form-control" name="wordTypeId" value={this.state.wordTypeId} onChange={this.onChangeInput}>
                  {wordTypes}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="input-group input-group-dynamic">
                <textarea className="form-control" rows="3" placeholder="Description" name="description" value={this.state.description} onChange={this.onChangeInput}></textarea>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <div className="input-group input-group-dynamic">
                <textarea className="form-control" rows="3" placeholder="Example" name="example" value={this.state.example} onChange={this.onChangeInput}></textarea>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <h6 className="mb-0">Translations</h6>
            </div>
          </div>
          <div className="row">
            {translations}
          </div>
        </FormCardLayout>
      </div>
    );
  }
}