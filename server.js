const express= require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const helmet = require('helmet')
const path = require('path')
const connectDB = require('./config/db')
const users = require('./routes/users')
const auth = require('./routes/auth')
const postRoute = require('./routes/post')
//connect to DB
dotenv.config({path:'./config/config.env'});
connectDB();

const app = express();
app.use(express.json())
//middlewares
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

app.use("/api/user",users);
app.use("/api/auth",auth);
app.use("/api/posts",postRoute)
// app.get('/',(req,res)=>{
//     res.send('Hello Dear')
// })
app.listen(8800,()=>{
    console.log(`server runnnig`)
})
