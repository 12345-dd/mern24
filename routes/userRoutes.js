const router = require("express").Router();

const userController = require("../controllers/userController");

router.post("/user",userController.addUser)

router.post("/login",userController.loginUser)

router.get("/user",userController.getAllUsers)

module.exports = router 