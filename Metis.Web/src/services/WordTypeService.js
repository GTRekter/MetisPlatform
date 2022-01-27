import JwtService from '../services/JwtService';
import HttpService from '../services/HttpService';

class WordTypeService {
    getWordTypes() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "WordType/GetAllWordTypes", null, headers)
            .then(res => res.json());  
    }
}
export default new WordTypeService();