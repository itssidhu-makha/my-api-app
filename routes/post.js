const router = require('express').Router();
const postSchema = require('../models/Post')
const userSchema = require('../models/users')

//create a post
router.post("/", async (req, res) => {
    const postContent = new postSchema(req.body);
    try {
        const savedPost = await postContent.save();
        res.status(200).json({
            message: 'Post created successfully',
            data: savedPost
        })
    } catch (error) {
        res.status(500).json('Post was not created')
    }
    const postResponse = postSchema.create()
})

//update a post by id
router.put("/:id", async (req,res)=>{
    try {
        const updateRes = await postSchema.findById(req.params.id);        
        if(updateRes.userId === req.body.userId){
            const status = await postSchema.updateOne({$set:req.body})
            res.status(200).json('update successfull')
        }else{
            res.status(403).json('you can update only your post')
        }
    } catch (error) {
        res.status(500).json(`Post was not created ${error}`)
    }
    
    
})

//delete a post
router.delete("/:id", async (req,res)=>{
    try {
        const delRes = await postSchema.findById(req.params.id);        
        if(delRes.userId === req.body.userId){
            const status = await postSchema.deleteOne()
            res.status(200).json('Delete successfull')
        }else{
            res.status(403).json('you can delete only your post')
        }
    } catch (error) {
        res.status(500).json(`Post was not deleted ${error}`)
    }
      
})

//like a post
router.put('/:id/like',async (req,res)=>{
    try {
        const alreadyLiked = await postSchema.findById(req.params.id)
        if(!alreadyLiked.likes.includes(req.body.userId)){
            const resLike = await alreadyLiked.updateOne({$push:{likes:req.body.userId}})
            res.status(200).json('The post has been liked')
        }else{
            await postSchema.updateOne({$pull:{likes:req.body.userId}})
            res.status(500).json('The post has been Disliked')
        }
    } catch (error) {
        res.status(500).json(`error occured ${error}`)
    }    
})

//get a post
router.get('/:id',async (req,res)=>{
    try {
        const post = await postSchema.findById(req.params.id)
    res.status(200).json({
        message:'post found',
        data:post
    })
    } catch (error) {
        res.status(500).json(`post not found ${error}`)
    }
    
})

//timeline posts
router.get('/timeline',async (req,res)=>{
    let posts =[];
    try {
        const currentUser = await userSchema.findById(req.body.userId)
        const userPosts = await postSchema.find({userId:currentUser._id})
        const friendPosts = await Promise.all(currentUser.followings.map(following=>{
            userSchema.find({userId:following})
        }))
        res.json(userPosts.concat(...friendPosts))
    } catch (error) {
        res.status(500).json(`post not found ${error}`)
    }
})
module.exports = router