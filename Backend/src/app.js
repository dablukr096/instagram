const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/auth.route")
const postRouter = require("./routes/post.route")
const userRouter = require("./routes/user.route")

const app = express()
app.use(express.json())
app.use((req, res, next) => {
    req.cookies = Object.fromEntries(
        (req.headers.cookie || "")
            .split(";")
            .filter(Boolean)
            .map(cookie => {
                const separator = cookie.indexOf("=")
                const name = cookie.slice(0, separator).trim()
                const value = cookie.slice(separator + 1).trim()
                return [name, decodeURIComponent(value)]
            })
    )
    next()
})
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth/" , authRouter)
app.use("/api/posts" , postRouter)
app.use("/api/users" , userRouter)




module.exports = app
