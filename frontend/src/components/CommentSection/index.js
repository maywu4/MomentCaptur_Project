import './CommentSection.css'
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeComment, getPostComments, fetchComments, getComments } from '../../store/comments';
import NewCommentForm from '../NewCommentForm';
import { useState } from 'react';

const CommentSection = ({postId}) => {
    const dispatch = useDispatch();
    const comments = useSelector(getComments);
    // const [reload, setReload] = useState(0);
    
    useEffect(() => {
        dispatch(fetchComments());
    },[])
    
    const postComments = comments.map((comment, i) => {
        const authorProfileLink = comment ? `/people/${comment.authorId}` : null
        
        // console.log(parseInt(postId, 10) === comment.postId)
        console.log(comment)

        if (comment.postId === parseInt(postId, 10)) { 
            return (
                <li key={i}>
                    <div>
                        <a href={authorProfileLink}>
                            {comment.author.username}
                        </a>
                        <p> {comment.body} </p>
                    </div>
                </li>
            )
        } else {
            return "this is not right";
        }
    })
    
    
    return (
        <div className='comments'>
            <ul>{postComments}</ul>
            <NewCommentForm postId={postId} />
        </div>
    )
}

export default CommentSection;