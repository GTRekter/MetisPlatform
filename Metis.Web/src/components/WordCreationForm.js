import React, { Component } from 'react';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';
import WordTypeService from '../services/WordTypeService';

export default class WordCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
        DictionaryService
            .getDictionaries()
            .then((data) => {
                let translations = data.filter((dictionary) => dictionary.enabled === true)
                    .map((dictionary) => {
                        return {
                            dictionaryId: dictionary.id,
                            text: null
                        }
                    })
                this.setState({
                    dictionaries: data.filter((dictionary) => dictionary.enabled === true),
                    dictionaryId: data.filter((dictionary) => dictionary.enabled === true)[0].id,
                    translations: translations

                })
            })
        WordTypeService
            .getWordTypes()
            .then((data) => {
                this.setState({
                    wordTypes: data,
                    wordTypeId: data[0].id
                })
            })
    }
    onChangeTransition = (event, dictionaryId) => {
        let translations = this.state.translations.filter(translation => translation.dictionaryId === dictionaryId);
        if(translations.length > 0) {
            translations[0].text = event.target.value;
        } else {
            translations.push({ dictionaryId: dictionaryId, text: event.target.value });
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
            .addWord(this.state.text, this.state.romanization, this.state.dictionaryId, this.state.wordTypeId, this.state.description, this.state.example, this.state.translations)
            .then(() => {
                this.props.onSubmitCallback();
                let translations = this.state.dictionaries.filter((dictionary) => dictionary.enabled === true)
                .map((dictionary) => {
                    return {
                        dictionaryId: dictionary.id,
                        text: null
                    }
                })
                this.setState({
                    text: "",
                    romanization: "",
                    description: "",
                    example: "",
                    dictionaryId: this.state.dictionaries.filter((dictionary) => dictionary.enabled === true)[0].id,
                    wordTypeId: this.state.wordTypes[0].id,
                    translations: translations
                });
            })
    }
    render() {
        let translations = this.state.dictionaries
            .filter((dictionary) => {
                return Number(dictionary.id) !== Number(this.state.dictionaryId)
            })
            .map((dictionary, index) =>
                <div key={index} className="col-12 col-xl-4">
                    <div className="input-group input-group-static">
                        <label>{dictionary.name}</label>
                        <input className="form-control" type="text" name={`translation[${dictionary.id}]`} value={this.state.translations[this.state.index]} onChange={(event) => this.onChangeTransition(event, dictionary.id)} />
                    </div>
                </div>
            )
        let wordTypes = this.state.wordTypes.map((wordType, index) =>
            <option key={index} value={wordType.id}>{wordType.name}</option>
        )
        let dictionaries = this.state.dictionaries.map((dictionary, index) =>
            <option key={index} value={dictionary.id}>{dictionary.name}</option>
        )
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Text</label>
                            <input type="text" className="form-control" name="text" value={this.state.text} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Romanization</label>
                            <input type="text" className="form-control" name="romanization" value={this.state.romanization} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Dictionary</label>
                            <select className="form-control" name="dictionaryId" value={this.state.dictionaryId} onChange={this.onChangeInput}>
                                {dictionaries}
                            </select>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
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
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create Word</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}