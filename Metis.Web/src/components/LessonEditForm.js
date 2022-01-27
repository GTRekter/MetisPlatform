import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FormHeader from './FormHeader';
import Autocomplete from './Autocomplete';
import LessonService from '../services/LessonService';
import WordService from '../services/WordService';
import LanguageService from '../services/LanguageService';
import GrammarPointService from '../services/GrammarPointService';

export default class LessonEditForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: "",
            description: "",
            languageId: 0,
            languages: [],
            selectedWords: [],
            selectedGrammarPoints: [],
            words: [],
            grammarPoints: [],
            wordAdditionFormVisible: false,
            grammarPointAdditionFormVisible: false,
        }
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
        this.onClickAddWord = this.onClickAddWord.bind(this);
        this.onClickAddGrammarPoint = this.onClickAddGrammarPoint.bind(this);
        this.onClickDeleteWord = this.onClickDeleteWord.bind(this);
        this.onClickDeleteGrammarPoint = this.onClickDeleteGrammarPoint.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onClickToggleWordAdditionForm = this.onClickToggleWordAdditionForm.bind(this);
        this.onClickToggleGrammarPointAdditionForm = this.onClickToggleGrammarPointAdditionForm.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        if (this.state.id !== undefined) {
            LessonService
                .getLessonById(this.state.id)
                .then(response => {
                    this.setState({
                        title: response.title,
                        description: response.description,
                        languageId: response.languageId,
                        selectedGrammarPoints: response.grammarPoints,
                        selectedWords: response.words
                    });
                    WordService
                        .getWordsByLanguageId(response.languageId)
                        .then((data) => {
                            this.setState({
                                words: data
                            });
                        })
                    GrammarPointService
                        .getGrammarPointsByLanguageId(response.languageId)
                        .then((data) => {
                            this.setState({
                                grammarPoints: data
                            });
                        })
                })
            LanguageService
                .getLanguages()
                .then((data) => {
                    this.setState({
                        languages: data
                    })
                })
        }
    }   
    onChangeLanguage(event) {
        this.setState({
            languageId: event.target.value
        });
        WordService
            .getWordsByLanguageId(event.target.value)
            .then((data) => {
                this.setState({
                    words: data
                });
            })
        GrammarPointService
            .getGrammarPointsByLanguageId(event.target.value)
            .then((data) => {
                this.setState({
                    grammarPoints: data
                });
            })
    }
    onClickDeleteWord = (id) => {
        this.setState({
            selectedWords: this.state.selectedWords.filter(word => word.id !== id),
        })
    }
    onClickDeleteGrammarPoint = (id) => {
        this.setState({
            selectedGrammarPoints: this.state.selectedGrammarPoints.filter(word => word.id !== id),
        })
    }
    onClickAddWord = (value) => {
        let selectedWords = this.state.selectedWords;
        let word = this.state.words.filter(word => word.text === value);
        if (word.length > 0) {
            selectedWords.push(word[0]);
        }
        this.setState({
            selectedWords: selectedWords,
            wordAdditionFormVisible: false
        })
    }
    onClickAddGrammarPoint = (value) => {
        let selectedGrammarPoints = this.state.selectedGrammarPoints;
        let grammarPoint = this.state.grammarPoints.filter(grammarPoint => grammarPoint.title === value);
        if (grammarPoint.length > 0) {
            selectedGrammarPoints.push(grammarPoint[0]);
        }
        this.setState({
            selectedGrammarPoints: selectedGrammarPoints,
            grammarPointAdditionFormVisible: false
        })
    }
    onClickToggleWordAdditionForm = () => {
        this.setState({
            wordAdditionFormVisible: !this.state.wordAdditionFormVisible
        })
    }
    onClickToggleGrammarPointAdditionForm = () => {
        this.setState({
            grammarPointAdditionFormVisible: !this.state.grammarPointAdditionFormVisible
        })
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onChangeDescription = (value) => {
        this.setState({
            description: value
        });
    }
    onReset = (event) => {
        event.preventDefault();
        this.props.onResetCallback();
    }
    onSubmit = (event) => {
        event.preventDefault();
        LessonService
            .editLesson(this.state.id, this.state.title, this.state.description, this.state.languageId, this.state.selectedWords, this.state.selectedGrammarPoints)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let selectedWordsPointHeaders = this.state.languages
            .filter((language) => language.enabled === true && language.primary === false)
            .map((language, index) =>
            <th key={index} className="text-uppercase text-xxs font-weight-bolder opacity-7">{language.name}</th>
        )
        let selectedWordsPointRows = this.state.selectedWords.map((word, index) => {
            let columns = [];
            this.state.languages
                .filter((language) => language.enabled === true && language.primary === false)
                .forEach((language, index) => {
                let translation = word.translations.filter((translation) => translation.languageId === language.id);
                if (translation.length > 0) {
                    columns.push(<td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{translation[0].text}</td>)
                } else {
                    columns.push(<td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4"></td>)
                }
            })
            return (
                <tr key={index}>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.text}</td>
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{word.romanization}</td>
                    {columns}
                    <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                        <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickDeleteWord(word.id)}>
                            <span className="btn-inner--icon">
                                <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                            </span>
                        </button>
                    </td>
                </tr>
            )
        });
        let selectedGrammarPointRows = this.state.selectedGrammarPoints.map((grammarPoint, index) =>
            <tr key={index}>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-4">{grammarPoint.title}</td>
                <td className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 td-icon">
                    <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickDeleteGrammarPoint(grammarPoint.id)}>
                        <span className="btn-inner--icon">
                            <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                        </span>
                    </button>
                </td>
            </tr>
        )
        let languages = this.state.languages
            .filter((language) => language.enabled === true)
            .map((language, index) =>
            <option key={index} value={language.id}>{language.name}</option>
        )
        let words = this.state.words.map((word) => word.text);
        let grammarPoints = this.state.grammarPoints.map((grammarPoint) => grammarPoint.title);
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="Lesson" action="Update" subtitle={`Update the information about the lesson ${this.state.id}.`} />
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Language</label>
                            <select className="form-control" name="languageId" value={this.state.languageId} onChange={this.onChangeLanguage}>
                                {languages}
                            </select>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static">
                            <label>Description<small className="text-muted ps-1">(optional)</small></label>
                            <textarea className="form-control" name="description" value={this.state.description} onChange={this.onChangeInput} />
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <label className='d-block'>Words</label>
                        <span className="btn bg-gradient-secondary ms-2 btn-sm" role="button" onClick={() => this.onClickToggleWordAdditionForm()}>Add word</span>
                        <div className={!this.state.wordAdditionFormVisible ? "d-none" : ""}>
                            <Autocomplete label="Word Text" suggestions={words} suggestionsToHide={this.state.selectedWords} onChangeCallback={this.onClickAddWord} />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Text</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Romanization</th>
                                        {selectedWordsPointHeaders}
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedWordsPointRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12">
                        <label className='d-block'>Grammar Points</label>
                        <span className="btn bg-gradient-secondary ms-2 btn-sm" role="button" onClick={() => this.onClickToggleGrammarPointAdditionForm()}>Add grammar point</span>
                        <div className={!this.state.grammarPointAdditionFormVisible ? "d-none" : ""}>
                            <Autocomplete label="Grammar Point Title" suggestions={grammarPoints} onChangeCallback={this.onClickAddGrammarPoint} />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Title</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedGrammarPointRows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col-12">
                        <div className="d-flex justify-content-end mt-4">
                            <button type="reset" name="button" className="btn btn-light m-0">Cancel</button>
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Edit Lesson</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}