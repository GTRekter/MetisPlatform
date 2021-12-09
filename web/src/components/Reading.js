import React, { Component } from 'react';
import LessonsService from '../services/LessonsService';
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faExclamationTriangle, faFlag, faThumbsUp, faThumbsDown, faChalkboardTeacher, faSync } from '@fortawesome/free-solid-svg-icons'
import './Reading.css';

export default class Reading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            lessonsCount: 0,
            currentWord: null,
            viewTranslation: false
        }
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickUpdateWordsByAlphabet = this.onClickUpdateWordsByAlphabet.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        this.onClickUpdateWordsByLessonId = this.onClickUpdateWordsByLessonId.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        var lessonsCount = LessonsService.getLessonsCount();
        var mappedJson = LessonsService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: [],
            lessonsCount: lessonsCount
        });
    }
    onClickAddError = () => {
        var self = this;
        this.setState({
            viewTranslation: true
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
        setTimeout(function () {
            self.updateCounters(true);
        }, 3000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
        setTimeout(function () {
            self.updateCounters(false);
        }, 3000);      
    };
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
    };
    onClickReset = () => {
        var mappedJson = LessonsService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    onClickUpdateWordsByLessonId = (element) => {
        var lessonId = element.target.getAttribute("data-index")
        var mappedJson = LessonsService.getAllWordsFromLessonId(lessonId);
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    onClickUpdateWordsByAll = () => {
        var mappedJson = LessonsService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    onClickUpdateWordsByAlphabet = () => {
        var mappedJson = LessonsService.getAlphabet();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    updateCounters = (isError) => {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length) + 1) {
            if (isError) {
                this.setState({
                    errors: [...this.state.errors, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1],
                    viewTranslation: false
                })
            } else {
                this.setState({
                    correct: [...this.state.correct, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1],
                    viewTranslation: false
                })
            }
        } else {
            var shuffledDictionary = this.shuffle(this.state.errors);
            this.setState({
                words: shuffledDictionary,
                currentWord: shuffledDictionary[0],
                errors: [],
                correct: [],
                viewTranslation: false
            })
        }
    };
    shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    render() {
        var translationIcon = null;
        var transation = <h2>&nbsp;<br/>&nbsp;</h2>;
        if (this.state.viewTranslation) {
            transation = <h2>{this.state.currentWord.korean} <br/>({this.state.currentWord.roman})</h2>
            translationIcon = <FontAwesomeIcon className="link-light" icon={faEyeSlash} />
        } else {
            translationIcon = <FontAwesomeIcon className="link-light" icon={faEye} />
        }
        var lessonsOptions = [];
        lessonsOptions.push(<li key="0"><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByAll()}>All</span></li>);
        lessonsOptions.push(<li key="1"><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByAlphabet()}>Alphabet</span></li>);
        for (var index = 0; index < this.state.lessonsCount; index++) {
            lessonsOptions.push(<li key={index+2}><span className="dropdown-item pointer" data-index={index} onClick={(element) => this.onClickUpdateWordsByLessonId(element)}>{index}</span></li>);
        }
        return (
            <div className="reading-block">
                <div className="mx-n1 main-text">
                    <div className="py-3 px-4 text-end">
                        <ul className="list-inline">
                            <div className="list-inline-item pointer px-2 d-none d-sm-inline" onClick={() => this.onClickViewTranslation()}>
                                {translationIcon}
                            </div>
                            <li className="list-inline-item px-2">                 
                                <div className="dropdown">
                                    <div className="dropdown-toggle pointer " data-bs-toggle="dropdown" aria-expanded="false"> 
                                        <FontAwesomeIcon icon={faChalkboardTeacher} />
                                    </div>
                                    <ul className="dropdown-menu">
                                        {lessonsOptions}
                                    </ul>
                                </div>
                            </li>
                            <li className="list-inline-item px-2">
                                <FontAwesomeIcon icon={faExclamationTriangle} />
                                <span className="px-1">       
                                    {this.state.errors.length}
                                </span>
                            </li>
                            <li className="list-inline-item px-2">
                                <FontAwesomeIcon icon={faFlag} />
                                <span className="px-1">     
                                    {this.state.errors.length + this.state.correct.length}  / {this.state.words.length} 
                                </span>
                            </li>
                            <div className="list-inline-item px-2 pointer" onClick={() => this.onClickReset()}>
                                <FontAwesomeIcon className="link-light" icon={faSync} />
                            </div>
                        </ul>
                    </div>
                    <div className="py-5 text-center">
                        <h1 className="display-4 fst-italic">{this.state.currentWord != null ? this.state.currentWord.english : ""}</h1>
                        {transation}
                    </div>
                </div>
                <ul className="nav nav-tabs mx-n1 nav justify-content-center py-3" role="tablist">
                    <li className="nav-item" role="presentation"> 
                        <p className="active nav-link link-light pointer" data-bs-toggle="tab" data-bs-target="#examples" role="tab" aria-controls="examples" aria-selected="false"> Examples </p> 
                    </li>
                    <li className="nav-item" role="presentation"> 
                        <p className="nav-link link-light pointer" data-bs-toggle="tab" data-bs-target="#description" role="tab" aria-controls="description" aria-selected="true"> Description </p> 
                    </li>
                </ul>
                <div className="border-grey bg-white p-3 tab-content">
                    <div className="tab-pane active" id="examples" role="tabpanel" aria-labelledby="examples-tab">
                        <p className="h5 text-center">{this.state.currentWord != null ? this.state.currentWord.example : ""}</p>
                    </div>
                    <div className="tab-pane" id="description" role="tabpanel" aria-labelledby="description-tab">
                        <p className="h5 text-center">{this.state.currentWord != null ? this.state.currentWord.description : ""}</p>
                    </div>
                </div>
                <div className="row mt-5 actions">
                    <div className="col-12 text-center">
                        <button className="btn btn-success mx-3 text-white rounded-circle" onClick={() => this.onClickAddCorrect()}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <button className="btn btn-secondary mx-3 text-white rounded-circle d-inline d-sm-none" onClick={() => this.onClickViewTranslation()}>
                            {translationIcon}
                        </button>
                        <button className="btn btn-danger mx-3 text-white rounded-circle" onClick={() => this.onClickAddError()}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </button>
                    </div>
                </div>          
            </div>
        )
    }
}