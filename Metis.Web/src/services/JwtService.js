class JwtService {
    getToken() {
        return sessionStorage.getItem("token")
    }
    setToken(token) {
        sessionStorage.setItem("token", token)
    }
    removeToken() {
        sessionStorage.removeItem("token")
    }
    isAdmin() {
        let jwt = sessionStorage.getItem("token").split('.')[1]
        let decodedJwt = JSON.parse(window.atob(jwt))
        return decodedJwt.role === "Administrator"
    }
    getCurrentUserId() {
        let jwt = sessionStorage.getItem("token").split('.')[1]
        let decodedJwt = JSON.parse(window.atob(jwt))
        return decodedJwt.Id
    }
    isExpired() {
        let jwt = sessionStorage.getItem("token").split('.')[1]
        let decodedJwt = JSON.parse(window.atob(jwt))
        if (decodedJwt.exp * 1000 < Date.now()) {
            return false;
        }
        return true;
    }
}
export default new JwtService();