class UserService {
    loginUser(email, password) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/LoginUser", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(async (res) => {
                if (!res.ok) {
                    await res.text().then((text) => {
                        throw Error(text);
                    })
                }
                return await res.text();
            })
    }
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
    editUser(id, firstname, lastname, email) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/EditUser", {
            method: 'post',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                id: id,
                firstname: firstname,
                lastname: lastname,
                email: email
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
    getUsersByPageAndSearchQuery(page, itemsPerPage, searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/getUsersByPageAndSearchQuery?page=" + page + "&itemsPerPage=" + itemsPerPage + "&searchQuery=" + searchQuery, {
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
    getUsersBySearchQueryCount(searchQuery) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/GetUsersBySearchQueryCount?searchQuery=" + searchQuery, {
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
    deleteUserById(id) {
        return fetch(process.env.REACT_APP_API_BASEURL + "User/DeleteUserById?id=" + id, {
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
export default new UserService();