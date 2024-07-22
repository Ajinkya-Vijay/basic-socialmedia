const express = require('express')
const app = express();

app.use(express.json())
const db = require('./models');
const cors = require('cors')


app.use(cors())

const feedRouter = require("./routes/Feed")
const commentRouter = require("./routes/Comments")

app.use("/feed",feedRouter)
app.use("/comments",commentRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server is running on 3001")
    })
})
