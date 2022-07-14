import { Link } from 'react-router-dom';


function NameHeader(params) {
    return (<>
        <div className="right">
            <Link to={params.data.link} href="page-login.html" className="headerButton">
                {params.data.name}
            </Link>
        </div>
    </>);
}

export default NameHeader;