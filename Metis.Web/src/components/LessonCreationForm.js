import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FormHeader from './FormHeader';
import Autocomplete from './Autocomplete';
import LessonService from '../services/LessonService';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';
import GrammarPointService from '../services/GrammarPointService';

export default class LessonCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            dictionaryId: 0,
            dictionaries: [],
            selectedWords: [],
            selectedGrammarPoints: [],
            words: [],
            grammarPoints: [],
            wordAdditionFormVisible: false,
            grammarPointAdditionFormVisible: false,
        }
        this.onChangeDictionary = this.onChangeDictionary.bind(this);
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
        DictionaryService
            .getDictionaries()
            .then((data) => {
                this.setState({
                    dictionaries: data.filter((dictionary) => dictionary.enabled === true),
                    dictionaryId: data.filter((dictionary) => dictionary.enabled === true)[0].id
                })
                WordService
                    .getWordsByDictionaryId(data[0].id)
                    .then((data) => {
                        this.setState({
                            words: data
                        });
                    })
                GrammarPointService
                    .getGrammarPointsByDictionaryId(data[0].id)
                    .then((data) => {
                        this.setState({
                            grammarPoints: data
                        });
                    })
            })
    }
    onChangeDictionary(event) {
        this.setState({
            dictionaryId: event.target.value
        });
        WordService
            .getWordsByDictionaryId(event.target.value)
            .then((data) => {
                this.setState({
                    words: data
                });
            })
        GrammarPointService
            .getGrammarPointsByDictionaryId(event.target.value)
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
            .addLesson(this.state.title, this.state.description, this.state.dictionaryId, this.state.selectedWords, this.state.selectedGrammarPoints)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let selectedWordsHeaders = this.state.dictionaries
            .filter((dictionary) => dictionary.enabled === true && Number(dictionary.id) !== Number(this.state.dictionaryId))
            .map((dictionary, index) =>
                <th key={index} className="text-uppercase text-xxs font-weight-bolder opacity-7">{dictionary.name}</th>
            )
        let selectedWordsRows = this.state.selectedWords.map((word, index) => {
            let columns = [];
            this.state.dictionaries
                .filter((dictionary) => dictionary.enabled === true && Number(dictionary.id) !== Number(this.state.dictionaryId))
                .forEach((dictionary) => {
                    let translation = word.translations.filter((translation) => Number(translation.dictionaryId) === Number(dictionary.id));
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
        let dictionaries = this.state.dictionaries.map((dictionary, index) => <option key={index} value={dictionary.id}>{dictionary.name}</option>)
        let words = this.state.words.map((word) => word.text);
        let grammarPoints = this.state.grammarPoints.map((grammarPoint) => grammarPoint.title);
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="Lesson" action="Creation" subtitle="Insert all the information about the lesson." />
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12 col-xl-6">
                        <div className="input-group input-group-static my-3">
                            <label className="ms-0">Dictionary</label>
                            <select className="form-control" name="dictionaryId" value={this.state.dictionaryId} onChange={this.onChangeDictionary}>
                                {dictionaries}
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
                            <Autocomplete label="Word Text" suggestions={words} onChangeCallback={this.onClickAddWord} />
                        </div>
                        <div className="table-responsive">
                            <table className="table table-sm align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Text</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Romanization</th>
                                        {selectedWordsHeaders}
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedWordsRows}
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
                            <button type="submit" name="button" className="btn bg-gradient-primary m-0 ms-2">Create Lesson</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}