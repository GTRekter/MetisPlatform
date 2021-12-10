import React, { Component } from 'react';
import DictionaryService from '../services/DictionaryService';
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faEye, faEyeSlash, faExclamationTriangle, faFlag, faThumbsUp, faThumbsDown, faChalkboardTeacher, faSync } from '@fortawesome/free-solid-svg-icons'
import './Reading.css';
import ReportCard from './ReportCard';

export default class Reading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            topics: [],
            topic: "",
            currentWord: null,
            viewTranslation: false,
            recordingMicrophone: false,
            isAnswerProvided: false,
            isAnswerCorrect: false,
        }
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickToggleMicrophone = this.onClickToggleMicrophone.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        this.onClickUpdateWordsByTopic = this.onClickUpdateWordsByTopic.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        var mappedJson = DictionaryService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: [],
            topics: DictionaryService.getAllTopics(),
        });
    }
    onClickAddError = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: false
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
        setTimeout(function () {
            self.updateCounters();
        }, 3000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: true
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
        setTimeout(function () {
            self.updateCounters();
        }, 3000);
    };
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
        SpeechService.synthesizeSpeech(this.state.currentWord.korean);
    };
    onClickToggleMicrophone = async () => {
        var self = this;
        this.setState({
            recordingMicrophone: !this.state.recordingMicrophone
        });
        await SpeechService.recognizeSpeech()
            .then((result) => {
                console.log("result: " + result);
                console.log("currentWord: " + self.state.currentWord.korean);
                console.log("result: " + result === this.state.currentWord.korean);
                this.setState({
                    viewTranslation: true,
                    isAnswerProvided: true,
                    recordingMicrophone: !this.state.recordingMicrophone,
                    isAnswerCorrect: result === this.state.currentWord.korean
                });
                setTimeout(function () {
                    self.updateCounters();
                }, 3000);
            });
    }
    onClickReset = () => {
        var mappedJson = DictionaryService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            viewTranslation: false,
            errors: [],
            correct: [],
            topic: "",
            isAnswerProvided: false,
            isAnswerCorrect: false
        });
    };
    onClickUpdateWordsByTopic = (element) => {
        var topic = element.target.getAttribute("data-topic");
        var mappedJson = DictionaryService.getAllWordsByTopic(topic);
        this.setState({
            ...this.state,
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            viewTranslation: false,
            errors: [],
            correct: [],
            topic: topic,
            isAnswerProvided: false,
            isAnswerCorrect: false
        });
    };
    onClickUpdateWordsByAll = () => {
        var mappedJson = DictionaryService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: [],
            topic: "",
            isAnswerProvided: false,
            isAnswerCorrect: false
        });
    };
    updateCounters = () => {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length) + 1) {
            if (this.state.isAnswerCorrect) {
                this.setState({
                    errors: [...this.state.errors, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1],
                    viewTranslation: false,
                    isAnswerProvided: false,
                    isAnswerCorrect: false
                })
            } else {
                this.setState({
                    correct: [...this.state.correct, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length + 1],
                    viewTranslation: false,
                    isAnswerProvided: false,
                    isAnswerCorrect: false
                })
            }
        } else {
            var shuffledDictionary = this.shuffle(this.state.errors);
            this.setState({
                words: shuffledDictionary,
                currentWord: shuffledDictionary[0],
                errors: [],
                correct: [],
                viewTranslation: false,
                isAnswerProvided: false,
                isAnswerCorrect: false
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
        var transation = <h2>&nbsp;<br />&nbsp;</h2>;
        var translationIcon = <FontAwesomeIcon className="link-light" icon={faEye} />;
        if (this.state.viewTranslation) {
            transation = <h2 className="text-white">{this.state.currentWord.korean} <br />({this.state.currentWord.roman})</h2>
        } else {
            translationIcon = <FontAwesomeIcon className="link-light" icon={faEyeSlash} />
        }
        var microphoneIcon = <FontAwesomeIcon className="link-light" icon={faMicrophone} />;
        if (this.state.recordingMicrophone) {
            microphoneIcon = <FontAwesomeIcon className="link-light" icon={faMicrophoneSlash} />
        }
        var topicOptions = [];
        topicOptions.push(<li key="0"><span className="dropdown-item pointer" onClick={() => this.onClickUpdateWordsByAll()}>All</span></li>);
        for (var index = 0; index < this.state.topics.length; index++) {
            topicOptions.push(<li key={index + 2}><span className="dropdown-item pointer" data-topic={this.state.topics[index]} onClick={(element) => this.onClickUpdateWordsByTopic(element)}>{this.capitalizeFirstLetter(this.state.topics[index])}</span></li>);
        }
        var backgroundClass = "";
        if (this.state.isAnswerProvided) {
            if (this.state.isAnswerCorrect) {
                backgroundClass = "bg-success";
            } else {
                backgroundClass = "bg-danger";
            }
        }
        return (
            <div>
                <div className="row my-4">
                    <div class="col-4">
                        <ReportCard title="Total" icon={faFlag} color="success" value={this.state.words.length} />
                    </div>
                    <div class="col-4">
                        <ReportCard title="Remaining" icon={faFlag} color="primary" value={this.state.errors.length + this.state.correct.length / this.state.words.length} />
                    </div>
                    <div class="col-4">
                        <ReportCard title="errors" icon={faExclamationTriangle} color="info" value={this.state.errors.length} />
                    </div>
                </div>
                <div className="row pt-4">
                    <div class="col-12">
                        <div class="card z-index-2">
                            <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                                <div class="bg-gradient-info shadow-info border-radius-lg py-3 pe-1 text-center">
                                    <h1 className="display-4 fst-italic mt-5 text-white">{this.state.currentWord != null ? this.state.currentWord.english : ""}</h1>
                                    {transation}
                                </div>
                            </div>
                            <div class="card-body">
                                <h6 class="mb-0 ">Examples</h6>
                                <p class="text-sm ">{this.state.currentWord != null ? this.state.currentWord.example : ""}</p>
                                <h6 class="mb-0 ">Description</h6>
                                <p class="text-sm ">{this.state.currentWord != null ? this.state.currentWord.description : ""}</p>
                                <hr class="dark horizontal" />
                                <div class="text-center">
                                    <button className="btn btn-success mx-3 mb-0 text-white" onClick={() => this.onClickAddCorrect()}>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                    </button>
                                    <button className="btn btn-danger mx-3 mb-0 text-white" onClick={() => this.onClickAddError()}>
                                        <FontAwesomeIcon icon={faThumbsDown} />
                                    </button>
                                    <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickToggleMicrophone()}>
                                        {microphoneIcon}
                                    </button>
                                    <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickViewTranslation()}>
                                        {translationIcon}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}