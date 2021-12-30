import React, { Component } from 'react';
import WordService from '../services/WordService';
import WordTypeService from '../services/WordTypeService';
import ReportCard from '../components/ReportCard';
import ReportCardFilter from '../components/ReportCardFilter';
import { faFlag, faExclamationTriangle, faTags } from '@fortawesome/free-solid-svg-icons'
import Read from '../components/Read';

export default class ExerciseRead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            wordTypes: [],
            currentWord: "",
            currentWordType: ""
        }
        // this.onClickReset = this.onClickReset.bind(this);
        // this.onClickUpdateWordsByTopic = this.onClickUpdateWordsByTopic.bind(this);
        // this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        WordService.getWordsWithTranslations()
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
        var mappedJson = WordService.getWordsByWordType(wordType);
        this.setState({
            ...this.state,
            words: this.shuffle(mappedJson),
            viewTranslation: false,
            errors: [],
            correct: [],
            currentWordType: wordType,
            currentWord: mappedJson[0]
        });
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
                        <Read currentWord={this.state.currentWord} onAnswerProvidedCallback={this.updateCounters} />
                    </div>
                </div>
            </div>
        )
    }
}