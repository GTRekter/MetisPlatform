class WordService {
    getAllWords() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetAllWords", {
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
    addWord(text, idDictionary, idWordType, description, example) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddWord", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                text: text,
                idDictionary: idDictionary,
                idWordType: idWordType,
                description: description,
                example: example
            })
        })
        // .then(res => res.json());        
    }
    addWordWithTranslations(text, idDictionary, idWordType, description, example, translations) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddWordWithTranslations", {
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
                        idDictionary: idDictionary,
                        idWordType: idWordType,
                        description: description,
                        example: example
                    },
                    translations: translations
                })
        })
        // .then(res => res.json());        
    }
    removeWordById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/RemoveWordById", {
            method: 'post',
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
    getAllWordTypes() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetAllWordTypes", {
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
}
export default new WordService();