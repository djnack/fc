import Price from './Details/Price';

function ProductPrice({ data }) {
    return (<>
        <div className="section full">
            <div className="wide-block pt-2 pb-2 product-detail-header">
                <h1 className="title">{data.title}</h1>
                <div className="text">{data.location}</div>
                <div className="detail-footer">
                    <Price data={data} />
                </div>

                {
                    data.btn_buy === 'buy' &&
                    <div className='fix-buy'>
                        {data.btn_buy === 'coming soon' && <button className="btn btn-warning w-85 ms-1">به زودی</button>}
                        {data.btn_buy === 'buy' && <button className="btn btn-primary w-85 ms-1">خرید <i className="bi bi-cart-plus my-0"></i></button>}
                        <a href='#comments' className="btn btn-primary w-10"><i className="bi bi-chat-square-text m-0"></i></a>
                    </div>
                }


            </div>
        </div>


    </>);
}

export default ProductPrice;