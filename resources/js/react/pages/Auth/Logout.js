import { removeToken } from '../../servises/Token';
import { Navigate } from 'react-router-dom';
import { removeVerify } from './../../servises/ServisesVerify';
import { Post } from '../../servises/Request';


function Logout() {
    const home = process.env.MIX_REACT_APP_ROUTE_HOME
    
    Post('logout');
    removeToken();
    removeVerify();
    return <Navigate to={home} />;
}

export default Logout;