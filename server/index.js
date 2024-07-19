const express = require('express')

const app = express();
const db = require('./models');

const feedRouter = require("./routes/Feed")
app.use("/feed",feedRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=>{
        console.log("Server is running on 3001")
    })
})
