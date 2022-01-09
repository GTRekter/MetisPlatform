import JwtService from '../services/JwtService';

class WordTypeService {
    getWordTypes() {
        return fetch(process.env.REACT_APP_API_BASEURL + "WordType/GetAllWordTypes", {
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
export default new WordTypeService();