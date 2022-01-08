class WordService {
    addWord(text, romanization, dictionaryId, wordTypeId, description, example, translations) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/AddWord", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                text: text,
                romanization: romanization,
                dictionaryId: dictionaryId,
                wordTypeId: wordTypeId,
                description: description,
                example: example,
                translations: translations
            })
        })
    }
    editWord(id, text, romanization, dictionaryId, wordTypeId, description, example, translations) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/EditWord", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: id,
                text: text,
                romanization: romanization,
                dictionaryId: dictionaryId,
                wordTypeId: wordTypeId,
                description: description,
                example: example,
                translations: translations
            })
        })
    }
    getWords() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWords", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordsByText(text) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsByText?text=" + text, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordById?id=" + id, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordsByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/getWordsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordsCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsCount", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getWordsBySearchQueryCount(searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsBySearchQueryCount?searchQuery=" + searchQuery, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    deleteWordById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/DeleteWordById?id=" + id, {
            method: 'delete',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
    }
}
export default new WordService();