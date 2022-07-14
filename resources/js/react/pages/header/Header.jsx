import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NameHeader from "./NameHeader";

const login = process.env.MIX_REACT_APP_ROUTE_LOGIN;
const register = process.env.MIX_REACT_APP_ROUTE_REGISTER;

const nameAndLink = {};
nameAndLink[login] = {
    name: "ثبت نام",
    link: register,
};
nameAndLink[register] = {
    name: "ورود",
    link: login,
};

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const verify = process.env.MIX_REACT_APP_ROUTE_VERIFY

    const [locationOld, setLocationOld] = useState("");
    const [locationHistory, setLocationHistory] = useState("");

    useEffect(() => {
        setLocationHistory(locationOld);
        setLocationOld(location.pathname);
    }, [location]);

    const not = [verify];
    if (!not.includes(location.pathname)) {
        return (
            <>
                <div className="appHeader no-border transparent position-absolute">
                    <div className="left">
                        <a
                            onClick={() => changeLocation()}
                            className="headerButton goBack"
                        >
                            <ion-icon name="chevron-back-outline"></ion-icon>
                        </a>
                    </div>
                    <div className="pageTitle"></div>
                    {nameAndLink[location.pathname] ? (
                        <NameHeader data={nameAndLink[location.pathname]} />
                    ) : (
                        ""
                    )}
                </div>
            </>
        );
    }

    function changeLocation() {
        locationHistory ? navigate(-1) : navigate("/");
    }
}
