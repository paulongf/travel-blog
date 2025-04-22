const express = require('express');
const Blog = require('../model/blog.model')
const router = express.Router();

// Create a blog post
router.post('/create-post', async(req, res)=> {
    try{
         //console.log("Blog data from api: ", req.body)
         const newPost = new Blog({...req.body});
         await newPost.save();
         res.status(201).send({
            message: "Post created successfuly",
            post: newPost
         })
    }catch (error){
        console.error("Error creating post.", error);
        res.status(500).send({message: "Error creating post."})
    }
})

// Get All Blogs
router.get('/', async (req, res)=> {
    try{
        const {search, category, location} = req.query;
        let query = {}

        if(search){
            query = {
                ...query,
                $or: [
                    { title: {$regex: search, $options: "i"}},
                    {content: {$regex: search, $options: "i"}}
                ]
            }
        }
        if(category){
            query = {
                ...query,
                category
            }
        }
        if(location){
            query = {
                ...query, 
                    location
            }
        }
        const post = await Blog.find(query).sort({createdAt: -1});
        res.status(200).send({
            message: "All posts retrieved successfully",
            posts: post
        })

    }catch (error){
        console.error("Error finding post.", error);
        res.status(500).send({message: "Error finding post."})
    }
})

// Get single blog by id
router.get("/:id", async(req, res)=>{
    try{
       // console.log(req.params.id);
        const postId = req.params.id;
        const post = await Blog.findById(postId);
        if(!post){
            return res.status(404).send({message: "Post not found"})
        }

        // Todo: with also fetch comment related to the post
        res.status(200).send({
            message: "Post retrieved successfully",
            post: post
        });

    } catch (error){
        console.error("Error fetching single post: ", error);
            res.status(500).send({message: "Error fetching single post."})
    }
});

// Update a blog post
router.patch("/update-post/:id", async(req, res)=>{
    try {
        const postId = req.params.id;
        const updatedPost = await Blog.findByIdAndUpdate(postId, {
            ...req.body
        }, {new: true});

        if(!updatedPost){
            return res.status(404).send({message: "Post not found"})
        }
        res.status(200).send({
            message: "Post updated successfully",
            post: updatedPost
        })

    } catch (error) {
        console.error("Error updating  post: ", error);
            res.status(500).send({message: "Error updating post."})
    }
})

router.delete("/:id", async(req, res) =>{
    try {
        const postId = req.params.id;
        const post = await Blog.findByIdAndDelete(postId);

        if(!post){
            return res.status(404).send({message: "Post not found"})
        }
        res.status(200).send({
            message: "Post deleted successfully",
            post: post
        })
        
    } catch (error) {
        console.error("Error deleting  post: ", error);
        res.status(500).send({message: "Error deleting post."})
    }
});

// Related Blogs
router.get("/related/:id", async(req, res)=> {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(400).send({message: "Post id is required"})
        }
        const blog = await Blog.findById(id);

        if(!blog){
            return res.status(400).send({message: "Post id is required"})
        }
        
    } catch (error) {
        console.error("Error fetching related post: ", error);
        res.status(500).send({message: "Error fetching related post."})
    }
})


module.exports = router;