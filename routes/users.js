const router = require('express').Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/users')
//update user
router.put('/:id',async (req,res)=>{
    const {userId,password} = req.body
    if(userId===req.params.id||req.body.isAdmin){
        if(password){
            try{
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(password,salt)   
            }catch(error){
                res.status(500).json(`Update did not work - please retry ${error}`)
            }
        }        

        //update user
        try {
            const user = await userModel.findByIdAndUpdate(req.params.id,{
                $set:req.body                            
            });

            res.status(200).json('User Updated Successfully')
        } catch (error) {
            res.status(500).json(`Update did not work - please retry ${error}`)
        }
    }else{
        res.status(403).json('You can only update your account')
    }
})

//delete user
router.delete('/:id',async (req,res)=>{
    if(req.body.userId===req.params.id||req.body.isAdmin){
        try {
            const deletedUser = await userModel.deleteOne({_id:req.params.id});
            res.status(200).json('User Deletion success')
        } catch (error) {
            res.status(500).json(`Could not delete the user - please retry ${error}`)
        }
    }else{
        res.status(403).json('You can only update your account')
    }
})

//get a user
router.get('/:id',async (req,res)=>{
    try {
        const user = await userModel.findById(req.params.id)
        const {createdAt,updatedAt,password,...rest} = user._doc;
        res.status(200).json({
            status:"success",
            data:rest
        })
    } catch (error) {
        res.status(500).json(`Could not Find the user - please retry ${error}`)
    }
})

//follow a user and update the following array for this user
router.put('/:id/follow',async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const currentUser = await userModel.findById(req.params.id)
            const userToFollow = await userModel.findById(req.body.userId)

            if(!userToFollow.followers.includes(req.params.id)){
                await userToFollow.updateOne({$push:{followers:req.params.id}})
                await currentUser.updateOne({$push:{followings:req.body.userId}})

                res.status(200).json('User has been followed')
            }else{
                res.status(403).json('You are already following this user')
            }

        } catch (error) {
            
        }
    }else{
        res.status(403).json('You Cannot follow yourself')
    }
})


//follow a user and update the following array for this user
router.put('/:id/unfollow',async (req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const currentUser = await userModel.findById(req.params.id)
            const userToUnFollow = await userModel.findById(req.body.userId)

            if(userToUnFollow.followers.includes(req.params.id)){
                await userToUnFollow.updateOne({$pull:{followers:req.params.id}})
                await currentUser.updateOne({$pull:{followings:req.body.userId}})

                res.status(200).json('User has been Unfollowed')
            }else{
                res.status(403).json('You have already unfollowed this user')
            }

        } catch (error) {
            
        }
    }else{
        res.status(403).json('You cannot unfollow yourself')
    }
})
module.exports=router