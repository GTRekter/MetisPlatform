import React, { Component } from 'react';
import ReportCard from '../components/ReportCard';
import ReportCardFilter from '../components/ReportCardFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-bootstrap';
import { faFlag, faExclamationTriangle, faTags, faEye, faThumbsDown, faThumbsUp, faGlassCheers } from '@fortawesome/free-solid-svg-icons'
import SpeechService from '../services/SpeechService';
import WordService from '../services/WordService';
import WordTypeService from '../services/WordTypeService';
import DictionaryService from '../services/DictionaryService';
import JwtService from '../services/JwtService';

export default class FlashCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            analyzedWords: [],
            errors: [],
            correct: [],
            wordTypes: [],
            dictionaries: [],
            currentWord: "",
            currentWordType: "",
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false,
            congratulationsModalVisible: false,
        }
        this.onClickHideCongratulationsModal = this.onClickHideCongratulationsModal.bind(this);
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        this.onClickUpdateWordsByWordType = this.onClickUpdateWordsByWordType.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        var id = JwtService.getCurrentUserId();
        DictionaryService.getDictionaries()
            .then(data => {
                this.setState({
                    dictionaries: data
                });
            });
        WordService.getWordsByUserId(id)
            .then(data => {
                let shuffledWords = this.shuffle(data);
                this.setState({
                    words: data,
                    analyzedWords: shuffledWords,
                    currentWord: shuffledWords[0]
                });
            });
        WordTypeService.getWordTypes()
            .then(data => {
                this.setState({
                    wordTypes: data
                });
            });
    }
    onClickHideCongratulationsModal = () => {
        this.setState({
            congratulationsModalVisible: false
        });
    }
    onClickViewTranslation = () => {
        var dictionary = this.state.dictionaries.filter(d => d.id === this.state.currentWord.dictionaryId);
        SpeechService.synthesizeSpeech(this.state.currentWord.text, dictionary[0].code);
        this.setState({
            viewTranslation: true
        })
    };
    onClickAddError = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: false
        })
        var dictionary = this.state.dictionaries.filter(d => d.id === this.state.currentWord.dictionaryId);
        SpeechService.synthesizeSpeech(this.state.currentWord.text, dictionary[0].code);
        setTimeout(function () {
            self.updateCounters();
        }, 2000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: true
        })
        var dictionary = this.state.dictionaries.filter(d => d.id === this.state.currentWord.dictionaryId);
        SpeechService.synthesizeSpeech(this.state.currentWord.text, dictionary[0].code);
        setTimeout(function () {
            self.updateCounters();
        }, 2000);
    };
    onClickUpdateWordsByAll = () => {
        let id = JwtService.getCurrentUserId();
        WordService.getWordsByUserId(id)
            .then(data => {
                let shuffledWords = this.shuffle(data);
                this.setState({
                    words: shuffledWords,
                    analyzedWords: shuffledWords,
                    currentWord: shuffledWords[0],
                    errors: [],
                    correct: [],
                    topic: "",
                    isAnswerProvided: false,
                    isAnswerCorrect: false
                });
            });
    };
    onClickUpdateWordsByWordType = (value) => {
        let id = JwtService.getCurrentUserId();
        if(value === "" || value === "All") {
            WordService.getWordsByUserId(id)
            .then(data => {
                let shuffledWords = this.shuffle(data);
                this.setState({
                    words: data,
                    analyzedWords: shuffledWords,
                    currentWord: shuffledWords[0],
                    currentWordType: value,
                    errors: [],
                    correct: [],
                    topic: "",
                    isAnswerProvided: false,
                    isAnswerCorrect: false
                });
            });
        } else {
            let wordTypeIds = this.state.wordTypes.filter((wordType) => wordType.name === value);
            WordService.getWordsByUserIdAndWordTypeId(id, wordTypeIds[0].id)
                .then(data => {
                    let shuffledWords = this.shuffle(data);
                    this.setState({
                        words: data,
                        analyzedWords: shuffledWords,
                        currentWord: shuffledWords[0],
                        currentWordType: value,
                        errors: [],
                        correct: [],
                        topic: "",
                        isAnswerProvided: false,
                        isAnswerCorrect: false
                    });
                });
        }
    };
    updateCounters = () => {
        let errors = this.state.errors;
        let correct = this.state.correct;
        let currentWord = this.state.currentWord;
        let analyzedWords = this.state.analyzedWords;
        let congratulationsModalVisible = this.state.congratulationsModalVisible;
        if (!this.state.isAnswerCorrect) {
            errors.push(currentWord);
        } else {
            correct.push(currentWord);
        }
        let isLastWord = analyzedWords.length <= (errors.length + correct.length);
        if (!isLastWord) {
            currentWord = analyzedWords[errors.length + correct.length];
        } else {
            if (errors.length > 0) {
                var shuffledWords = this.shuffle(this.state.errors);
                analyzedWords = shuffledWords;
                currentWord = shuffledWords[0];
                errors = [];
                correct = [];
            } else {
                analyzedWords = this.shuffle(this.state.words);
                currentWord = analyzedWords[0];
                errors = [];
                correct = [];
                congratulationsModalVisible = true;
            }
        }
        this.setState({
            analyzedWords: analyzedWords,
            currentWord: currentWord,
            errors: errors,
            correct: correct,
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false,
            congratulationsModalVisible: congratulationsModalVisible
        })
    };
    shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    capitalizeFirstLetter = (string) => {
        if (string !== undefined && string.length > 0) {
            return string.replace(/^\w/, (c) => c.toUpperCase());
        }
    }
    render() {
        let backgroundClass = "bg-gradient-info shadow-info";
        let buttons = <div>
                <button className="btn btn-success mx-3 mb-0 text-white" onClick={() => this.onClickAddCorrect()}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickViewTranslation()}>
                    <FontAwesomeIcon className="link-light" icon={faEye} />
                </button>
                <button className="btn btn-danger mx-3 mb-0 text-white" onClick={() => this.onClickAddError()}>
                    <FontAwesomeIcon icon={faThumbsDown} />
                </button>
            </div>  
        if (this.state.isAnswerProvided) {
            if (this.state.isAnswerCorrect) {
                backgroundClass = "bg-gradient-success shadow-success";
            } else {
                backgroundClass = "bg-gradient-danger shadow-danger";
            }
        }
        var text = '';
        var romanization = "";
        var translation = '';
        // var example = '';
        // var description = '';
        if (this.state.currentWord !== undefined && this.state.currentWord.translations !== undefined) {
            text = this.state.currentWord.text;
            romanization = this.state.currentWord.romanization;
            translation = this.state.currentWord.translations[0].text;
            // example = this.state.currentWord.translations[0].example;
            // description = this.state.currentWord.translations[0].description;
        }
        let wordTypes = this.state.wordTypes.map((wordType) => wordType.name);
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCardFilter title="Type" icon={faTags} color="dark" value={this.state.currentWordType === "" ? "All" : this.capitalizeFirstLetter(this.state.currentWordType)} options={wordTypes} onOptionChangeCallback={this.onClickUpdateWordsByWordType} />
                    </div>
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Remaining" icon={faFlag} color="primary" value={this.state.errors.length + this.state.correct.length + "/" + this.state.analyzedWords.length} footer="Number of remaining words" />
                    </div>
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="errors" icon={faExclamationTriangle} color="info" value={this.state.errors.length} footer="Number of errors" />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-xs-12">
                        <div className="card z-index-2">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                <div className={`border-radius-lg py-3 pe-1 py-5 text-center ${backgroundClass}`}>
                                    <h1 className="display-4 fst-italic text-white">{translation}</h1>
                                    <h2 className={`text-white ${!this.state.viewTranslation ? "invisible" : ""}`}>{text} <br />({romanization})</h2>
                                </div>
                            </div>
                            <div className={`card-body ${this.state.analyzedWords.length > 0 ? 'visible' : `invisible`}`}>
                                {/* <h6 className="mb-0">Examples</h6>
                                <p className="text-sm ">{example}</p>
                                <h6 className="mb-0 ">Description</h6>
                                <p className="text-sm ">{description}</p> */}
                                <hr className="dark horizontal" />
                                <div className="text-center">
                                    {buttons}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal show={this.state.congratulationsModalVisible} onHide={this.onClickHideCongratulationsModal}>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="py-3 text-center">
                                <FontAwesomeIcon className='h1 text-success' icon={faGlassCheers} />
                                <h4 className="text-gradient text-success mt-4">Congratulations!</h4>
                                <p>You have reviewed all your cards.</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}