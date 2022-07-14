function ProductDetail({text}) {
    return (<>
        <div className="section full mt-2">
            <div className="section-title">جزییات سفر</div>
            <div className="wide-block pt-2 pb-2">
                {text}
            </div>
        </div>
    </>);
}

export default ProductDetail;