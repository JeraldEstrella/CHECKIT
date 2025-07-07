import { useQuery, useQueryClient } from '@tanstack/react-query';
import './content.css';
import { useLocation } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';
import RenderComments from './../../component/comment/Comment.jsx';
import { useState } from 'react';

const Content = () => {

  const [showComment, setShowComment] = useState(false);
  const [postId, setPostId] = useState(null);
  const [postInfo, setPostInfo] = useState({
    title: '',
    content: '',
    imageUrl: '',
    username: '',
    imageUser: '',
    authorId: '',
  });

  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const location = useLocation();
  const newPostId = location.state?.newPostId;

  const { isPending, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/get/posts');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const post = await response.json();
      const sortedDate = post.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return sortedDate;
    },
    refetchOnWindowFocus: false, 
  })

  let posts = data || [];

  if(newPostId){
    const newUserPost = data?.find(post => post._id === newPostId);
    if(newUserPost) {
      posts = [newUserPost, ...data.filter(post => post._id !== newPostId)];
    }
  }

  const handleLike = async (postId, userId, updateType) => {
    const token = await getToken();

    await fetch('http://localhost:3000/api/post/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ postId, userId, update: updateType }),
    });

    queryClient.invalidateQueries(['posts']); 
  };

  const handComment = (post) => {
    const { _id, title, content, imageUrl, username, userImage, authorId } = post;
    setPostId(_id);
    setPostInfo({ title, content, imageUrl, username, userImage, authorId });
    setShowComment(true);
  };

  const { data: comments, refetch: refetchComments } = useQuery({
    queryKey: ['comments', postId],
    queryFn: async () => {
      if (!postId) return [];
      const token = await getToken();
      const res = await fetch('http://localhost:3000/api/get/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ _id: postId }),
      });
      return res.json();
    },
    enabled: !!postId && showComment,
  });
 
  return (
    <>
      {showComment && (
        <RenderComments
          comments={comments || []}
          postId={postId}
          postInfo={postInfo}
          refetchComments={refetchComments}
        />
      )}
      <div className="post-container">
        <div className="info">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong"
            : posts.map((post, idx) => (
                <div className="post-wrapper" key={post._id || idx}>
                  <div className="details">
                    <div className="user">
                      <img src={post.userImage} alt="" />
                      <h5>{post.username || "Anonymous"}</h5>
                    </div>
                    <div className="post-buttons">
                      <div className="btn-container">
                        <button className="edit btn">
                          <img src="./edit.png" alt="" />
                        </button>
                        <button className="delete btn">
                          <img src="./delete.png" alt="" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="post">
                    <h5>{post.title || "Untitled Post"}</h5>
                    <p>{post.content || "No content available"}</p>
                    {post.imageUrl && <img src={post.imageUrl} alt="" />}
                  </div>
                  <div className="react">
                    <button className="like" onClick={() => handleLike(post._id, post.authorId, true)}>
                      <img src="heart.png" alt="" />
                      <span>{post.reacts?.likes?.length || 0}</span>
                    </button>
                    <button className="dislike" onClick={() => handleLike(post._id, post.authorId, false)}>
                      <img src="dislike.png" alt="" />
                      {post.reacts?.dislikes?.length || 0}
                    </button>
                    <button
                      onClick={() => {
                        handComment(post);
                      }}
                      className="comment"
                    >
                      <img src="chat.png" alt="" />
                    </button>               
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default Content;