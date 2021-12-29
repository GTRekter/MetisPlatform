class WordService {
    getWordsCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsCount", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json());
    }
    getWordsWithTranslations() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsWithTranslations", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json());
    }
    GetWordsByWordTypeId(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsByWordTypeId?" + id, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json());
    }
    getWordsWithTranslationsByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/GetWordsWithTranslationsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
            .then(res => res.json());
    }
    addWord(text, dictionaryId, wordTypeId, description, example) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/AddWord", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text: text,
                dictionaryId: dictionaryId,
                wordTypeId: wordTypeId,
                description: description,
                example: example
            })
        })     
    }
    addWordWithTranslations(text, roman, dictionaryId, wordTypeId, description, example, translations) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/AddWordWithTranslations", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(
                {
                    word: {
                        text: text,
                        roman: roman,
                        dictionaryId: dictionaryId,
                        WordTypeId: wordTypeId,
                        description: description,
                        example: example
                    },
                    translations: translations
                })
        })       
    }
    removeWordById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Word/RemoveWordById/" + id, {
            method: 'delete',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: id
        })
            .then(res => res.json());
    }
}
export default new WordService();