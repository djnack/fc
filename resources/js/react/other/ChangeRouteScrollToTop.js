import { useLocation } from "react-router-dom";
//
function ChangeRouteScrollToTop() {
    const location = useLocation();
    window.scrollTo(0, 0);
}

export default ChangeRouteScrollToTop;
