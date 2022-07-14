import { Link } from 'react-router-dom';
import { Auth, Guest } from '../../servises/Middleware';

function Nav() {
    const home = process.env.MIX_REACT_APP_ROUTE_HOME
    const login = process.env.MIX_REACT_APP_ROUTE_LOGIN
    const register = process.env.MIX_REACT_APP_ROUTE_REGISTER
    const logout = process.env.MIX_REACT_APP_ROUTE_LOGOUT
    const otp = process.env.MIX_REACT_APP_ROUTE_OTP
    const reset_password = process.env.MIX_REACT_APP_ROUTE_RESET_PASSWORD
    const verify = process.env.MIX_REACT_APP_ROUTE_VERIFY
    const profile = process.env.MIX_REACT_APP_ROUTE_PROFILE

    return (<>
        <ul>
            <li>
                <Link to={home}>خانه</Link>
            </li>
            <li>
                <Link to={verify}>احراز هویت</Link>
            </li>
            <Guest>
                <li>
                    <Link to={login}>ورود</Link>
                </li>
                <li>
                    <Link to={register}>ثبت نام</Link>
                </li>
                <li>
                    <Link to={otp}>otp</Link>
                </li>
                <li>
                    <Link to={reset_password}>رست پسورد</Link>
                </li>
            </Guest>
            <Auth>
                <li>
                    <Link to={logout}>خروج</Link>
                </li>
                <li>
                    <Link to={profile}>پروفایل</Link>
                </li>
            </Auth>
        </ul>
    </>);
}

export default Nav;
