import data from '../data/dictionary.json';

class DictionaryService {    
    getAllTopics(){
        var topics = [];
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[i].words.length; j++) {
                for(var k = 0; k < data[i].words[j].topics.length; k++) {
                    if(!topics.includes(data[i].words[j].topics[k])){
                        topics.push(data[i].words[j].topics[k]);
                    }
                }           
            }        
        }
        return topics; 
    }
    getAllWords(){
        var wordArrays = data.map(lesson => {
            return lesson.words.map(item => {
                return {
                    korean: item.korean,
                    english: item.english,
                    roman: item.roman,
                    description: item.description,
                    example: item.example
                }
            })
        });    
        var words = [];
        for(var i = 0; i < wordArrays.length; i++) {
            words = words.concat(wordArrays[i]);
        }
        return words; 
    }
    getAllWordsByTopic(topic){
        console.log(topic);
        var wordArrays = data.map(lesson => {
            var words = lesson.words;
            console.log(topic);
            if(topic !== undefined && topic !== ""){
                words = lesson.words.filter(item => item.topics.includes(topic))
            }
            return words.map(item => {
                return {
                    korean: item.korean,
                    english: item.english,
                    roman: item.roman
                }     
            })
        });    
        var words = [];
        for(var i = 0; i < wordArrays.length; i++) {
            words = words.concat(wordArrays[i]);
        }
        return words; 
    }
    getAllWordsFromString(wordString, topic){
        console.log(wordString);
        console.log("topic:" + topic);
        var wordArrays = data.map(lesson => {
            var words = lesson.words;
            if(topic !== undefined && topic !== ""){
                words = lesson.words.filter(item => item.topics.includes(topic))
            }
            return words.map(item => {
                return {
                    korean: item.korean,
                    english: item.english,
                    roman: item.roman
                }     
            })
        });   
        var words = [];
        for(var i = 0; i < wordArrays.length; i++) {
            for(var k = 0; k < wordArrays[i].length; k++) {
                if(wordArrays[i][k].korean.includes(wordString) 
                || wordArrays[i][k].english.includes(wordString)
                || wordArrays[i][k].roman.includes(wordString)){
                    words.push(wordArrays[i][k]);
                }  
            }
        }
        return words;         
    }
}
export default new DictionaryService();