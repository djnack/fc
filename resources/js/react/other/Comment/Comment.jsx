import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Post } from "../../servises/Request";

function Comment() {

    // const navigate = useNavigate();

    const params = useParams();
    const id = params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingComment, setIsLoadingComment] = useState(false);
    const [error404, setError404] = useState(false);
    const [paginateComment, setPaginateComment] = useState({});
    const [comments, setComments] = useState({});
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isLoading) {
            getComment()
        }
    }, [isLoading])

    return (<>
        {!isLoading &&
            <div className="section full mt-2" id='comments'>
                <div className="section-title">دیدگاه {!!count && (count)}</div>
                <div className="wide-block pt-2 pb-2">
                    <div className="comment-block">

                        {!!count && Object.values(comments).map(e => {
                            return <div key={Math.random()} className="item">
                                <div className="avatar">
                                    <img src={e.user.image.path} className="imaged w32 rounded" />
                                </div>
                                <div className="in">
                                    <div className="comment-header">
                                        <h4 className="title">{e.user.name}</h4>
                                        <span className="time">{e.created_at}</span>
                                    </div>
                                    <div className="py-2 text">
                                        {e.body}
                                    </div>
                                    <div className="comment-footer">
                                        <a href="#" className="comment-button">
                                            <i className="bi bi-heart"></i>
                                            
                                        </a>
                                        <a href="#" className="comment-button replay">
                                            <i className="bi bi-chat-left-text"></i>
                                            پاسخ
                                        </a>
                                    </div>
                                </div>
                            </div>
                        })}

                    </div>
                    {paginateComment && (paginateComment.currentPage !== paginateComment.lastPage) &&
                        <div onClick={() => getComment()} className="text-center pointer text-gray mt-2">
                            {isLoadingComment ?
                                <div className="spinner-border spinner-border-sm">
                                    <span className="sr-only"></span>
                                </div> :
                                <p>بیشتر...</p>}
                        </div>}
                    <div className="divider mt-3 mb-2"></div>
                    <a href="#" className="btn btn-block btn-primary">ارسال دیدگاه</a>
                </div>
            </div>
        }
    </>);


    function getComment() {
        if (!isLoadingComment) {
            setIsLoadingComment(true)
            let indexPage = paginateComment ? paginateComment.currentPage + 1 : 1;
            Post(`comments?page=${indexPage}`, { product: id }).then(res => {
                if (res['status'] === 200) {
                    if ("data" in res) {
                        if (Object.keys(comments).length) {
                            let comment = res.data.comments;
                            setComments(Object.assign(comments, comment));
                        } else {
                            setComments(res.data.comments);
                        }
                        setCount(res.data.count)
                        setPaginateComment(res.paginate);
                    }
                } else if (res.response) {
                    if (res.response.status === 404) {
                        setError404(true);
                    } else if (res.response.status === 500) {
                        // setError({ server: process.env.MIX_REACT_APP_ERROR_SERVER })
                    }
                }
                setIsLoading(false);
                setIsLoadingComment(false);

            });
        }
    }
}

export default Comment;