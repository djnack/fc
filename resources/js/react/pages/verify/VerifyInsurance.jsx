import { useState } from "react";
import Validate from "../../validate";
import ConvertNumberToEnglish from './../../other/ConvertNumberToEnglish';
import { Post } from "../../servises/Request";
import moment from 'jalali-moment';
import { useNavigate } from 'react-router-dom';
import { setVerify } from "../../servises/ServisesVerify";

function VerifyInsurance() {
    let navigate = useNavigate()

    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [image, setImage] = useState('')
    const [error, setError] = useState({})
    const [loader, setLoader] = useState(1)

    return (<>
            <div className="section full mt-2 mb-2">
                <div className="wide-block pb-1 pt-2">
                    <form onSubmit={(e) => submitVerifyInsurance(e)}>
                        {error.server && <div className="alert alert-danger mb-1">{error.server}</div>}
                        <div className="row mb-5">
                            <label className="form-label my-3">تاریخ انقضای بیمه</label>
                            <div className="col-12 col-sm-4">
                                <div className="form-group boxed">
                                    <div className="input-wrapper">
                                        <label className="form-label">روز</label>
                                        <select onChange={e => setDay(ConvertNumberToEnglish(e.target.value))} value={day} className="form-control form-select" id="day">
                                            <option value='' key='a0'>انتخاب کنید</option>
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
                                            <option value='' key='b0'>انتخاب کنید</option>
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
                                            <option value='' key='c0'>انتخاب کنید</option>
                                            {[...Array(11).keys()].map((e) => { return option(moment().format('jYYYY') - 1 + e, 'c') })}
                                        </select>
                                    </div>
                                    {error.year && <div className="alert alert-danger mb-1">{error.year}</div>}
                                </div>
                            </div>
                        </div>
                        {error.image && <div className="alert alert-danger mb-1">{error.image}</div>}
                        <div className="custom-file-upload mb-10" id="fileUpload">
                            <input onChange={e => setImage(e.target.files[0])} type="file" id="fileuploadInput" accept=".png, .jpg, .jpeg" />
                            <label htmlFor="fileuploadInput">
                                <span>
                                    <strong>
                                        <i>آپلود عکس بیمه</i>
                                    </strong>
                                </span>
                            </label>
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

    function submitVerifyInsurance(e) {
        e.preventDefault();

        if (loader) {
            setError({});
            setLoader(0);

            let VerifyInsurance = Validate(
                [
                    [image, 'required', 'max:2048', 'mimes: jpeg , jpg , png '],
                    {
                        image_required: process.env.MIX_REACT_APP_IMAGE_REQUIRED,
                        image_max: process.env.MIX_REACT_APP_IMAGE_MAX,
                        image_mimes: process.env.MIX_REACT_APP_IMAGE_MIMES,
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

            const expired = moment.from(`${year}/${month}/${day}`, 'fa', 'YYYY/MM/DD').format('YYYY/MM/DD');

            if (!Object.keys(VerifyInsurance).length) {
                VerifyInsurance = Validate(
                    [
                        [expired, 'date', 'after:1,day'],
                        {
                            day_after: process.env.MIX_REACT_APP_DAY_AFTER_EXPIRED
                        }
                    ],
                );
            }

            if (!Object.keys(VerifyInsurance).length) {
                VerifyInsurance = Validate(
                    [
                        [expired, 'date', 'after:10,day'],
                        {
                            day_after: process.env.MIX_REACT_APP_DAY_AFTER_EXPIRED_NOW
                        }
                    ],
                );
            }


            setError(VerifyInsurance);
            if (!Object.keys(VerifyInsurance).length) {

                const formData = new FormData();
                formData.append('image', image);
                formData.append('expired', expired);

                Post('verify_insurance', formData).then((res) => {
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

export default VerifyInsurance;