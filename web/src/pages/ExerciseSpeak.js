import React, { Component } from 'react';
import DictionaryService from '../services/DictionaryService';
import ReportCard from '../components/ReportCard';
import { faFlag, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import Speak from '../components/Speak';

export default class ExerciseSpeak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            topics: [],
            currentWord: null,
            currentTopic: null
        }
        // this.onClickReset = this.onClickReset.bind(this);
        // this.onClickUpdateWordsByTopic = this.onClickUpdateWordsByTopic.bind(this);
        // this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        var mappedJson = DictionaryService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            topics: DictionaryService.getAllTopics(),
            currentWord: mappedJson[0],
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
    // onClickUpdateWordsByTopic = (element) => {
    //     var topic = element.target.getAttribute("data-topic");
    //     var mappedJson = DictionaryService.getAllWordsByTopic(topic);
    //     this.setState({
    //         ...this.state,
    //         words: this.shuffle(mappedJson),
    //         currentWord: mappedJson[0],
    //         viewTranslation: false,
    //         errors: [],
    //         correct: [],
    //         topic: topic,
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
    // capitalizeFirstLetter = (string) => {
    //     if (string !== undefined && string.length > 0) {
    //         return string.replace(/^\w/, (c) => c.toUpperCase());
    //     }
    // }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Total" icon={faFlag} color="success" value={this.state.words.length} />
                    </div>
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="Remaining" icon={faFlag} color="primary" value={this.state.errors.length + this.state.correct.length + "/" + this.state.words.length} />
                    </div>
                    <div className="col-12 col-sm-4 py-4">
                        <ReportCard title="errors" icon={faExclamationTriangle} color="info" value={this.state.errors.length} />
                    </div>
                </div>
                <div className="row pt-4">
                    <div className="col-xs-12">
                        <Speak currentWord={this.state.currentWord} onAnswerProvidedCallback={this.updateCounters} />
                    </div>
                </div>
            </div>
        )
    }
}