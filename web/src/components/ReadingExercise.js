import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { HappySharp, SadSharp, EyeSharp } from 'react-ionicons'

import data from '../data/lesson01.json';

export default class ReadingExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            words: [],
            errors: [],
            correct: [],
            currentWord: null,
            viewTranslation: false
        }
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
    }
    componentDidMount() {
        this.loadFromFile();
    }
    onClickAddError = () => {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length)) {
            this.setState({
                errors: [...this.state.errors, this.state.currentWord],
                currentWord: this.state.words[this.state.errors.length + this.state.correct.length],
                viewTranslation: false
            })
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
    onClickAddCorrect = () => {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length)) {
            this.setState({
                correct: [...this.state.correct, this.state.currentWord],
                currentWord: this.state.words[this.state.errors.length + this.state.correct.length],
                viewTranslation: false
            })
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
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
    };
    onClickReset = () => {
        this.loadFromFile();
    };
    loadFromFile = () => {
        const mappedJson = data.words.map(item => {
            return {
                korean: item.korean,
                english: item.english,
                roman: item.roman
            }
        });
        this.setState({ 
            words: this.shuffle(mappedJson), 
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    render() {
        if(this.state.viewTranslation) {
            var transation = <CardText> {this.state.currentWord.korean} ({this.state.currentWord.roman}) </CardText>
        }    
        return (
            <div>
                <ScoreBoard wordsCount={this.state.words.length + 1} errorsCount={this.state.errors.length} correctCount={this.state.correct.length} />
                <Card>
                    <CardBody>
                        <CardTitle tag="h5">
                            {this.state.currentWord != null ? this.state.currentWord.english : ""} 
                        </CardTitle>
                        {transation}
                    </CardBody>
                </Card>
                <div className="d-flex justify-content-center">
                    <Button color="success" onClick={() => this.onClickAddCorrect()}>
                        <HappySharp color={'#FFFFFF'} />
                    </Button>
                    <Button color="secondary" onClick={() => this.onClickViewTranslation()}>
                        <EyeSharp color={'#FFFFFF'} />
                    </Button>
                    <Button color="danger" onClick={() => this.onClickAddError()}>
                        <SadSharp color={'#FFFFFF'} />
                    </Button>
                    <Button color="secondary" onClick={() => this.onClickReset()}>
                        Reset
                    </Button>
                </div>
            </div>
        )
    }
}