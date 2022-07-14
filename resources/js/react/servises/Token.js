export function getToken() {
    try {
        return JSON.parse(localStorage.getItem('REACT_TOKEN_AUTH') || null) || null;
    } catch (error) {
        return null;
    }
}

export function setToken(token) {
    localStorage.setItem('REACT_TOKEN_AUTH', JSON.stringify(token));
    return true;
}

export function removeToken() {
    try {
        return localStorage.removeItem('REACT_TOKEN_AUTH');
    } catch (error) {
        return true;
    }
    
}
