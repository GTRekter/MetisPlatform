import JwtService from '../services/JwtService';
import HttpService from '../services/HttpService';

class LessonService {
    addLesson(title, description, dictionaryId, words, grammarPoints) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            title: title,
            description: description,
            dictionaryId: dictionaryId,
            words: words,
            grammarPoints: grammarPoints
        })
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Lesson/AddLesson", body, headers);
    }
    editLesson(id, title, description, dictionaryId, words, grammarPoints) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        let body = JSON.stringify({
            id: id,
            title: title,
            description: description,
            dictionaryId: dictionaryId,
            words: words,
            grammarPoints: grammarPoints
        })
        return HttpService.request('post', process.env.REACT_APP_API_BASEURL + "Lesson/EditLesson", body, headers);
    }
    getLessons() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessons", null, headers)
            .then(res => res.json());  
    }
    getLessonsByDictionaryId(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsByDictionaryId?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getLessonById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonById?id=" + id, null, headers)
            .then(res => res.json());  
    }
    getLessonsByPage(page, itemsPerPage) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, null, headers)
            .then(res => res.json());  
    }
    getLessonsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/getLessonsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    getLessonsCount() {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsCount", null, headers)
            .then(res => res.json());  
    }
    getLessonsBySearchQueryCount(searchQuery) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('get', process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsBySearchQueryCount?searchQuery=" + searchQuery, null, headers)
            .then(res => res.json());  
    }
    deleteLessonById(id) {
        let headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Authorization': 'Bearer ' + JwtService.getToken()
        };
        return HttpService.request('delete', process.env.REACT_APP_API_BASEURL + "Lesson/DeleteLessonById?id=" + id, null, headers);
    }
}
export default new LessonService();