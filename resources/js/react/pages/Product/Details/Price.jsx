import { useState, useEffect } from 'react';

function Price({ data, classs='' }) {

    const [membership, setMembership] = useState(data.membership);
    const [prices, setPrices] = useState(data.prices);
    const [priceDefault, setPriceDefault] = useState('');
    const [priceMembership, setPriceMembership] = useState('');
    const [del, setDel] = useState(false);

    useEffect(() => {
        if (prices.length === 0) {
            setPriceDefault(convetToman(0));
            setPrices(false);
        } else if (prices) {
            if (Object.keys(prices)[0] === membership) {
                setPriceDefault(convetToman(prices[membership]));
                setPriceMembership(convetToman(prices[Object.keys(prices)[1]]));
            } else {
                setDel(true);
                setPriceDefault(convetToman(prices[Object.keys(prices)[0]]));
                setPriceMembership(convetToman(prices[membership]));
            }
        }
    }, ['prices']);

    return (<>
        {!prices && <div className={`h-52 ${classs}`}>{priceDefault}</div>}
        {prices &&
            <div>
                <div className={`price  mb-1 ${classs}`}>{priceMembership} <small className='text'>
                    {!del && 'اعضای باشگاه'}
                    {del && 'برای شما'}
                </small></div>
                {!del && <div className={`price ${classs}`}>{priceDefault} <small className='text'>مهمان</small></div>}
                {del && <del className={`price ${classs}`}><small className='text'>{priceDefault} مهمان</small></del>}
            </div>
        }
    </>);

    function convetToman(x) {
        if (!x) {
            return 'رایگان';
        } else {
            return x.toLocaleString() + ' تومان';
        }
    }
}

export default Price;