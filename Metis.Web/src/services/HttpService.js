import JwtService from "./JwtService";

class HttpService {
    request(method, url, data, headers) {
        return fetch(url, {
            method: method,
            mode: 'cors',
            headers: headers,
            body: data
        })
        .then(async(res) => {
            if (!res.ok) {
                if (res.status === 401) {
                    JwtService.removeToken();
                    window.location.href = window.location.host + "/login";
                } else {
                    await res.text().then((text) => {
                        throw Error(text);
                    })
                }
            }   
            return res;     
        })
    }
}
export default new HttpService();