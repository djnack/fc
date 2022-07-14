import VerifyPersonal from "./VerifyPersonal";
import { useLocation } from "react-router-dom";
import VerifyInsurance from "./VerifyInsurance";
import VerifyPhysical from "./VerifyPhysical";
import HeaderVerify from './HeaderVerify';

function Verify() {
    const location = useLocation();
    return (<>
        <HeaderVerify />
        {location.state.page === 'verify_personal' && <VerifyPersonal />}
        {location.state.page === 'verify_insurance' && <VerifyInsurance />}
        {location.state.page === 'verify_physical' && <VerifyPhysical />}
        
    </>);
}

export default Verify;