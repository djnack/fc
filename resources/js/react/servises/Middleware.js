import { Navigate } from "react-router-dom";
import { getToken } from "./Token";
import { getVerify } from './ServisesVerify';

const home = process.env.MIX_REACT_APP_ROUTE_HOME
const login = process.env.MIX_REACT_APP_ROUTE_LOGIN
const verfiy = process.env.MIX_REACT_APP_ROUTE_VERIFY

export function Auth({ children }) {
    return getToken() ? children : null;
}

export function Guest({ children }) {
    return !getToken() ? children : null;
}

export function AuthRoute({ children }) {
    return getToken() ? children : <Navigate to={login} />;
}

export function GuestRoute({ children }) {
    return !getToken() ? children : <Navigate to={home} />;
}

export function IsNotVerify({ children }) {
    return !getVerify() ? children : <Navigate to={home} />;
}

export function IsVerify({ children }) {
    console.log(getVerify());
    return getVerify() ? children : <Navigate to={verfiy} />;
}
