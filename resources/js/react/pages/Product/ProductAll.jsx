import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { Post } from "../../servises/Request";
import Paginate from '../../other/paginate';
import CartFack from './CartFack';
import Cart from './Cart';
import GetQueryURL from '../../other/GetQueryURL';

function ProductAll() {
    let navigate = useNavigate();

    const product = process.env.MIX_REACT_APP_ROUTE_PRODUCT;

    const [isLoading, setIsLoading] = useState(true);
    const [paginate, setPaginate] = useState({});
    const [changePaginate, setChangePaginate] = useState(GetQueryURL('page')||1);
    const [data, setData] = useState({});

    useEffect(() => {
        if (isLoading && !data[0]) {
            Post('products', { page: changePaginate }).then(res => {
                setData(res.data);
                setPaginate(res.paginate);
                setIsLoading(false);
            });
        }
    }, [isLoading])

    useEffect(() => {
        if (!isLoading) {
            setPaginate({ ...paginate, currentPage: changePaginate });
            setIsLoading(true);
            Post('products', { page: changePaginate }).then(res => {
                setData(res.data);
                setPaginate(res.paginate);
                setIsLoading(false);
                return navigate(`${product}?page=${changePaginate}`)
            });
        }
    }, [changePaginate])

    return (<>
            <div className="section mt-2 mb-3">
                <div className="section-title">Card Example</div>
                <div className="row">
                    {isLoading ?
                        Array(12).fill({}).map(() => {
                            return <CartFack key={Math.random()} />
                        }) :
                        data.map(e => <Cart data={e} key={Math.random()} />)
                    }
                </div>
                {paginate['lastPage'] > 1 && <Paginate paginate={paginate} setChangePaginate={setChangePaginate} />}
            </div>
    </>);     
}

export default ProductAll;