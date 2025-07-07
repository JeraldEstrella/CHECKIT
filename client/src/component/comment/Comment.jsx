import "./comment.css";
import { useState, useRef } from 'react';
import { useAuth, useUser } from '@clerk/clerk-react';
import CommentThread from './commentThread.jsx';

const RenderComments = ({ comments, postId, postInfo, refetchComments }) => {
    const { getToken } = useAuth();
    const { user } = useUser();
    
    const userId = user?.id;

    const [text, setText] = useState("");
    const [replyTo, setReplyTo] = useState(null);
    const textareaRef = useRef(null);

    const handleTextChange = (e) => {
        setText(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = "32px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyTo(commentId);
        textareaRef.current?.focus();
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken();
        if (!text.trim()) return;

        await fetch("http://localhost:3000/api/post/sendcomment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                postId: postId,
                authorId: userId,
                content: text,
                parentId: replyTo,
            }),
        });
        setText("");
        setReplyTo(null);
        if (refetchComments) refetchComments();
    };

    return (
        <div className="comment-container">
            <div className="comment-post-wrapper">
                <div className="comment-user">
                    <img src={postInfo.userImage || "user.png"} alt="" />
                    <h5>{postInfo.username || "Anonymous"}</h5>
                </div>
                <div className="comment-post">
                    <h5>{postInfo.title || "Untitled Post"}</h5>
                    <p>{postInfo.content || "No content available"}</p>
                    <img src={postInfo.imageUrl || "post.png"} alt="" />
                </div>
            </div>

            <div className="comment-wrapper">
                <div className="comment-list">
                    <CommentThread
                        comments={comments}
                        handleReplyClick={handleReplyClick}
                    />
                </div>
                <form className="comment-input" onSubmit={handleCommentSubmit}>
                    <textarea
                        ref={textareaRef}
                        className="comment-textarea"
                        placeholder={replyTo ? "Replying..." : "Add a comment..."}
                        value={text}
                        onChange={handleTextChange}
                        rows={1}
                    />
                    <button className="comment-button" type="submit">
                        {replyTo ? "Reply" : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RenderComments;
