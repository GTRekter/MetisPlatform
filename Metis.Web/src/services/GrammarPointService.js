class GrammarPointService {
    addGrammarPoint(title, description) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/AddGrammarPoint", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
    }
    editGrammarPoint(id, title, description) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/EditGrammarPoint", {
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
                title: title,
                description: description
            })
        })
    }
    getGrammarPoints() {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/GetGrammarPoints", {
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
    getGrammarPointById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/GetGrammarPointById?id=" + id, {
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
    getGrammarPointsByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/GetGrammarPointsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
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
    getGrammarPointsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/getGrammarPointsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, {
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
    getGrammarPointsCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/GetGrammarPointsCount", {
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
    getGrammarPointsBySearchQueryCount(searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/GetGrammarPointsBySearchQueryCount?searchQuery=" + searchQuery, {
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
    deleteGrammarPointById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "GrammarPoint/DeleteGrammarPointById?id=" + id, {
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
export default new GrammarPointService();