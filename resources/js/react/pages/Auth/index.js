import Login from "./Login";
import Register from "./Register";
import Logout from "./Logout";
import OTP from "./OTP";
import ResetPassword from "./ResetPassword";

function Auth(params) {

    if (params.page === 'login') { return <Login /> }
    if (params.page === 'register') { return <Register /> }
    if (params.page === 'logout') { return <Logout /> }
    if (params.page === 'otp') { return <OTP /> }
    if (params.page === 'reset_password') { return <ResetPassword /> }
}

export default Auth;
