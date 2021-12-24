class DictionaryService {
    addLanguage(name, code) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddLanguage", {
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
    removeLanguageById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/RemoveLanguageById", {
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
    getAllLanguages() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetAllLanguages", {
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
    addProduct(name, price) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/AddWord", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                name: name,
                price: price
            })
        })
        // .then(res => res.json());        
    }
    deleteProduct(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/RemoveWordById", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                id: id
            })
        })
        //.then(res => res.json());        
    }
}
export default new DictionaryService();