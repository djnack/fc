import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ConvertNumberToEnglish from "../../other/ConvertNumberToEnglish";
import { Post } from "../../servises/Request";
import { setToken } from "../../servises/Token";
import { setVerify } from "../../servises/ServisesVerify";
import Validate from "../../validate";

function Login() {
    let navigate = useNavigate()
    const otp = process.env.MIX_REACT_APP_ROUTE_OTP
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="login-form">
                <div className="section">
                    <h1>ورود</h1>
                </div>
                <div className="section mt-10 mb-5">
                    <form onSubmit={(e) => SubmitLogin(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setPhone(ConvertNumberToEnglish(e.target.value))} value={phone} type="text" className="form-control" id="phone" autoComplete="off" placeholder="موبایل" />
                            </div>
                        </div>
                        {error.phone && <div className="alert alert-danger mb-1">{error.phone}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setPassword(ConvertNumberToEnglish(e.target.value))} value={password} type="password" className="form-control" id="password" autoComplete="off" placeholder="گذرواژه" />
                            </div>
                        </div>
                        {error.password && <div className="alert alert-danger mb-1">{error.password}</div>}
                        <div className="form-links mt-2">
                            <a onClick={(e) => { forgetPassword() }} className="text-muted">فراموشی گذرواژه</a>
                        </div>
                        <div className="form-button-group">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {loader ? 'ورود' : <div className='spinner-border'></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>);

    function forgetPassword() {
        if (loader) {
            setError({});

            setLoader(0);

            let validate_login = Validate(
                [
                    [phone, 'required', 'phoneNumber'],
                    {
                        phone_required: process.env.MIX_REACT_APP_PHONE_NUMBER_RESET,
                        phone_phoneNumber: process.env.MIX_REACT_APP_PHONE_NUMBER,
                    }
                ]
            );
            setError(validate_login);

            if (!Object.keys(validate_login).length) {
                Post('resend_otp', { phone }).then((res) => {
                    if (res['status'] === 201) {
                        return navigate(otp, { state: { phone, resetPassword: true } })
                    } else if (res.response) {
                        if (res.response.status === 401 || res.response.status === 422) {
                            setError({ phone: res.response.data.errors.otp })
                        } else if (res.response.status === 500) {
                            setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                        }
                        setLoader(1);
                    }
                })
            } else {
                setLoader(1);
            }
        }
    }

    function SubmitLogin(e) {
        e.preventDefault();
        if (loader) {
            setLoader(0);

            setError({});

            let validate_login = Validate(
                [
                    [phone, 'required', 'phoneNumber'],
                    {
                        phone_required: process.env.MIX_REACT_APP_PHONE_REQUIRED,
                        phone_phoneNumber: process.env.MIX_REACT_APP_PHONE_NUMBER,
                    }
                ],
                [
                    [password, 'required'],
                    {
                        password_required: process.env.MIX_REACT_APP_PASSWORD_REQUIRED,
                    }
                ],
            );

            setError(validate_login);

            if (!Object.keys(validate_login).length) {
                Post('login', { phone, password }).then((res) => {
                    if (res['status'] === 200) {
                        if ("data" in res) {
                            if ("next_page" in res.data) {
                                if (res.data.next_page === 'otp') {
                                    return navigate(otp, { state: { phone } })
                                } else {
                                    setToken(res.data.token)
                                    if (res.data.next_page === 'profile') {
                                        setVerify()
                                    }
                                    return navigate(`/${res.data.next_page}`, { state: { page: res.data.part } })
                                }
                            }
                        }
                    } else if (res.response) {
                        if (res.response.status === 401 || res.response.status === 422) {
                            setError({ phone: res.response.data.errors.phone })
                        } else if (res.response.status === 500) {
                            setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                        }
                        setLoader(1)
                    }
                })
            } else {
                setLoader(1)
            }
        }
    }
}

export default Login;
