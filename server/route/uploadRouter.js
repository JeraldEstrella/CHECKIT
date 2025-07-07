import express from 'express';
import Post from '../controller/post.js';
import { connectToDatabase } from '../utils/connect.js';
import User from '../controller/user.js';
import Comment from './../controller/comment.js';

const router = express.Router();

router.post('/upload', async (req, res) => {
    await connectToDatabase();
    const {title, content, imageUrl, draft, username, userImage} = req.body;
    const userId = req.auth.userId

    try {
        const newPost = new Post({
            authorId: userId,
            title: title,
            content: content,
            imageUrl: imageUrl || "",
            isDraft: draft,
        });

        const userProf = await User.findOneAndUpdate({authorId: userId},{
            username: username,
            imageUrl: userImage,
        }, {
            new: true,
            upsert: true,
        })

        if (!userProf) {    
            const newUser = new User({
                authorId: userId,
                username: userProf.username,
                imageUrl: userProf.imageUrl
            })

            await newUser.save();
        };

        const savedPost = await newPost.save();
        return res.status(201).json({ id: savedPost._id });
    } catch (error) {
        console.error("Error uploading post:", error);
        return res.status(500).json({ message: "Failed to upload post" });    
    }   
})


router.post('/like', async (req, res) => {
    await connectToDatabase();
    const { postId, userId, update } = req.body;

    console.log(update);

    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        let arr = update ? post.reacts.likes : post.reacts.dislikes;

        arr.includes(userId)
            ? arr.splice(arr.indexOf(userId), 1)
            : arr.push(userId);

        await post.save();

        return res.status(200).json({ 
            message: `Post ${update} updated successfully`, 
            likes: post.reacts.likes, 
            dislikes: post.reacts.dislikes
        });
    } catch (error) {
        console.error("Error liking post:", error);
        return res.status(500).json({ message: "Failed to like post" });
    }
});

router.post('/sendcomment', async (req, res) => {
    await connectToDatabase();
    const { postId, authorId, content, parentId } = req.body;

    try {
        const user = await User.findOne({ authorId: authorId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const comment = await Comment.create({
            postId: postId,
            userInfo: user._id,
            content: content,
            parentId: parentId || null,
            createdAt: new Date(),
        });

        return res.status(201).json({ message: "Comment added successfully", commentId: comment._id });
    } catch (error) {
        console.error("Error adding comment:", error);
        return res.status(500).json({ message: "Failed to add comment" });
    }
});

export default router;