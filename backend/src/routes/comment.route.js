const express = require('express');
const Post = require('../model/comment.model')
const Comment = require('../model/comment.model')
const router = express.Router();


// create comment
router.post('/post-comment', async(req, res) =>{
    try {
    console.log(req.body);
    const newComment = new Comment(req.body);
    await newComment.save();
    res.status(200).send({message: "Comment created successfully", comment: newComment})

    } catch (error) {
        console.error("An error ocurred while posting new comment", error);
        res.status(500).send({message: "An error ocurred while posting new comment"});

    }
});

// get all comments count

router.get("/total-comments", async(req, res)=>{
    try {
        const totalComments = await Comment.countDocuments({});
        res.status(200).send({message: "Total comments count", totalComments})
        
    } catch (error) {
        console.error("An error ocurred while geting comment count", error);
        res.status(500).send({message: "An error ocurred while geting comment count"});
    }
})

module.exports = router;