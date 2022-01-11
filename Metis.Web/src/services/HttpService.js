import JwtService from "./JwtService";

class HttpService {
    request(method, url, data, headers) {
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: headers,
            body: data
        })
        .catch((error) => {
            if (error.response && error.response.status === 401 && JwtService.isExpired()) {
                JwtService.removeToken();
                window.location.reload();
            } else {
                throw error;
            }
        })
    }
}
export default new HttpService();