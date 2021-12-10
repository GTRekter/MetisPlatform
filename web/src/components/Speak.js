import React, { Component } from 'react';
import SpeechService from '../services/SpeechService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash, faEye, faEyeSlash, faVolumeUp, faVolumeMute } from '@fortawesome/free-solid-svg-icons'

export default class Speak extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userAnswer: null,
            viewTranslation: false,
            isPlaying: false,
            isAnswerCorrect: false,
            isRecordingMicrophone: false
        }
        this.onClickToggleMicrophone = this.onClickToggleMicrophone.bind(this);
        this.onClickViewTranslation = this.onClickViewTranslation.bind(this);
        this.onClickPlayTranslation = this.onClickPlayTranslation.bind(this);
    }
    onClickViewTranslation = () => {
        this.setState({
            viewTranslation: !this.state.viewTranslation
        })
    };
    onClickPlayTranslation = () => {
        let self = this;
        this.setState({
            isPlaying: true
        });
        SpeechService.synthesizeSpeech(self.props.currentWord.korean);
        setTimeout(function () {     
            self.setState({
                isPlaying: false
            })
        }, 2000);   
    };
    onClickToggleMicrophone = async () => {
        var self = this;
        this.setState({
            isRecordingMicrophone: true
        });
        await SpeechService.recognizeSpeech()
            .then((result) => {
                this.setState({
                    userAnswer: result,
                    viewTranslation: true,
                    isRecordingMicrophone: false,
                    isAnswerCorrect: result === this.state.currentWord.korean
                });
                setTimeout(function () {
                    self.props.onAnswerProvidedCallback(result === this.state.currentWord.korean);
                    self.resetValues();
                }, 2000); 
            });
    }
    resetValues = () => {
        this.setState({
            userAnswer: null,
            viewTranslation: false,
            isRecordingMicrophone: false,
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
        var playIcon = <FontAwesomeIcon className="link-light" icon={faVolumeUp} />;
        if (this.state.isPlaying) {
            playIcon = <FontAwesomeIcon className="link-light" icon={faVolumeMute} />
        }
        var microphoneIcon = <FontAwesomeIcon className="link-light" icon={faMicrophone} />;
        if (this.state.isRecordingMicrophone) {
            microphoneIcon = <FontAwesomeIcon className="link-light" icon={faMicrophoneSlash} />
        }
        var backgroundClass = "bg-gradient-info shadow-info";
        if (this.state.userAnswer !== null) {
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
                    <h6 className="mb-0 ">Answer recognized</h6>
                    <p className="text-sm ">{this.state.userAnswer}</p>
                    <h6 className="mb-0 ">Examples</h6>
                    <p className="text-sm ">{currentWordExample}</p>
                    <h6 className="mb-0 ">Description</h6>
                    <p className="text-sm ">{currentWordDescription}</p>
                    <hr className="dark horizontal" />
                    <div className="text-center">
                        <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickToggleMicrophone()}>
                            {microphoneIcon}
                        </button>
                        <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickPlayTranslation()}>
                            {playIcon}
                        </button>
                        <button className="btn btn-secondary mx-3 mb-0 text-white" onClick={() => this.onClickViewTranslation()}>
                            {translationIcon}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}