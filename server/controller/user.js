import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    authorId: {type: String, required: true},
    username: {type: String, required: true},
    imageUrl: {type: String, required: false},
})

const User = mongoose.model('User', Schema);
export default User;