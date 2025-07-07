import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    userInfo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    postId: {type: String, required: true},
    parentId: {type: String, required: false},
    content: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
})

const Comment = mongoose.model('Comment', Schema);
export default Comment;