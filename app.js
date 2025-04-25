const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors")
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)

mongoose.connect("mongodb://127.0.0.1:27017/chat-app").then(()=>{
    console.log("Database is Connected");
}).catch((err)=>{
    console.log(err);
})

const userSchema = require("./models/userModel")
const messageSchema = require("./models/messageModel")
const userRoutes = require("./routes/userRoutes")
app.use("/user",userRoutes)

const io = new Server(server,{
    cors:{
        origin:"http://localhost:5173",
        methods:["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("New User Connected...",socket.id)
    socket.on("user",(data)=>{
        socket.broadcast.emit("all",`${data} joined the chat`)
    })

    socket.on("message",async(data)=>{

        const sender = await userSchema.findOne({userName:data.sender})
        const receiver = await userSchema.findOne({userName:data.receiver})

        const messages = await messageSchema.create({
            sender:sender._id,
            receiver:receiver._id,
            message:data.message,
            time:new Date()
        })
        socket.broadcast.emit("receive",{sender:sender.userName,receiver:receiver.userName,message:messages.message,time:messages.time})
    })
})

const PORT = 3000;

server.listen(PORT,()=>{
    console.log("server Started...",PORT)
})