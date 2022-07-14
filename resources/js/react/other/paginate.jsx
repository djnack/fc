import { useState } from 'react';

export default function Paginate(props) {
    const [page, setPage] = useState(props.paginate);
    const [limit, setLimit] = useState(props.limit || 8);

return (<>
        <nav>
            <ul className="pagination">
                {page.currentPage === 1 && <li className="page-item">
                    <p className="page-link bg-secondary px-2">
                        <i className="bi bi-chevron-right"></i>
                    </p></li>}
                {page.currentPage !== 1 && <li className="page-item">
                    <a onClick={() => change(page.currentPage - 1)} className="page-link bg-success px-2">
                        <i className="bi bi-chevron-right"></i>
                    </a></li>}
                {
                    Array(page.lastPage).fill({}).map((e, keyItem) => {
                        return <Item
                            index={keyItem + 1}
                            lastPage={page.lastPage}
                            currentPage={page.currentPage}
                            limit={limit}
                            change={change}
                            key={Math.random()} />
                    })
                }
                {page.currentPage == page.lastPage && <li className="page-item">
                    <p className="page-link bg-secondary px-2">
                        <i className="bi bi-chevron-left"></i>
                    </p></li>}
                {page.currentPage !== page.lastPage && <li className="page-item">
                    <a onClick={() => change(page.currentPage + 1)} className="page-link bg-success px-2">
                        <i className="bi bi-chevron-left"></i>
                    </a></li>}
            </ul>
        </nav>
    </>);

    function change(index) {
        if (page.currentPage !== index) {
            props.setChangePaginate(index);
            setPage({ ...page, currentPage: index });
        }
    }
}

function Item({ index, lastPage, currentPage, limit, change }) {
    if (lastPage >= limit) {
        if (
            ((currentPage < limit - 3) && (index <= limit - 3 || index === lastPage)) ||
            ((currentPage > lastPage - limit + 4) && (index > lastPage - limit + 3 || index === 1)) ||
            ((currentPage > limit - 4 && currentPage < lastPage - limit + 5) &&
                (index - 1 <= currentPage && currentPage <= index + 1) || index === 1 || index === lastPage)
        ) {
            return (<><li className="page-item"><a onClick={() => change(index)} className={`page-link ${(currentPage !== index) && 'bg-success'}`}>{index}</a></li></>);
        } else if (
            (currentPage < limit - 3 && lastPage - 1 === index) ||
            (currentPage > lastPage - limit + 3 && 2 === index) ||
            (currentPage > limit - 4 && currentPage < lastPage - limit + 5) && (lastPage - 1 === index || 2 === index)
        ) {
            return (<><li className="page-item"><p className="page-link bg-secondary px-2">...</p></li></>);
        }
    } else {
        return (<><li className="page-item"><a onClick={() => change(index)} className={`page-link ${(currentPage !== index) && 'bg-success'}`}>{index}</a></li></>);
    }
}
