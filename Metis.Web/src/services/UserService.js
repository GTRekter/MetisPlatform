class UserService {
    addUser(firstname, lastname, email, role) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/AddUser", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                email: email,
                role: role
            })
        })
    }
    getUsers() {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/GetUsers", {
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
    getUserById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/GetUserById?id=" + id, {
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
    getUsersByPage(page, itemsPerPage) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/GetUsersByPage?page=" + page + "&itemsPerPage=" + itemsPerPage, {
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
    getUsersCount() {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/GetUsersCount", {
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
}
export default new UserService();