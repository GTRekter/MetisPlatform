import JwtService from '../services/JwtService';
import HttpService from '../services/HttpService';

class UserService {
    loginUser(email, password) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            email: email,
            password: password
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "User/LoginUser", body, headers)
            .then(async (res) => {
                return await res.text();
            })
    }
    addUser(firstname, lastname, email, enabled, roleId, languageId, lessons) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            enabled: enabled,
            roleId: roleId,
            languageId: languageId,
            lessons: lessons
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "User/AddUser", body, headers);
    }
    editUser(id, firstname, lastname, email, enabled, roleId, languageId, lessons) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            id: id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            enabled: enabled,
            roleId: roleId,
            languageId: languageId,
            lessons: lessons
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "User/EditUser", body, headers);
    }
    editCurrentUser(firstname, lastname, email, languageId) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            firstname: firstname,
            lastname: lastname,
            email: email,
            languageId: languageId
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "User/EditCurrentUser", body, headers);
    }
    editCurrentUserPassword(password, newPassword, confirmNewPassword) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            password: password,
            newPassword: newPassword,
            confirmNewPassword: confirmNewPassword
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "User/EditCurrentUserPassword", body, headers);
    }
    getUsers() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetUsers", null, headers)
            .then(res => res.json());  
    }
    getCurrentUser() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetCurrentUser", null, headers)
            .then(res => res.json());  
    }
    getUserById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetUserById?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getUsersByPage(page, itemsPerPage) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetUsersByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, null, headers)
            .then(res => res.json());  
    }
    getUsersByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/getUsersByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getUsersCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetUsersCount", null, headers)
            .then(res => res.json());  
    }
    getActiveUsersCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetActiveUsersCount", null, headers)
            .then(res => res.json());  
    }
    getUsersBySearchQueryCount(searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "User/GetUsersBySearchQueryCount?searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    deleteUserById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('delete', process.env.REACT_APP_USER_API_BASEURL + "User/DeleteUserById?id=" + id, null, headers);  
    }
}
export default new UserService();