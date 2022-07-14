import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import Price from './Details/Price';

function Cart({ data }) {

    const product = process.env.MIX_REACT_APP_ROUTE_PRODUCT;

    const navigate = useNavigate();

    const [link, setLink] = useState(`${product}/${data.id}/${data.slug}`);

    return (<>
        <div className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6">
            <div className="card my-4">
                <Link to={link}>
                    <img src={data.thumbnail.path} className="card-img-top" alt={data.thumbnail.alt} />
                </Link>
                <div className="card-body cart-item">
                    {data.location &&
                        <div className='page-title'>
                            <h6 className="card-subtitle">{data.location}</h6>
                        </div>
                    }
                    {data.bought &&
                        <div className="chip chip-outline chip-success h-18">
                            <small className="chip-label h-17">خریده اید</small>
                        </div>
                    }
                    <Link to={link}>
                        <h5 className="card-title">{data.title}</h5>
                    </Link>
                    <p className="card-text">{data.description}</p>
                    <div className="cart-item-footer">

                        <Price data={data} classs={'mx-3'} />

                        {data.btn_buy === 'coming soon' && <Link to={link} className="btn btn-warning btn-sm mx-3">به زودی</Link>}
                        {data.btn_buy === 'cancel' && <Link to={link} className="btn btn-primary btn-sm mx-3">نمایش</Link>}
                        {data.btn_buy === 'buy' && <button type="button" className="btn btn-success btn-sm mx-3">خرید</button>}

                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default Cart;
