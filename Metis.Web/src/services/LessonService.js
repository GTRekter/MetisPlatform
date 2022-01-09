class LessonService {
    addLesson(title, description, dictionaryId, words, grammarPoints) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/AddLesson", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                title: title,
                description: description,
                dictionaryId: dictionaryId,
                words: words,
                grammarPoints: grammarPoints
            })
        })
    }
    editLesson(id, title, description, dictionaryId, words, grammarPoints) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/EditLesson", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify({
                id: id,
                title: title,
                description: description,
                dictionaryId: dictionaryId,
                words: words,
                grammarPoints: grammarPoints
            })
        })
    }
    getLessons() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/GetLessons", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getLessonById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonById?id=" + id, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getLessonsByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getLessonsByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/getLessonsByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getLessonsCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsCount", {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    getLessonsBySearchQueryCount(searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/GetLessonsBySearchQueryCount?searchQuery=" + searchQuery, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
            .then(res => res.json());
    }
    deleteLessonById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/DeleteLessonById?id=" + id, {
            method: 'delete',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            }
        })
    }
}
export default new LessonService();