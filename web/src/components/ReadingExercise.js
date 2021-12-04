import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import { HappyOutline, SadOutline, EyeOutline, EyeOffOutline, RefreshOutline } from 'react-ionicons'

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
        this.loadDictionaryFromFile();
    }
    onClickAddError = () => {
        var self = this;
        this.setState({
            viewTranslation: true
        })
        setTimeout(function () {
            self.updateCounters(true);
        }, 3000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true
        })
        setTimeout(function () {
           self.updateCounters(false);
        }, 3000);
    };
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
    };
    onClickReset = () => {
        this.loadDictionaryFromFile();
    };
    updateCounters(isError) {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length)) {
            if(isError){
                this.setState({
                    errors: [...this.state.errors, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length],
                    viewTranslation: false
                })
            } else {
                this.setState({
                    correct: [...this.state.correct, this.state.currentWord],
                    currentWord: this.state.words[this.state.errors.length + this.state.correct.length],
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
    }
    loadDictionaryFromFile = () => {
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
        if (this.state.viewTranslation) {
            var transation = <CardText> {this.state.currentWord.korean} ({this.state.currentWord.roman}) </CardText>
            var translationIcon = <EyeOffOutline color={'#616161'} width="100px" height="100%" />
        } else {
            var translationIcon = <EyeOutline color={'#616161'} width="100px" height="100%" />
        }
        return (
            <div>
                <ScoreBoard wordsCount={this.state.words.length + 1} errorsCount={this.state.errors.length} correctCount={this.state.correct.length} />
                <Row className='position-absolute top-50 start-50 translate-middle'>
                    <Col className='text-center my-5'>
                        <p className='h1'>{this.state.currentWord != null ? this.state.currentWord.english : ""}</p>
                        {transation}
                    </Col>
                </Row>
                <Row className='position-absolute bottom-0 start-50 translate-middle-x pb-5'>
                    <Col md='3' className='text-center'>
                        <Button className="bg-light p-5 rounded-circle" onClick={() => this.onClickAddCorrect()}>
                            <HappyOutline color={'#616161'} width="100px" height="100%" />
                        </Button>
                    </Col>
                    <Col md='3' className='text-center'>
                        <Button className="bg-light p-5 rounded-circle" onClick={() => this.onClickAddError()}>
                            <SadOutline color={'#616161'} width="100px" height="100%" />
                        </Button>
                    </Col>
                    <Col md='3' className='text-center'>
                        <Button className="bg-light p-5 rounded-circle" onClick={() => this.onClickViewTranslation()}>
                            {translationIcon}
                        </Button>
                    </Col>
                    <Col md='3' className='text-center'>
                        <Button className="bg-light p-5 rounded-circle" onClick={() => this.onClickReset()}>
                            <RefreshOutline color={'#616161'} width="100px" height="100%" />
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}