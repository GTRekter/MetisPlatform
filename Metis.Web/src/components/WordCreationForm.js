import React, { Component } from 'react';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';

export default class WordCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            romanization: "",
            description: "",
            example: "",
            dictionaryId: 0,
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
                this.setState({
                    dictionaries: data.filter((dictionary) => dictionary.enabled === true),
                    dictionaryId: data.filter((dictionary) => dictionary.primary === true)[0].id
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
    }
    onChangeTransition = (event, index, dictionaryId) => {
        let translations = this.state.translations;
        translations.splice(index, 1, { dictionaryId: dictionaryId, text: event.target.value })
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
        console.log("Reset creation word ")
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        WordService
            .addWord(this.state.text, this.state.romanization, this.state.description, this.state.example, this.state.translations)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
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