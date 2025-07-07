import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    authorId: {type: String, required: true, ref: 'User'},
    title: {type: String, required: true},
    content: {type: String, required: true},
    imageUrl: {type: String, required: false},
    isDraft: {type: Boolean, default: false},
    reacts: {
        likes: [{type: String}],
        dislikes: [{type: String}],
    },
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    createdAt: {type: Date, default: Date.now},
})

const Post = mongoose.model('Post', Schema);
export default Post;