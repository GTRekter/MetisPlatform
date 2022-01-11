import * as sdk from "microsoft-cognitiveservices-speech-sdk";

class SpeechService {
    synthesizeSpeech = (string, languageCode) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = languageCode;
        speechConfig.speechSynthesisLanguage = languageCode;
        const audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput();
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakTextAsync(
            string,
            result => {
                if (result) {
                    synthesizer.close();
                    return result.audioData;
                }
            },
            error => {
                console.log(error);
                synthesizer.close();
            });
    };
    recognizeSpeech = (languageCode) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = languageCode;
        const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
        return new Promise((resolve, reject) => {
            recognizer.recognizeOnceAsync(
                result => {
                    console.log(result);
                    resolve(result.privText);
                    recognizer.close();
                },
                error => {
                    reject(error);
                    recognizer.close();
                }
            );
        })
    };
}
export default new SpeechService();