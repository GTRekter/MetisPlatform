import React, { Component } from 'react';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';
import WordTypeService from '../services/WordTypeService';

export default class WordEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            text: "",
            romanization: "",
            description: "",
            example: "",
            dictionaryId: 0,
            wordTypeId: 0,
            wordTypes: [],
            dictionaries: [],
            translations: []
        }
        this.onChangeTransition = this.onChangeTransition.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.state.id !== undefined) {
            WordService
                .getWordById(this.state.id)
                .then(response => {
                    this.setState({
                        text: response.text,
                        romanization: response.romanization,
                        description: response.description,
                        dictionaryId: response.dictionaryId,
                        wordTypeId: response.wordTypeId,
                        example: response.example,
                        translations: response.translations
                    });
                })
            DictionaryService
                .getDictionaries()
                .then((data) => {
                    this.setState({
                        dictionaries: data.filter((dictionary) => dictionary.enabled === true)
                    })
                })
                .catch(function (ex) {
                    console.log('Response parsing failed. Error: ', ex);
                });
            WordTypeService
                .getWordTypes()
                .then((data) => {
                    this.setState({
                        wordTypes: data
                    })
                })
                .catch(function (ex) {
                    console.log('Response parsing failed. Error: ', ex);
                });
        }
    }
    onChangeTransition = (event, id, dictionaryId) => {
        var translations = this.state.translations.filter(translation => translation.id === id);
        if(translations.length > 0) {
            translations[0].text = event.target.value;
        } else {
            translations.push({ id: null, dictionaryId: dictionaryId, text: event.target.value });
        }
        this.setState({
            translations: translations
        })
    };
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onReset = (event) => {
        event.preventDefault();
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        WordService
            .editWord(this.state.id, this.state.text, this.state.romanization, this.state.dictionaryId, this.state.wordTypeId, this.state.description, this.state.example, this.state.translations)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let translations = this.state.dictionaries
            .filter((dictionary) => dictionary.id !== this.state.dictionaryId)
            .map((dictionary, index) => {
                let translation = this.state.translations.filter((translation) => translation.dictionaryId === dictionary.id);
                let id = translation.length > 0 ? translation[0].id : null;
                let value = translation.length > 0 ? translation[0].text : "";
                return <div key={index} className="col-12 col-xl-4">
                    <div className="input-group input-group-static">
                        <label>{dictionary.name}</label>
                        <input className="form-control" type="text"
                            name={`translations[${translation.id}]`}
                            value={value}
                            onChange={(event) => this.onChangeTransition(event, id, dictionary.id)} />
                    </div>
                </div>
            })
            let wordTypes = this.state.wordTypes.map((wordType, index) =>
                <option key={index} value={wordType.id}>{wordType.name}</option>
            )
            let dictionaries = this.state.dictionaries.map((dictionary, index) =>
                <option key={index} value={dictionary.id}>{dictionary.name}</option>
            )
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Text</label>
                            <input type="text" className="form-control" name="text" value={this.state.text} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Romanization</label>
                            <input type="text" className="form-control" name="romanization" value={this.state.romanization} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static mb-4">
                            <label className="ms-0">Dictionary</label>
                            <select className="form-control" name="dictionaryId" disabled value={this.state.dictionaryId} onChange={this.onChangeInput}>
                                {dictionaries}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static mb-4">
                            <label className="ms-0">Type</label>
                            <select className="form-control" name="wordTypeId" value={this.state.wordTypeId} onChange={this.onChangeInput}>
                                {wordTypes}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Description</label>
                            <textarea type="text" className="form-control" name="description" value={this.state.description} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Example</label>
                            <textarea type="text" className="form-control" name="example" value={this.state.example} onChange={this.onChangeInput} />
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
                <div className="col-12">
                    <div className="d-flex justify-content-end mt-4">
                        <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                        <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit Word</button>
                    </div>
                </div>
            </form>
        );
    }
}