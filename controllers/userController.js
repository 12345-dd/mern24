const userSchema = require("../models/userModel")

const addUser = async(req,res) => {
    const newUser = await userSchema.create(req.body)
    if(newUser){
        res.status(201).json({
            message:"User Added Successfully",
            data:newUser
        })
    } 
}

const loginUser = async(req,res) => {
    const {email,password} = req.body 

    const userFound = await userSchema.findOne({email:email})
    if(userFound !== null){
        if(password == userFound.password){
            res.status(200).json({
                message:"Login Successful",
                data:userFound
            })
        } else {
            res.status(404).json({
                message:"Invalid Credential"
            })
        }
    } else {
        res.status(404).json({
            message:"User Not Found"
        })
    }
}

const getAllUsers = async(req,res) => {
    const getUsers = await userSchema.find();
    if(getUsers){
        res.status(200).json({
            message:"Getting All Users",
            data:getUsers
        })
    } else {
        res.status(404).json({
            message:"Fetching in getting Users"
        })
    }
}

module.exports = {
    addUser,
    loginUser,
    getAllUsers
}