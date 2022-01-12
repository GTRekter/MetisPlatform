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
                if (res.response && res.response.status === 401) {
                    JwtService.removeToken();
                    window.location = window.location.host + "/login";
                } else {
                    await res.text().then((text) => {
                        throw Error(text);
                    })
                }
            }   
            return res;     
        })
        .
        // .catch((error) => {
        //     // JwtService.removeToken();
        //     // window.location.reload();
        // })
    }
}
export default new HttpService();