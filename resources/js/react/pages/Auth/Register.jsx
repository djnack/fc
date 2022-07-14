import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ConvertNumberToEnglish from "../../other/ConvertNumberToEnglish";
import { Post } from "../../servises/Request";
import Validate from "../../validate";

function Register() {
    let navigate = useNavigate()
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="login-form">
                <div className="section">
                    <h1>ثبت نام</h1>
                </div>
                <div className="section mt-10 mb-5">
                    <form onSubmit={(e) => SubmitRegister(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setPhone(ConvertNumberToEnglish(e.target.value))} value={phone} type="text" className="form-control" id="phone" placeholder="موبایل" />
                            </div>
                        </div>
                        {error.phone && <div className="alert alert-danger mb-1">{error.phone}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setPassword(ConvertNumberToEnglish(e.target.value))} value={password} type="password" className="form-control" id="password1" autoComplete="off" placeholder="گذرواژه" />
                            </div>
                        </div>
                        {error.password && <div className="alert alert-danger mb-1">{error.password}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setPasswordConfirmation(ConvertNumberToEnglish(e.target.value))} value={passwordConfirmation} type="password" className="form-control" id="password2" autoComplete="off" placeholder="تکرار گذرواژه" />
                            </div>
                        </div>
                        {error.passwordConfirmation && <div className="alert alert-danger mb-1">{error.passwordConfirmation}</div>}
                        <div className="form-button-group">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {loader ? 'ثبت نام' : <div className='spinner-border'></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>);

    function SubmitRegister(e) {
        e.preventDefault();
        if (loader) {
            setLoader(0);

            setError({});

            let validate_register = Validate(
                [
                    [phone, 'required', 'phoneNumber'],
                    {
                        phone_required: process.env.MIX_REACT_APP_PHONE_REQUIRED,
                        phone_phoneNumber: process.env.MIX_REACT_APP_PHONE_NUMBER,

                    }
                ],
                [
                    [password, 'required', 'min:8'],
                    {
                        password_required: process.env.MIX_REACT_APP_PASSWORD_REQUIRED,
                        password_min: process.env.MIX_REACT_APP_PASSWORD_MIN,
                    }
                ],
                [
                    [passwordConfirmation, 'required', 'confirmed'],
                    {
                        passwordConfirmation_required: process.env.MIX_REACT_APP_PASSWORD_CONFIRMATION,
                        passwordConfirmation_confirmed: process.env.MIX_REACT_APP_PASSWORD_CONFIRMATION,
                    }
                ]
            );

            setError(validate_register);

            if (!Object.keys(validate_register).length) {

                Post('register', { phone, password, password_confirmation: passwordConfirmation }).then((res) => {
                    if (res['status'] === 201) {
                        if ("data" in res) {
                            if ("page" in res.data) {
                                return navigate(`/${res.data.page}`, { state: { phone } })
                            }
                        }
                    } else if (res.response) {
                        if (res.response.status === 422) {
                            setError({ phone: res.response.data.errors.phone[0] })
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
}

export default Register;
