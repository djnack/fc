import { Routes, Route } from 'react-router-dom';
import Nav from './pages/nav/';
import Footer from './pages/footer/';
import { AuthRoute, GuestRoute, IsNotVerify } from './servises/Middleware';
import Auth from './pages/auth';
import Verify from './pages/verify/Verify';
import ChangeRouteScrollToTop from './other/ChangeRouteScrollToTop';
import ProductAll from './pages/Product/ProductAll';
import Product from './pages/Product';
import Error404 from './pages/Error/Error404';

function App() {
    const home = process.env.MIX_REACT_APP_ROUTE_HOME
    const login = process.env.MIX_REACT_APP_ROUTE_LOGIN
    const register = process.env.MIX_REACT_APP_ROUTE_REGISTER
    const logout = process.env.MIX_REACT_APP_ROUTE_LOGOUT
    const otp = process.env.MIX_REACT_APP_ROUTE_OTP
    const reset_password = process.env.MIX_REACT_APP_ROUTE_RESET_PASSWORD
    const verify = process.env.MIX_REACT_APP_ROUTE_VERIFY
    const profile = process.env.MIX_REACT_APP_ROUTE_PROFILE
    const product = process.env.MIX_REACT_APP_ROUTE_PRODUCT;

    return (
        <>
            <div id="appCapsule">

                <ChangeRouteScrollToTop />
                {/* <Nav /> */}

                <Routes>
                    <Route path={home} element={<><div>HOME</div></>} />

                    {/* ========================= AUTH ======================== */}
                    <Route path={login} element={<GuestRoute><Auth page='login' /></GuestRoute>} />
                    <Route path={register} element={<GuestRoute><Auth page='register' /></GuestRoute>} />
                    <Route path={logout} element={<AuthRoute><Auth page='logout' /></AuthRoute>} />
                    <Route path={otp} element={<GuestRoute><Auth page='otp' /></GuestRoute>} />
                    <Route path={reset_password} element={<AuthRoute><Auth page='reset_password' /></AuthRoute>} />

                    <Route path={verify} element={
                        <AuthRoute>
                            <IsNotVerify>
                                <Verify />
                            </IsNotVerify>
                        </AuthRoute>} />

                    <Route path={product}>
                        <Route path=":id/:slug" element={<Product />} />
                        <Route index element={<ProductAll />} />
                    </Route>

                    <Route path='*' element={<Error404 />} />
                </Routes>

                {/* <Footer /> */}
            </div>
        </>
    );
}

export default App;
