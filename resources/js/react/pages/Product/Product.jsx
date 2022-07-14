import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import { Post } from "../../servises/Request";
import Error404 from './../Error/Error404';
import Loader from '../../other/loader';
import Comment from '../../other/Comment';
import ProductDetail from './ProductDetail';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import Validate from '../../validate';

function Product() {

    const product = process.env.MIX_REACT_APP_ROUTE_PRODUCT;

    const navigate = useNavigate();

    const params = useParams();
    const id = params.id;
    const [slug, setSlug] = useState(params.slug);
    const [isLoading, setIsLoading] = useState(true);
    const [error404, setError404] = useState(false);
    const [data, setData] = useState({});

    useEffect(() => {
        if (isLoading) {

            let validate_id = Validate(
                [
                    [id, 'decimal'], {
                        'id_decimal': 's'
                    }
                ]
            );

            if (!Object.keys(validate_id).length) {
                Post('product', { id }).then(res => {
                    if (res['status'] === 200) {
                        if ("data" in res) {
                            setData(res.data);
                            // if (data.slug !== slug || slug === undefined) return navigate(`${product}/${id}/${data.slug}`)
                        }
                    } else if (res.response) {
                        if (res.response.status === 404) {
                            setError404(true);
                        } else if (res.response.status === 500) {
                            // setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                        }
                    }
                    setIsLoading(false);
                });
            } else {
                setError404(true);
                setIsLoading(false);
            }
        }
    }, [isLoading])

    return (<>
        {isLoading ?
            <Loader /> :
            error404 ? <Error404 /> :
                <>
                    <ProductImage images={data.images}/>
                    <ProductPrice data={data} />
                    <ProductDetail  text={data.text}/>
                    <Comment />
                    <ProductDetail  text={data.text}/>
                </>

        }
    </>);
}

export default Product;
