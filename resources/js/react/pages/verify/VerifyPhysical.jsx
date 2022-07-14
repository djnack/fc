import { useState } from "react";
import Validate from "../../validate";
import ConvertNumberToEnglish from './../../other/ConvertNumberToEnglish';
import { Post } from "../../servises/Request";
import moment from 'jalali-moment';
import { setVerify } from "../../servises/ServisesVerify";
import { useNavigate } from 'react-router-dom';
import { ToastCenterTapToClose } from './../../other/Toast';

export default function VerifyPhysical() {

    let navigate = useNavigate()

    const [disease, setDisease] = useState('') // بیماری خاص
    const [checkdisease, setCheckdisease] = useState(false)
    const [alertdisease, setAlertdisease] = useState(false)
    const [medicine, setMedicine] = useState('') // مصرف دارو
    const [checkmedicine, setCheckmedicine] = useState(false)
    const [alertmedicine, setAlertmedicine] = useState(false)
    const [sensitivity, setSensitivity] = useState('') // حساسیت به دارو
    const [checksensitivity, setChecksensitivity] = useState(false)
    const [alertsensitivity, setAlertsensitivity] = useState(false)
    const [bloodType, setBloodType] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="section full mt-2 mb-2">
                <div className="wide-block pb-1 pt-2">
                    <form onSubmit={(e) => submitVerifyPhysical(e)}>
                        <p>
                            <small>اطلاعات وارد شده در این قسمت در اختیار پزشک گروه قرار میگیره تا بتونه در شرایط بحرانی بهترین کمک رو به شما انجام بده.</small>
                        </p>
                        <p>
                            <small>برای مثال: اگه دارو خاصی مصرف میکنین، که به صورت عادی در کیف کمک های اولیه پزشک موجود نیست، باشگاه اون دارو رو تهیه کرده و در اختیار پزشک قرار میده تا در شرایط بحران بهتون کمک کنه.</small>
                        </p>
                        <p>
                            <small>یا اگه به دارویی خاصی حساسیت شدیدی دارید پزشک از اون دارو ها برای درمان شما استفاده نمیکند.</small>
                        </p>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}

                        <div className="my-3 mt-8">
                            <div className="form-check">
                                <input onChange={() => setCheckdisease(!checkdisease)} checked={checkdisease} type="checkbox" className="form-check-input" id="customCheckb1" />
                                <label className="form-check-label" htmlFor="customCheckb1">بیماری خاص</label>
                            </div>
                        </div>
                        {checkdisease &&
                            <div className="form-group boxed">
                                <div className="input-wrapper">
                                    <label className="form-label">نام بیماری ها
                                        <ion-icon onClick={() => { setAlertdisease(1) }} name="information-circle"></ion-icon>
                                    </label>
                                    <textarea onChange={e => setDisease(ConvertNumberToEnglish(e.target.value))} value={disease} type="text" className="form-control" id="disease" autoComplete="off" />
                                </div>
                            </div>
                        }
                        <ToastCenterTapToClose text=' مثال : اگه مشکل قلبی دارید یا آسم، فاویسم و ...' show={alertdisease} setShow={setAlertdisease} />

                        <div className="my-3">
                            <div className="form-check">
                                <input onChange={() => setCheckmedicine(!checkmedicine)} checked={checkmedicine} type="checkbox" className="form-check-input" id="customCheckb2" />
                                <label className="form-check-label" htmlFor="customCheckb2">مصرف دارو</label>
                            </div>
                        </div>
                        {checkmedicine &&
                            <div className="form-group boxed">
                                <div className="input-wrapper">
                                    <label className="form-label">نام داروها
                                        <ion-icon onClick={() => { setAlertmedicine(1) }} name="information-circle"></ion-icon>
                                    </label>
                                    <textarea onChange={e => setMedicine(ConvertNumberToEnglish(e.target.value))} value={medicine} type="text" className="form-control" id="disease" autoComplete="off" />
                                </div>
                            </div>
                        }
                        <ToastCenterTapToClose text='مثال : اگه مشکل قلبی دارید داروهایی که مصرف میکنید را وارد کنید' show={alertmedicine} setShow={setAlertmedicine} />

                        <div className="my-3">
                            <div className="form-check">
                                <input onChange={() => setChecksensitivity(!checksensitivity)} checked={checksensitivity} type="checkbox" className="form-check-input" id="customCheckb3" />
                                <label className="form-check-label" htmlFor="customCheckb3">حساسیت به دارو</label>
                            </div>
                        </div>
                        {checksensitivity &&
                            <div className="form-group boxed mb-3">
                                <div className="input-wrapper">
                                    <label className="form-label">نام داروها
                                        <ion-icon onClick={() => { setAlertsensitivity(1) }} name="information-circle"></ion-icon>
                                    </label>
                                    <textarea onChange={e => setSensitivity(ConvertNumberToEnglish(e.target.value))} value={sensitivity} type="text" className="form-control" id="disease" autoComplete="off" />
                                </div>
                            </div>
                        }
                        <ToastCenterTapToClose text='مثال : اگه به داروهای کدئیندار حساسیت یا سایر دارو ها' show={alertsensitivity} setShow={setAlertsensitivity} />

                        <div className="form-group boxed mb-10">
                            <div className="input-wrapper">
                                <label className="form-label">گروه خونی</label>
                                <select onChange={e => setBloodType(e.target.value)} value={bloodType} className="form-control form-select" id="blood-type">
                                    <option key='AA' value=''>انتخاب کنید</option>
                                    <option key='A+' value="A+">A+</option>
                                    <option key='A-' value="A-">A-</option>
                                    <option key='B+' value="B+">B+</option>
                                    <option key='B-' value="B-">B-</option>
                                    <option key='AB+' value="AB+">AB+</option>
                                    <option key='AB-' value="AB-">AB-</option>
                                    <option key='O+' value="O+">O+</option>
                                    <option key='O-' value="O-">O-</option>
                                </select>
                            </div>
                            {error.bloodType && <div className="alert alert-danger mb-1">{error.bloodType}</div>}
                        </div>
                        <div className="form-button-group">
                            <button type="submit" className="btn btn-primary btn-block btn-lg">
                                {loader ? 'ثبت' : <div className='spinner-border'></div>}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
    </>);

    function option(x, y) {
        return <option key={y.x} value={x}>{x}</option>

    }

    function submitVerifyPhysical(e) {
        e.preventDefault();
        if (loader) {
            setError({});
            setLoader(0);

            let VerifyPhysical = Validate(
                [
                    [bloodType, 'required'],
                    {
                        bloodType_required: process.env.MIX_REACT_APP_BLOOD_TYPE_REQUIRED,
                    }
                ]
            );

            setError(VerifyPhysical);
            if (!Object.keys(VerifyPhysical).length) {
                Post('verify_physical', {
                    disease,
                    medicine,
                    sensitivity,
                    blood_type: bloodType,
                }).then((res) => {
                    if (res['status'] === 201) {
                        if ("data" in res) {
                            setVerify();
                            return navigate(`/${res.data.next_page}`)
                        }
                    } else if (res.response) {
                        if (res.response.status === 302) {
                            if (res.response.data.data.is_verify) {
                                setVerify();
                            }
                            return navigate(`/${res.response.data.data.next_page}`, { state: { page: res.response.data.data.part } })
                        } else if (res.response.status === 401 || res.response.status === 422) {
                            setError({ idCart: res.response.data.errors.id_cart[0] })
                        } else if (res.response.status === 500) {
                            setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                        }
                    }
                    setLoader(1);
                })
            } else {
                setLoader(1);
            }
        }
    }
}
