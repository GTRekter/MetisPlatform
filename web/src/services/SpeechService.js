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
    // recognizeSpeech = (arrayBuffer) => {
    //     // const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
    //     // speechConfig.speechRecognitionLanguage = "ko-KR";    
    //     // const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
    //     // const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    //     // return recognizer.recognizeOnceAsync(result => {
    //     //     let displayText = null;
    //     //     if (result.reason === sdk.ResultReason.RecognizedSpeech) {
    //     //         displayText = result.text;
    //     //     }
    //     //     return displayText;
    //     // });
    //     console.log(arrayBuffer);
    //     let pushStream = sdk.AudioInputStream.createPushStream();

    //     // // fs.createReadStream("YourAudioFile.wav").on('data', function (arrayBuffer) {
    //          pushStream.write(arrayBuffer);
    //     // // }).on('end', function () {
    //          pushStream.close();
    //     // // });
    //     const speechConfig = sdk.SpeechConfig.fromSubscription(process.env.REACT_APP_AZURE_CS_SPEECH_KEY, process.env.REACT_APP_AZURE_CS_SPEECH_REGION);
    //     let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    //     speechConfig.speechRecognitionLanguage = "ko-KR";
    //     let recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    //     recognizer.recognizeOnceAsync(result => {
    //         console.log(`RECOGNIZED: Text=${result.text}`);
    //         recognizer.close();
    //     });

    //     return recognizer.recognizeOnceAsync(result => {
    //         let displayText = null;
    //         if (result.reason === sdk.ResultReason.RecognizedSpeech) {
    //             displayText = result.text;
    //         }
    //         console.log(displayText);
    //         return displayText;
    //     });
    // };
}
export default new SpeechService();