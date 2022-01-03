import React, { Component } from 'react';
import ReportCard from '../components/ReportCard';
import ReportCardFilter from '../components/ReportCardFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faExclamationTriangle, faTags, faEye, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import SpeechService from '../services/SpeechService';
import WordService from '../services/WordService';
import WordTypeService from '../services/WordTypeService';

export default class FlashCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            wordTypes: [],
            currentWord: "",
            currentWordType: "",
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false
        }
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        // this.onClickReset = this.onClickReset.bind(this);
        // this.onClickUpdateWordsByTopic = this.onClickUpdateWordsByTopic.bind(this);
        // this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        WordService.getWords()
            .then(data => {
                this.setState({
                    words: this.shuffle(data),
                    currentWord: data[0]
                });
            });
        WordTypeService.getWordTypes()
            .then(data => {
                this.setState({
                    wordTypes: data
                });
            });
    }
    onClickViewTranslation = () => {
        SpeechService.synthesizeSpeech(this.state.currentWord.text);
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
        SpeechService.synthesizeSpeech(this.state.currentWord.text);
        setTimeout(function () {
            self.updateCounters(false);
            self.resetValues();
        }, 2000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: true
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.text);
        setTimeout(function () {
            self.updateCounters(true);
            self.resetValues();
        }, 2000);
    };
    resetValues = () => {
        this.setState({
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false
        });
    }
    // onClickReset = () => {
    //     var mappedJson = DictionaryService.getAllWords();
    //     this.setState({
    //         words: this.shuffle(mappedJson),
    //         currentWord: mappedJson[0],
    //         viewTranslation: false,
    //         errors: [],
    //         correct: [],
    //         topic: "",
    //         isAnswerProvided: false,
    //         isAnswerCorrect: false
    //     });
    // };
    // onClickUpdateWordsByAll = () => {
    //     var mappedJson = DictionaryService.getAllWords();
    //     this.setState({
    //         words: this.shuffle(mappedJson),
    //         currentWord: mappedJson[0],
    //         errors: [],
    //         correct: [],
    //         topic: "",
    //         isAnswerProvided: false,
    //         isAnswerCorrect: false
    //     });
    // };
    updateWordsByWordType = (wordType) => {
        console.log(wordType);
        // var mappedJson = WordService.getWordsByWordType(wordType);
        // this.setState({
        //     ...this.state,
        //     words: this.shuffle(mappedJson),
        //     viewTranslation: false,
        //     errors: [],
        //     correct: [],
        //     currentWordType: wordType,
        //     currentWord: mappedJson[0]
        // });
    };
    updateCounters = () => {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length) + 1) {
            if (!this.state.isAnswerCorrect) {
                this.setState({
                    errors: [...this.state.errors, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1]
                })
            } else {
                this.setState({
                    correct: [...this.state.correct, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1]
                })
            }
        } else {
            var shuffledDictionary = this.shuffle(this.state.errors);
            this.setState({
                words: shuffledDictionary,
                currentWord: shuffledDictionary[0],
                errors: [],
                correct: []
            })
        }
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
        var buttons = <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickViewTranslation()}><FontAwesomeIcon className="link-light" icon={faEye} /></button>;
        if (this.state.viewTranslation) {
            buttons = <div>
                <button className="btn btn-success mx-3 mb-0 text-white" onClick={() => this.onClickAddCorrect()}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                </button>
                    <button className="btn btn-danger mx-3 mb-0 text-white" onClick={() => this.onClickAddError()}>
                        <FontAwesomeIcon icon={faThumbsDown} />
                    </button>
                </div>
        }
        var backgroundClass = "bg-gradient-info shadow-info";
        if (this.state.isAnswerProvided) {
            if (this.state.isAnswerCorrect) {
                backgroundClass = "bg-gradient-success shadow-success";
            } else {
                backgroundClass = "bg-gradient-danger shadow-danger";
            }
        }
        var currentWordTranslation = ''
        if (this.state.currentWord.translations !== undefined) {
            currentWordTranslation = this.state.currentWord.translations[0].text;
        }
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCardFilter title="Type" icon={faTags} color="dark" value={this.state.currentWordType === "" ? "All" : this.capitalizeFirstLetter(this.state.currentWordType)} options={this.state.wordTypes} onOptionChangeCallback={this.updateWordsByWordType} />
                    </div>
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Remaining" icon={faFlag} color="primary" value={this.state.errors.length + this.state.correct.length + "/" + this.state.words.length} footer="Number of remaining words" />
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
                                    <h1 className="display-4 fst-italic text-white">{currentWordTranslation}</h1>
                                    <h2 className={`text-white ${!this.state.viewTranslation ? "invisible" : ""}`}>{this.state.currentWord.text} <br />({this.state.currentWord.romanization})</h2>
                                </div>
                            </div>
                            <div className="card-body">
                                <h6 className="mb-0 ">Examples</h6>
                                <p className="text-sm ">{this.state.currentWord.example}</p>
                                <h6 className="mb-0 ">Description</h6>
                                <p className="text-sm ">{this.state.currentWord.description}</p>
                                <hr className="dark horizontal" />
                                <div className="text-center">
                                    {buttons}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}