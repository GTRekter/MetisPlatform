import data from '../data/lessons.json';

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
    getAllWordsFromLessonId(lessonID){
        console.log(lessonID);
        console.log(data[lessonID]);
        return data[lessonID].words.map(item => {
            return {
                korean: item.korean,
                english: item.english,
                roman: item.roman
            }
        })      
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