import * as sdk from "microsoft-cognitiveservices-speech-sdk";

class SpeechService {
    constructor() {
        this.speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
        this.audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        this.recognizer = null;
    }
    synthesizeSpeech = (string, languageCode) => {
        this.speechConfig.speechRecognitionLanguage = languageCode;
        this.speechConfig.speechSynthesisLanguage = languageCode;
        this.audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
        let synthesizer = new sdk.SpeechSynthesizer(this.speechConfig, this.audioConfig);     
        synthesizer.speakTextAsync(
            string,
            result => {
                if (result) {
                    synthesizer.close();
                    return result.audioData;
                }
            },
            error => {
                synthesizer.close();
            });
    };
    recognizeSpeech = (languageCode) => {
        this.speechConfig.speechRecognitionLanguage = languageCode;
        this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
        return new Promise((resolve, reject) => {
            this.recognizer.recognizeOnceAsync(
                result => {
                    resolve(result.privText);
                    this.recognizer.close();
                },
                error => {
                    reject(error);
                    this.recognizer.close();
                }
            );
        })
    };
    assessSpeech = (string, languageCode) => {
        this.speechConfig.speechRecognitionLanguage = languageCode;
        this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
        let assestmentConfig = new sdk.PronunciationAssessmentConfig(string, sdk.PronunciationAssessmentGradingSystem.HundredMark, sdk.PronunciationAssessmentGranularity.FullText);
        assestmentConfig.applyTo(this.recognizer);
        return new Promise((resolve, reject) => {
            this.recognizer.recognizeOnceAsync(
                result => {
                    var pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(result);
                    resolve(pronunciationAssessmentResult);
                    this.recognizer.close();
                },
                error => {
                    reject(error);
                    this.recognizer.close();
                }
            );
        })
    };
    startAssessSpeech = (string, languageCode, recognizingCallback, recognizedCallback) => {
        this.speechConfig.speechRecognitionLanguage = languageCode;
        this.recognizer = new sdk.SpeechRecognizer(this.speechConfig, this.audioConfig);
        this.recognizer.recognizing = (s, e) => {
            recognizingCallback(e.result);
        };    
        this.recognizer.recognized = (s, e) => {
            var pronunciationAssessmentResult = sdk.PronunciationAssessmentResult.fromResult(e.result);
            recognizedCallback(pronunciationAssessmentResult);
        };      
        this.recognizer.canceled = (s, e) => {
            this.recognizer.stopContinuousRecognitionAsync();
        };   
        this.recognizer.sessionStopped = (s, e) => {
            this.recognizer.stopContinuousRecognitionAsync();
        };
        let assestmentConfig = new sdk.PronunciationAssessmentConfig(string, sdk.PronunciationAssessmentGradingSystem.HundredMark, sdk.PronunciationAssessmentGranularity.FullText);
        assestmentConfig.applyTo(this.recognizer);
        this.recognizer.startContinuousRecognitionAsync();
        setTimeout(() => {
            this.recognizer.stopContinuousRecognitionAsync();
        }, 5000);
    };
    stopAssessSpeech = () => {
        this.recognizer.stopContinuousRecognitionAsync();
    };
}
export default new SpeechService();