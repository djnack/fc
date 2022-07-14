import { useState } from "react";
import Validate from "../../validate";
import ConvertNumberToEnglish from './../../other/ConvertNumberToEnglish';
import { Post } from "../../servises/Request";
import moment from 'jalali-moment';
import { useNavigate } from 'react-router-dom';
import { setVerify } from "../../servises/ServisesVerify";

function VerifyPersonal() {

    let navigate = useNavigate()

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [id_cart, setId_cart] = useState('')
    const [id_passport, setId_passport] = useState('')
    const [parent_name, setParent_name] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [sex, setSex] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="section full mt-2 mb-2">
                <div className="wide-block pb-1 pt-2">
                    <form onSubmit={(e) => submitVerifyPersonal(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">نام</label>
                                <input onChange={e => setFirst_name(ConvertNumberToEnglish(e.target.value))} value={first_name} type="text" className="form-control" id="first_name" placeholder="نام" autoComplete="off" />
                            </div>
                            {error.firstName && <div className="alert alert-danger mb-1">{error.firstName}</div>}
                        </div>
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">نام خانوادگی</label>
                                <input onChange={e => setLast_name(ConvertNumberToEnglish(e.target.value))} value={last_name} type="text" className="form-control" id="last_name" placeholder="نام خانولدگی" autoComplete="off" />
                            </div>
                            {error.lastName && <div className="alert alert-danger mb-1">{error.lastName}</div>}
                        </div>
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">نام پدر</label>
                                <input onChange={e => setParent_name(ConvertNumberToEnglish(e.target.value))} value={parent_name} type="text" className="form-control" id="name_parent" placeholder="نام پدر" autoComplete="off" />
                            </div>
                            {error.parentName && <div className="alert alert-danger mb-1">{error.parentName}</div>}
                        </div>
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">کد ملی</label>
                                <input onChange={e => setId_cart(ConvertNumberToEnglish(e.target.value))} value={id_cart} type="text" className="form-control" id="id_cart" placeholder="کد ملی" autoComplete="off" />
                            </div>
                            {error.idCart && <div className="alert alert-danger mb-1">{error.idCart}</div>}
                        </div>
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">شماره شناسنامه</label>
                                <input onChange={e => setId_passport(ConvertNumberToEnglish(e.target.value))} value={id_passport} type="text" className="form-control" id="id_passport" placeholder="شماره شناسنامه" autoComplete="off" />
                            </div>
                            {error.idPassport && <div className="alert alert-danger mb-1">{error.idPassport}</div>}
                        </div>
                        <div className="form-group boxed">
                            <div className="input-wrapper">
                                <label className="form-label">جنسیت</label>
                                <select onChange={e => setSex(ConvertNumberToEnglish(e.target.value))} value={sex} className="form-control form-select" id="sex">
                                    <option key='l5' value=''>انتخاب کنید</option>
                                    <option key='ll' value="1">مرد</option>
                                    <option key='ll5' value="0">زن</option>
                                </select>
                            </div>
                            {error.sex && <div className="alert alert-danger mb-1">{error.sex}</div>}
                        </div>
                        <div className="row mb-10">
                            <label className="form-label my-3">تاریخ تولد</label>
                            <div className="col-12 col-sm-4">
                                <div className="form-group boxed">
                                    <div className="input-wrapper">
                                        <label className="form-label">روز</label>
                                        <select onChange={e => setDay(ConvertNumberToEnglish(e.target.value))} value={day} className="form-control form-select" id="day">
                                            <option key='a0' value=''>انتخاب کنید</option>
                                            {[...Array(31).keys()].map((e) => { return option(e + 1, 'a') })}
                                        </select>
                                    </div>
                                    {error.day && <div className="alert alert-danger mb-1">{error.day}</div>}
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="form-group boxed">
                                    <div className="input-wrapper">
                                        <label className="form-label">ماه</label>
                                        <select onChange={e => setMonth(ConvertNumberToEnglish(e.target.value))} value={month} className="form-control form-select" id="month">
                                            <option key='b0' value=''>انتخاب کنید</option>
                                            {[...Array(12).keys()].map((e) => { return option(e + 1, 'b') })}
                                        </select>
                                    </div>
                                    {error.month && <div className="alert alert-danger mb-1">{error.month}</div>}
                                </div>
                            </div>
                            <div className="col-12 col-sm-4">
                                <div className="form-group boxed">
                                    <div className="input-wrapper">
                                        <label className="form-label">سال</label>
                                        <select onChange={e => setYear(ConvertNumberToEnglish(e.target.value))} value={year} className="form-control form-select" id="year">
                                            <option key='c0' value=''>انتخاب کنید</option>
                                            {[...Array(101).keys()].map((e) => { return option(1400 - e, 'c') })}
                                        </select>
                                    </div>
                                    {error.year && <div className="alert alert-danger mb-1">{error.year}</div>}
                                </div>
                            </div>
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

    function submitVerifyPersonal(e) {
        e.preventDefault();

        if (loader) {
            setError({});
            setLoader(0);

            let VerifyPersonal = Validate(
                [
                    [first_name, 'required', 'string', 'min:3', 'persianAlphabet'],
                    {
                        firstName_required: process.env.MIX_REACT_APP_FIRST_NAME_REQUIRED,
                        firstName_persianAlphabet: process.env.MIX_REACT_APP_PERSIAN_ALPHABET,
                        firstName_min: process.env.MIX_REACT_APP_FIRST_NAME_MIN,
                    }
                ],
                [
                    [last_name, 'required', 'string', 'min:3', 'persianAlphabet'],
                    {
                        lastName_required: process.env.MIX_REACT_APP_LAST_NAME_REQUIRED,
                        lastName_persianAlphabet: process.env.MIX_REACT_APP_PERSIAN_ALPHABET,
                        lastName_min: process.env.MIX_REACT_APP_LAST_NAME_MIN,
                    }
                ],
                [
                    [parent_name, 'required', 'string', 'min:3', 'persianAlphabet'],
                    {
                        parentName_required: process.env.MIX_REACT_APP_PARENT_NAME_REQUIRED,
                        parentName_persianAlphabet: process.env.MIX_REACT_APP_PERSIAN_ALPHABET,
                        parentName_min: process.env.MIX_REACT_APP_PARENT_NAME_MIN,
                    }
                ],
                [
                    [id_cart, 'required', 'numeric', 'min:10', 'max:10'],
                    {
                        idCart_required: process.env.MIX_REACT_APP_ID_CART_REQUIRED,
                        idCart_numeric: process.env.MIX_REACT_APP_CODE_NUMBER,
                        idCart_min: process.env.MIX_REACT_APP_ID_CART_MIN,
                        idCart_max: process.env.MIX_REACT_APP_ID_CART_MIN,
                    }
                ],
                [
                    [id_passport, 'required', 'numeric', 'max:10'],
                    {
                        idPassport_required: process.env.MIX_REACT_APP_ID_PASSPORT_REQUIRED,
                        idPassport_numeric: process.env.MIX_REACT_APP_CODE_NUMBER,
                        idPassport_max: process.env.MIX_REACT_APP_ID_PASSPORT_MIN,
                    }
                ],
                [
                    [sex, 'required'],
                    {
                        sex_required: process.env.MIX_REACT_APP_SEX_REQUIRED,
                    }
                ],
                [
                    [day, 'required'],
                    {
                        day_required: process.env.MIX_REACT_APP_DAY_REQUIRED
                    }
                ],
                [
                    [month, 'required'],
                    {
                        month_required: process.env.MIX_REACT_APP_MONTH_REQUIRED
                    }
                ],
                [
                    [year, 'required'],
                    {
                        year_required: process.env.MIX_REACT_APP_YEAR_REQUIRED
                    }
                ],
            );

            setError(VerifyPersonal);
            if (!Object.keys(VerifyPersonal).length) {

                const birth_day = moment.from(`${year}/${month}/${day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');

                Post('verify_personal', {
                    first_name,
                    last_name,
                    id_cart,
                    id_passport,
                    parent_name,
                    sex,
                    birth_day
                }).then((res) => {
                    if (res['status'] === 201) {
                        if ("data" in res) {
                            return navigate(`/${res.data.next_page}`, { state: { page: res.data.part } })
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

export default VerifyPersonal;