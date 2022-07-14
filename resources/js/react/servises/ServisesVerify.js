export function getVerify() {
    try {
        return JSON.parse(localStorage.getItem('REACT_VERIFY') || null) || null;
    } catch (error) {
        return null;
    }
}

export function setVerify() {
    localStorage.setItem('REACT_VERIFY', JSON.stringify(1));
    return true;
}

export function removeVerify() {
    try {
        return localStorage.removeItem('REACT_VERIFY');
    } catch (error) {
        return true;
    }
    
}
