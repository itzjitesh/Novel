import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import express from "express"
const app = express();
import("express-async-errors");
import routes from "./routes/route.js";

// import("./server.js");

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.use("/v1/api/users", routes);
app.use("/v1/api/books", routes);

export default app;


