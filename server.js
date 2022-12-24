import app from "./index.js";
import logger from "./logger.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env"});

const port = process.env.PORT || 3000;

const db = process.env.MONGO_DB;
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





