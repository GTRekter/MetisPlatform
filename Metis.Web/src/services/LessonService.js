class LessonService {
    addLesson(title, description) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/AddLesson", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        })
    }
    editLesson(id, title, description) {
        return fetch(process.env.REACT_APP_API_BASEURL + "Lesson/EditLesson", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                description: description
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
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
                'Access-Control-Allow-Origin': '*'
            }
        })
    }
}
export default new LessonService();