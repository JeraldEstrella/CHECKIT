import express from 'express';
import ImageKit from 'imagekit';
import Comment from './../controller/comment.js';
import { connectToDatabase } from '../utils/connect.js';
import Post from '../controller/post.js';
import User from '../controller/user.js';

const router = express.Router();

router.get("/image-auth", (req, res) => {

    const imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_ENDPOINT,
    });

    console.log(
        "IMAGEKIT_PUBLIC_KEY:", process.env.IMAGEKIT_PUBLIC_KEY,
        "IMAGEKIT_PRIVATE_KEY:", process.env.IMAGEKIT_PRIVATE_KEY,
        "IMAGEKIT_ENDPOINT:", process.env.IMAGEKIT_ENDPOINT
    );

    try {
        const auth = imageKit.getAuthenticationParameters();
        res.send(auth);
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        res.status(500).json({ error: 'Failed to get authentication parameters' });
    }

})

router.get("/posts", async (req, res) => {
    await connectToDatabase();

    try {

        const posts = await Post.find({ isDraft: false })
        .sort({ createdAt: -1 })
        .limit(15);

        const authorIds = posts.map(post => post.authorId);
        const users = await User.find({ authorId: { $in: authorIds } });

       const userMap = Object.fromEntries(
            users.map(user => [
                user.authorId,
                { username: user.username, userImage: user.imageUrl }
            ])
        );

        const postWithUser = posts.map(post =>({
            ...post.toObject(),
            username: userMap[post.authorId]?.username,
            userImage: userMap[post.authorId]?.userImage
        }));

        return res.status(200).json(postWithUser);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ message: "Failed to fetch posts" });
    }
});

router.post("/comments", async (req, res) => {
    await connectToDatabase();

    const {_id: postId} = req.body;

    try {
        const comment = await Comment.find({postId}).populate('userInfo', 'username imageUrl').sort({createdAt: -1}).lean();

        if (!comment) {
            return res.status(404).json({ message: "Post not found" });
        }

        const mapComments = {};
        const commentWithChildren = [];

        comment.forEach((com) =>{
            mapComments[com._id] = {...com, children: []};
        });
        
        comment.forEach((com) => {
            if(com.parentId){
                const parent = mapComments[com.parentId];
                if(parent){
                    parent.children.push(mapComments[com._id]);
                }
            }else {
                commentWithChildren.push(mapComments[com._id]);
            }
        });

        return res.status(200).json(commentWithChildren);
    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ message: "Failed to fetch comments" });
    }
});

export default router;