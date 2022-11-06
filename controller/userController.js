const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

require("dotenv").config()

const UserModel = require("../model/user")

async function signup(req, res) {
    const newUser = req.body

    
    if (!newUser) {
        return res.status(400).send("Please provide email, password")
    }
    
    let hash = await bcrypt.hash(newUser.password, 10)
    newUser.password = hash

    newUser.first_name = newUser.first_name.toLowerCase()
    newUser.last_name = newUser.last_name.toLowerCase()

    await UserModel.create({
        email: newUser.email,
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        password: newUser.password
    })
        .then((user) => {
            res.status(200).json({
                message: 'Signup Successful',
                user: user
            })
        }).catch((err) => {
            console.log(err)
            res.status(500).send(err.message)
        })
}


async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.send("Please provide email and password")
    }

    try {
        const user = await UserModel.findOne({ email: email })

        const compare = await bcrypt.compare(password, user.password)

        if (compare == false) {
            return res.send("Incorrect Password")
        } else {
            const body = { _id: user._id, email: user.email, first_name: user.first_name, last_name: user.last_name }
            const token = jwt.sign({ user: body }, process.env.JWT_SECRET, { expiresIn: "1h" })

            res.status(200).json({
                message : "Login Successful" ,  token })
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

module.exports = { signup, login }