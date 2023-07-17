import JwtService from './JwtService';
import HttpService from './HttpService';

class StudentService {
    addStudent(firstname, lastname, email, enabled, languageId, lessons) {
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
            languageId: languageId,
            lessons: lessons
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "Student/AddStudent", body, headers);
    }
    editStudent(id, firstname, lastname, email, enabled, languageId, lessons) {
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
            languageId: languageId,
            lessons: lessons
        })
        return HttpService.request('post', process.env.REACT_APP_USER_API_BASEURL + "Student/EditStudent", body, headers);
    }
    getStudents() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetStudents", null, headers)
            .then(res => res.json());  
    }
    getStudentById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetStudentById?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getStudentsByPage(page, itemsPerPage) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetStudentsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, null, headers)
            .then(res => res.json());  
    }
    getStudentsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/getStudentsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getStudentsCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetStudentsCount", null, headers)
            .then(res => res.json());  
    }
    getActiveStudentsCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetActiveStudentsCount", null, headers)
            .then(res => res.json());  
    }
    getStudentsBySearchQueryCount(searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_USER_API_BASEURL + "Student/GetStudentsBySearchQueryCount?searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    deleteStudentById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('delete', process.env.REACT_APP_USER_API_BASEURL + "Student/DeleteStudentById?id=" + id, null, headers);  
    }
}
export default new StudentService();