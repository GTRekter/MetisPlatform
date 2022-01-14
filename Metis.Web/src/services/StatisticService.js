import JwtService from './JwtService';
import HttpService from './HttpService';

class StatisticService {
    getStatisticsByUserIdLastWeek(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Statistic/GetStatisticsByUserIdLastWeek?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getCommonErrorByUserId(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Statistic/GetCommonErrorByUserId?id=" + id, null, headers)
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