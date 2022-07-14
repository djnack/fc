import { useLocation } from 'react-router-dom';

function HeaderVerify() {
    const location = useLocation();
    return (<>
        <div className="mt-2">
            <div className="form-wizard-section">
                <div className={`button-item ${location.state.page === 'verify_personal' && 'active'}`}>
                    <strong>1</strong>
                    <p>مشخصات</p>
                </div>
                <div className={`button-item ${location.state.page === 'verify_insurance' && 'active'}`}>
                    <strong>2</strong>
                    <p>بیمه</p>
                </div>
                <div className={`button-item ${location.state.page === 'verify_physical' && 'active'}`}>
                    <strong>3</strong>
                    <p>سلامتی</p>
                </div>
            </div>
        </div>
    </>);
}

export default HeaderVerify;