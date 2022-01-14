import JwtService from '../services/JwtService';
import HttpService from '../services/HttpService';

class WordService {
    addWord(text, romanization, languageId, wordTypeId, description, example, translations) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            text: text,
            romanization: romanization,
            languageId: languageId,
            wordTypeId: wordTypeId,
            description: description,
            example: example,
            translations: translations
        })
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Word/AddWord", body, headers);  
    }
    editWord(id, text, romanization, languageId, wordTypeId, description, example, translations) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            id: id,
            text: text,
            romanization: romanization,
            languageId: languageId,
            wordTypeId: wordTypeId,
            description: description,
            example: example,
            translations: translations
        })
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Word/EditWord", body, headers);  
    }
    deleteWordById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('delete', process.env.REACT_APP_API_BASEURL + "Word/DeleteWordById?id=" + id, null, headers);
    }
    getWords() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWords", null, headers)
            .then(res => res.json());  
    }
    getWordsByUserId(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserId?Id=" + id, null, headers)
            .then(res => res.json());  
    }
    getWordsByUserIdAndWordTypeId(userId, wordTypeId) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserIdAndWordTypeId?Id=" + userId + "&wordTypeId=" + wordTypeId, null, headers)
            .then(res => res.json());  
    }
    getWordsByLanguageId(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByLanguageId?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getWordsByText(text) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByText?text=" + text, null, headers)
            .then(res => res.json());  
    }
    getWordById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordById?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getWordsByPage(page, itemsPerPage) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, null, headers)
            .then(res => res.json());  
    }
    getWordsByUserIdAndPage(id, page, itemsPerPage) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserIdAndPage?id=" + id + "&page=" + page + "&itemsPerPage=" + itemsPerPage, null, headers)
            .then(res => res.json());  
    }
    getWordsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/getWordsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getWordsByUserIdAndPageAndSearchQuery(id, page, itemsPerPage, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserIdAndPageAndSearchQuery?id=" + id + "&page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getWordsCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsCount", null, headers)
            .then(res => res.json());  
    }
    getWordsByUserIdCount(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserIdCount?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getWordsBySearchQueryCount(searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsBySearchQueryCount?searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getWordsByUserIdAndSearchQueryCount(id, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/GetWordsByUserIdAndSearchQueryCount?id=" + id +  "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    importWordsFromFile(file) {
        let formData = new FormData()
        formData.append('file', file)
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            // 'Content-Type': 'multipart/form-data;',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = formData
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Word/ImportWordsFromFile", body, headers);  
    }
    downloadImportTemplate() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'text/csv;charset=UTF-8',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Word/DownloadImportTemplate", null, headers);  
    }
    
}
export default new WordService();