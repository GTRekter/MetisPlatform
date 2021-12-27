class DictionaryService {
    enableDictionaryById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/EnableDictionary", {
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
    disableDictionaryById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/DisableDictionary", {
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
    getDictionaries() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetDictionaries", {
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
    getDictionariesByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetDictionariesByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
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
    getEnabledDictionariesByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetEnabledDictionariesByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
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
    getEnabledDictionaries() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetEnabledDictionaries", {
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
    getEnabledDictionariesCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetEnabledDictionariesCount", {
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