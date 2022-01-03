import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import FormHeader from './FormHeader';
import Autocomplete from './Autocomplete';
import LessonService from '../services/LessonService';
import WordService from '../services/WordService';
import DictionaryService from '../services/DictionaryService';

export default class LessonCreationForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            description: "",
            dictionaries: [],
            words: [],
            suggestions: [],
            wordAdditionFormVisible: false,
        }
        this.onClickAddWord = this.onClickAddWord.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onClickToggleWordAdditionForm = this.onClickToggleWordAdditionForm.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        DictionaryService
            .getDictionaries()
            .then((data) => {
                this.setState({
                    dictionaries: data.filter((dictionary) => dictionary.enabled === true && dictionary.primary === false)
                })
            })
            .catch(function (ex) {
                console.log('Response parsing failed. Error: ', ex);
            });
        WordService
            .getWords()
            .then((data) => {
                this.setState({
                    suggestions: data
                });
            })
    }
    onClickAddWord = (value) => {
        let words = this.state.words;
        let word = this.state.suggestions.filter(suggestion => suggestion.text === value);
        if(word.length > 0) {
            words.push(word[0]);
        }      
        this.setState({
            words: words,
            wordAdditionFormVisible: false
        })
    }
    onClickToggleWordAdditionForm = () => {
        this.setState({
            wordAdditionFormVisible: !this.state.wordAdditionFormVisible
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
            .addLesson(this.state.title, this.state.description)
            .then(() => {
                this.props.onSubmitCallback();
            })
    }
    render() {
        let headers = this.state.dictionaries.map((dictionary, index) =>
            <th key={index} className="text-uppercase text-xxs font-weight-bolder opacity-7">{dictionary.name}</th>
        )
        let rows = this.state.words.map((word, index) => {
            let columns = [];
            this.state.dictionaries.forEach((dictionary, index) => {
                let translation = word.translations.filter((translation) => translation.dictionaryId === dictionary.id);
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
                        <button className="btn btn-icon btn-2 btn-link btn-sm" type="button" onClick={() => this.onClickShowDeleteModal(word.id)}>
                            <span className="btn-inner--icon">
                                <FontAwesomeIcon className='opacity-10' icon={faTrash} />
                            </span>
                        </button>
                    </td>
                </tr>
            )
        });
        let suggestions = this.state.suggestions.map((suggestion, index) => suggestion.text);
        return (
            <form className="text-start" onSubmit={this.onSubmit} onReset={this.onReset}>
                <div className="row">
                    <div className="col-12">
                        <FormHeader title="Lesson" action="Creation" subtitle="Insert all the information about the lesson." />
                    </div>
                    <div className="col-12">
                        <div className="input-group input-group-static my-3">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.onChangeInput} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div class="input-group input-group-static">
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
                            <Autocomplete label="Word" suggestions={suggestions} onChangeCallback={this.onClickAddWord} />
                        </div>
                        <div className="table-responsive">
                            <table className="table align-items-center">
                                <thead>
                                    <tr>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Text</th>
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7">Romanization</th>
                                        {headers}
                                        <th className="text-uppercase text-xxs font-weight-bolder opacity-7 ps-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* <div className="col-12">
                        <label>Grammar Points</label>
                        
                    </div> */}
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