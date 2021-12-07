import data from '../data/lessons.json';
import dataAlphabet from '../data/alphabet.json';

class LessonsService {    
    getLessonsCount(){
        return data.length; 
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
    getAlphabet(){
        return dataAlphabet.map(lesson => {
            return lesson.words.map(item => {
                return {
                    korean: item.korean,
                    english: "",
                    roman: item.roman,
                    description: item.description,
                    example: ""
                }
            })
        });      
    }
    getAllWordsFromLessonId(lessonID){
        return data[lessonID].words.map(item => {
            return {
                korean: item.korean,
                english: item.english,
                roman: item.roman,
                description: item.description,
                example: item.example
            }
        })      
    }
    getAllWordsFromString(wordString){
        console.log(wordString);
        var wordArrays = data.map(lesson => {
            return lesson.words.map(item => {
                return {
                    korean: item.korean,
                    english: item.english,
                    roman: item.roman
                }     
            })
        });   
        console.log(wordArrays);
        var words = [];
        for(var i = 0; i < wordArrays.length; i++) {
            console.log(wordArrays[i]);
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
//     addProduct(name, price){
//         return fetch(process.env.REACT_APP_API_BASEURL + "Product/AddProduct",{ 
//             method: 'post',
//             mode: 'cors',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin':'*'
//             },
//             body: JSON.stringify({
//                 name: name,
//                 price: price
//             })
//         })
//         // .then(res => res.json());        
//     }
//     deleteProduct(id){
//         return fetch(process.env.REACT_APP_API_BASEURL + "Product/DeleteProductById",{ 
//             method: 'post',
//             mode: 'cors',
//             headers: {
//                 'Accept': 'application/json, text/plain, */*',
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin':'*'
//             },
//             body: JSON.stringify({
//                 id: id
//             })
//         })
//         //.then(res => res.json());        
//     }
}
export default new LessonsService();