import JwtService from './JwtService';
import HttpService from './HttpService';

class LanguageService {
    getLanguages() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Language/GetLanguages", null, headers)
            .then(res => res.json());
    }
}
export default new LanguageService(); 