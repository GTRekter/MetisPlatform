import JwtService from './JwtService';
import HttpService from './HttpService';

class StatisticService {
    addStatistic(title, description, languageId, words, grammarPoints) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            title: title,
            description: description,
            languageId: languageId,
            words: words,
            grammarPoints: grammarPoints
        })
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Statistic/AddStatistic", body, headers);
    }
    getStatisticsByCurrentUserLastWeek() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Statistic/GetStatisticsByCurrentUserLastWeek", null, headers)
            .then(res => res.json());  
    }
    getCommonErrorByCurrentUser() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Statistic/GetCommonErrorByCurrentUser", null, headers)
            .then(res => res.json());  
    }
    getStatisticsByUserId(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Statistic/GetStatisticsByUserId?id=" + id, null, headers)
            .then(res => res.json());  
    }
}
export default new StatisticService();