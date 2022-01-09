class JwtService {
    getToken() {
        return sessionStorage.getItem("token")
    }
    setToken(token) {
        return sessionStorage.setItem("token", token)
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
}
export default new JwtService();