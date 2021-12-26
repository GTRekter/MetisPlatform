class DictionaryService {
    addDictionary(name, code, primary) {
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
                code: code,
                primary: primary
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
    getAllDictionariesByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetAllDictionariesByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
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
    getDictionariesCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetDictionariesCount", {
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
export default new DictionaryService();