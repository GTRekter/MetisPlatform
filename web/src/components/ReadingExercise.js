import React, { Component } from 'react';
import ScoreBoard from './ScoreBoard';
import LessonsService from '../services/LessonsService';
import { Button, Row, Col } from 'reactstrap';
import { HappyOutline, SadOutline, EyeOutline, EyeOffOutline, RefreshOutline } from 'react-ionicons'

export default class ReadingExercise extends Component {
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
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        this.onClickUpdateWordsByLessonId = this.onClickUpdateWordsByLessonId.bind(this);
        this.onClickUpdateWordsByAll = this.onClickUpdateWordsByAll.bind(this);
    }
    componentDidMount() {
        const lessonsCount = LessonsService.getLessonsCount();
        const mappedJson = LessonsService.getAllWords();
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
        setTimeout(function () {
            self.updateCounters(true);
        }, 1000);
    };
    onClickAddCorrect = () => {
        var self = this;
        this.setState({
            viewTranslation: true
        })
        setTimeout(function () {
            self.updateCounters(false);
        }, 1000);
    };
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
    };
    onClickReset = () => {
        const mappedJson = LessonsService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    onClickUpdateWordsByLessonId = (element) => {
        var lessonId = element.target.getAttribute("data-index")
        const mappedJson = LessonsService.getAllWordsFromLessonId(lessonId);
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    onClickUpdateWordsByAll = () => {
        const mappedJson = LessonsService.getAllWords();
        this.setState({
            words: this.shuffle(mappedJson),
            currentWord: mappedJson[0],
            errors: [],
            correct: []
        });
    };
    updateCounters(isError) {
        if (this.state.words.length > (this.state.errors.length + this.state.correct.length)) {
            if (isError) {
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
    shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };
    render() {
        var translationIcon = null;
        if (this.state.viewTranslation) {
            var transation = <span>{this.state.currentWord.korean} ({this.state.currentWord.roman})</span>
            translationIcon = <EyeOffOutline color={'#616161'} width="100%" height="100%" />
        } else {
            translationIcon = <EyeOutline color={'#616161'} width="100%" height="100%" />
        }
        var lessonsOptions = [];
        lessonsOptions.push(<Button className='mx-1' color="primary" onClick={() => this.onClickUpdateWordsByAll()}>All</Button>);
        for (var index = 0; index < this.state.lessonsCount; index++) {
            lessonsOptions.push(<Button key={index} className='mx-1' color="primary" data-index={index} onClick={(element) => this.onClickUpdateWordsByLessonId(element)}>{index}</Button>);
        }
        return (
            <div>
                <Row className='mb-5'>
                    <Col md='12' className='text-center'>
                        {lessonsOptions}
                    </Col>
                </Row>
                <ScoreBoard wordsCount={this.state.words.length + 1} errorsCount={this.state.errors.length} correctCount={this.state.correct.length} />
                <Row className='py-400'>
                    <Col className='text-center my-5'>
                        <p className='h1'>{this.state.currentWord != null ? this.state.currentWord.english : ""}</p>
                        <p className='h2'>{transation}</p>
                    </Col>
                </Row>
                <Row>
                    <Col xs="6" md="3" className='text-center px-5 py-2'>
                        <Button className="bg-light p-3 rounded-circle" onClick={() => this.onClickAddCorrect()}>
                            <HappyOutline color={'#616161'} width="100%" height="100%" />
                        </Button>
                    </Col>
                    <Col xs="6" md="3" className='text-center px-5 py-2'>
                        <Button className="bg-light p-3 rounded-circle" onClick={() => this.onClickAddError()}>
                            <SadOutline color={'#616161'} width="100%" height="100%" />
                        </Button>
                    </Col>
                    <Col xs="6" md="3" className='text-center px-5 py-2'>
                        <Button className="bg-light p-3 rounded-circle" onClick={() => this.onClickViewTranslation()}>
                            {translationIcon}
                        </Button>
                    </Col>
                    <Col xs="6" md="3" className='text-center px-5 py-2'>
                        <Button className="bg-light p-3 rounded-circle" onClick={() => this.onClickReset()}>
                            <RefreshOutline color={'#616161'} width="100%" height="100%" />
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}