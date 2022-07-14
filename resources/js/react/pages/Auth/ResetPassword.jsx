import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import ConvertNumberToEnglish from "../../other/ConvertNumberToEnglish";
import { Post } from "../../servises/Request";
import Validate from "../../validate";

function ResetPassword() {

    let navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="login-form">
                <div className="section">
                    <h1>تغییر گذرواژه</h1>
                </div>
                <div className="section mt-10 mb-5">
                    <form onSubmit={(e) => SubmitResetRegister(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
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
                                {loader ? 'ثبت' : <div className='spinner-border'></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>);

    function SubmitResetRegister(e) {
        e.preventDefault();
        if (loader) {
            setLoader(0);

            setError({});

            let validate_reset_register = Validate(
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

            setError(validate_reset_register);
            if (!Object.keys(validate_reset_register).length) {
                Post('reset_password', { password, password_confirmation: passwordConfirmation }).then((res) => {
                    if (res['status'] === 201) {
                        if ("data" in res) {
                            if ("next_page" in res.data) {
                                return navigate(`/${res.data.next_page}`, { state: { page: res.data.part} })
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

export default ResetPassword;
