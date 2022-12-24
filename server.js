import app from "./index.js";
import logger from "./logger.js";
import mongoose from "mongoose";
import config from "config";

const port = process.env.PORT || 3000;

const db = config.get("db"); 
// "db": "mongodb://localhost/Novel", (for local db) 

mongoose.set('strictQuery', false);
mongoose.connect(db)
    .then(()=>{
        logger.log("info", "connected to mongodb...");
    })
    .catch(err=>{
        logger.log("error", err);
    });

app.listen(port, ()=>{
    logger.log("info", `server is running at ${port}`);
});





