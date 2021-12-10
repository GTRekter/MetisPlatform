import React, { Component } from 'react';
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

export default class Read extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viewTranslation: false,
            isAnswerProvided: false,
            isAnswerCorrect: false
        }
        this.onClickAddError = this.onClickAddError.bind(this);
        this.onClickAddCorrect = this.onClickAddCorrect.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
    }
    onClickViewTranslation = () => {
        if (!this.state.viewTranslation) {
            SpeechService.synthesizeSpeech(this.state.currentWord.korean);
        }
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
    };
    onClickAddError = () => {
        var self = this;
        this.setState({
            viewTranslation: true,
            isAnswerProvided: true,
            isAnswerCorrect: false
        })
        SpeechService.synthesizeSpeech(this.props.currentWord.korean);
        setTimeout(function () {
            self.props.onAnswerProvidedCallback(false);
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
        SpeechService.synthesizeSpeech(this.props.currentWord.korean);
        setTimeout(function () {
            self.props.onAnswerProvidedCallback(true);
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
    render() {
        var transation = <h2>&nbsp;<br />&nbsp;</h2>;
        var translationIcon = <FontAwesomeIcon className="link-light" icon={faEye} />;
        if (this.state.viewTranslation) {
            transation = <h2 className="text-white">{this.props.currentWord.korean} <br />({this.props.currentWord.roman})</h2>
            translationIcon = <FontAwesomeIcon className="link-light" icon={faEyeSlash} />
        }
        var backgroundClass = "bg-gradient-info shadow-info";
        if (this.state.isAnswerProvided) {
            if (this.state.isAnswerCorrect) {
                backgroundClass = "bg-gradient-success shadow-success";
            } else {
                backgroundClass = "bg-gradient-danger shadow-danger";
            }
        }
        var currentWordEnglish = "";
        var currentWordExample = "";
        var currentWordDescription= "";
        if(this.props.currentWord !== null) {
            currentWordEnglish = this.props.currentWord.english;
            currentWordExample = this.props.currentWord.example;
            currentWordDescription= this.props.currentWord.description;
        }
        return (
            <div className="card z-index-2">
                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                    <div className={`border-radius-lg py-3 pe-1 text-center ${backgroundClass}`}>
                        <h1 className="display-4 fst-italic mt-5 text-white">{currentWordEnglish}</h1>
                        {transation}
                    </div>
                </div>
                <div className="card-body">
                    <h6 className="mb-0 ">Examples</h6>
                    <p className="text-sm ">{currentWordExample}</p>
                    <h6 className="mb-0 ">Description</h6>
                    <p className="text-sm ">{currentWordDescription}</p>
                    <hr className="dark horizontal" />
                    <div className="text-center">
                        <button className="btn btn-success mx-3 mb-0 text-white" onClick={() => this.onClickAddCorrect()}>
                            <FontAwesomeIcon icon={faThumbsUp} />
                        </button>
                        <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickViewTranslation()}>
                            {translationIcon}
                        </button>
                        <button className="btn btn-danger mx-3 mb-0 text-white" onClick={() => this.onClickAddError()}>
                            <FontAwesomeIcon icon={faThumbsDown} />
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}