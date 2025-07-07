import Draftsave from "../../component/draftsaved/draftsave";
import "./submit.css";
import { useState } from "react";
import UploadImage from "./uploadImage.jsx"; 
import { handleImageUpload } from "./uploadImage.jsx"; 
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

const Submit = () => {

  const { user } = useUser();
   
  const [showDraft, setShowDraft] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {getToken} = useAuth();

  const mutation = useMutation({
    mutationFn: async ({ title, content, imageUrl, draft }) => {

      if (!user) {
        console.error("User is not authenticated");
        return;
      };

      const userData = {
        username: user.emailAddresses?.[0]?.emailAddress || user.firstName || "Anonymous",
        imageUrl: user.imageUrl
      };

      const token = await getToken();
      const response = await fetch("http://localhost:3000/api/post/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          imageUrl,
          draft,
          username: userData.username,
          userImage: userData.imageUrl,
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText || "Failed to upload post");
      }
      const data = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setLoading(false);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      navigate("/", { state: { newPostId: data.id } });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert("Title and Body Text are required.");
      return;
    }
    setLoading(true);

    let imageUrl = "";
    if (selectedFile) {
      imageUrl = await handleImageUpload(selectedFile);
    }

    mutation.mutate({ title, content, imageUrl, draft: false });
  };

  
  return (
    <>
      <div className="container-submit">
        {loading && <div className="isLoading">
          <div className="Loading">Processing user post...</div>
          <div className="progress-bar"></div>
        </div>}
        
        <div className="header">
          <h1>Create post</h1>
          <button
            className="draft"
            onClick={() => setShowDraft((prev) => !prev)}
          >
            Draft
          </button>
        </div>
        <div className="input-container">
          <form className="title" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title*"
              className="title-text"
              style={{ width: "100%", fontSize: "1.2rem", marginBottom: "12px" }}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <textarea
              placeholder="Body Text"
              className="body-text"
              style={{ width: "100%", minHeight: "180px", fontSize: "1rem", marginTop: "12px", marginBottom: "12px", resize: "vertical" }}
              onChange={(e) => setContent(e.target.value)}
            />
            <hr />
            {previewImage && <img src={previewImage} alt="Preview" style={{ width: 110 }} />}
            <div style={{ display: "flex", gap: "12px", marginTop: "18px",}}>
              <UploadImage setPreviewImage={setPreviewImage} setSelectedFile={setSelectedFile} />
              <button
                type="button"
                className="save-draft-btn"
                onClick={() => {
                  setDraft(false);
                  setShowDraft(true);
                }}
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="post-btn"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
      {showDraft && (
        <Draftsave className="draft-pop" onClose={() => setShowDraft(false)} />
      )}
    </>
  );
};

export default Submit;




