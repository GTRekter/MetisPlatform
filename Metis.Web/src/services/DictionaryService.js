import JwtService from '../services/JwtService';

class DictionaryService {
    getDictionaries() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Dictionary/GetDictionaries", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + JwtService.getToken()
            }
        })
            .then(res => res.json());
    }
}
export default new DictionaryService();