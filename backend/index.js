const express = require("express");
const rootRouter = require('./routes/index')
const cors = require("cors");


const app=express();
app.use(cors());
app.use(express.json());

app.use("/api/v1",rootRouter);



app.listen(3000,()=>{
    console.log("server is runnibg on port 3000");
})

// https://daily-code-web.vercel.app/tracks/oAjvkeRNZThPMxZf4aX5/L5aGnQuku8Az1CDNwGNQ