const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const postSchema = new Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    type: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    }

})
const Post = mongoose.model("Post", postSchema)

exports.Post = Post
