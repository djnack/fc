import { useState } from "react";
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import ConvertNumberToEnglish from "../../other/ConvertNumberToEnglish";
import { Post } from "../../servises/Request";
import { setVerify } from "../../servises/ServisesVerify";
import { setToken } from "../../servises/Token";
import Validate from "../../validate";

function OTP({ phone }) {
    const reset_password = process.env.MIX_REACT_APP_ROUTE_RESET_PASSWORD
    const verify = process.env.MIX_REACT_APP_ROUTE_VERIFY

    let location = useLocation()

    if (location.state === null) {
        return <Navigate to="/login" />
    }

    let navigate = useNavigate()
    const [code, setCode] = useState('')
    const [error, setError] = useState({})
    const [off, setOff] = useState(0)
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="login-form">
                <div className="section">
                    <h1>تایید پیامک</h1>
                </div>
                <div className="section mt-2 mb-5">
                    <form onSubmit={(e) => SubmitOTP(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <input onChange={e => setCode(ConvertNumberToEnglish(e.target.value))} value={code} type="text" autoFocus className="form-control verify-input" id="code" placeholder="000000" maxLength="6" />
                                {error.code && <div className="alert alert-danger mb-1">{error.code}</div>}

                            </div>
                        </div>
                        <div className="form-button-group">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {loader ? 'تایید' : <div className='spinner-border'></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>);
    function SubmitOTP(e) {
        e.preventDefault();
        if (!off && loader) {
            setError({});
            setLoader(0);

            let validate_otp = Validate(
                [
                    [code, 'required', 'numeric', 'min:6', 'max:6'],
                    {
                        code_required: process.env.MIX_REACT_APP_CODE_REQUIRED,
                        code_numeric: process.env.MIX_REACT_APP_CODE_NUMBER,
                        code_min: process.env.MIX_REACT_APP_CODE_MIN,
                        code_max: process.env.MIX_REACT_APP_CODE_MIN,
                    }
                ]
            );

            setError(validate_otp);

            if (!Object.keys(validate_otp).length) {
                Post('otp', { phone: location.state.phone, code }).then((res) => {
                    if (res['status'] === 201) {
                        if ("data" in res) {
                            if ("token" in res.data) {
                                setToken(res.data.token)
                                if(res.data.verify){
                                    setVerify()
                                }
                                if ('resetPassword' in location.state) {
                                    return navigate(reset_password)
                                }
                                return navigate(verify, { state: { page: 'verify_personal' } })
                            }
                        }
                    } else if (res.response) {
                        if (res.response.status === 401) {
                            let text = res.response.data.errors.code
                            if (res.response.data.try !== undefined) {
                                text += ` ${res.response.data.try} ${process.env.MIX_REACT_APP_CODE_TRY}`
                            } else {
                                setOff(1)
                            }
                            setError({ code: text })
                        } else if (res.response.status === 500) {
                            setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                        }
                        setLoader(1);
                    }
                })
            } else{
                setLoader(1);
            }
        }
    }
}

export default OTP;
