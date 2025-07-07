const CommentThread = ({ comments, handleReplyClick }) => {

    return (
        <div className="comment-thread">
            {comments.map((com) => (
                <div key={com._id} className="comment">
                    <div className="comment-header">
                        <img
                            src={com.userInfo?.imageUrl || "user.png"}
                            alt=""
                            className="comment-user-img"
                        />
                        <span className="comment-username">{com.userInfo?.username || "Anonymous"}</span>
                    </div>
                    <div className="comment-body">
                        <p>{com.content}</p>
                        <button
                            className="reply-btn"
                            onClick={() => handleReplyClick(com._id)}
                        >
                            Reply
                        </button>
                    </div>
                    {com.children.length > 0 && (
                        <div className="comment-thread">
                            <CommentThread
                                comments={com.children}
                                handleReplyClick={handleReplyClick}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CommentThread;