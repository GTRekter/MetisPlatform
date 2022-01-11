import JwtService from '../services/JwtService';
import HttpService from '../services/HttpService';

class DictionaryService {
    getDictionaries() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Dictionary/GetDictionaries", null, headers)
            .then(res => res.json());
    }
}
export default new DictionaryService(); 