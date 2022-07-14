import './style.css';

function Loader() {
    return (<>

        <div id="loader">
            <svg>
                <circle cx="57" cy="57" r="25" className="circle" />
                <circle cx="57" cy="57" r="25" className="loader" />
            </svg>
        </div>
    </>);
}

export default Loader;