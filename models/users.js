const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:[true,'Please enter a username to proceed'],
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:[true,'Please enter an email to proceed'],
        min:3,
        max:100,
        unique:true
    },
    password:{
        type:String,
        require:[true,'Please enter a password'],
        min:3,
    },
    profilePic:{
        type:String,
        default:""
    },
    coverPic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:500
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }
},{timestamps:true})

module.exports = mongoose.model("user",userSchema)