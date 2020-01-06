const mongoose=require('mongoose');

const CommentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    ime: {
        type: String,
        required: true
    },
    sadrzaj: {
        type: String,
        required: true
    },
    ocena: {
        type: Number,
        required: true
    },
    izbor:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
});

const Comment=mongoose.model('Comment',CommentSchema);

module.exports= Comment;