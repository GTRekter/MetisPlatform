import * as sdk from "microsoft-cognitiveservices-speech-sdk";

class SpeechService {    
    synthesizeSpeech = (string) => {
        const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
        speechConfig.speechRecognitionLanguage = "ko-KR";
        speechConfig.speechSynthesisLanguage = "ko-KR";
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
}
export default new SpeechService();