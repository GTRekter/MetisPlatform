class DictionaryService {
    addDictionary(name, code) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddDictionary", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: name,
                code: code
            })
        })
        .then(res => res.json());
    }
    removeDictionaryById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/RemoveDictionaryById", {
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
    getAllDictionaries() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetAllDictionaries", {
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
    addWordType(name, description) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddWordType", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: name,
                description: description
            })
        })
        .then(res => res.json());
    }
    removeWordTypeById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/RemoveWordTypeById", {
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
}
export default new DictionaryService();