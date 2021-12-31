class RoleService {
    getRoles() {
        return fetch(process.env.REACT_APP_API_BASEURL + "Role/GetRoles", {
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
export default new RoleService();