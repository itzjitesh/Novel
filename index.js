import bodyParser  from "body-parser";
import cookieParser from "cookie-parser";
import express from "express"
const app = express();
import("express-async-errors");
import { dirname } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from "./routes/route.js";

// import("./server.js");
{/* <link rel="stylesheet" href="/client/public/css/styles.css"></link> */}

app.set("view engine", "ejs");

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname,  '/client/views'));

app.use(cookieParser());
app.use(express.static("public"));
// app.use(express.static(__dirname + "/client" + "public"));
app.use(bodyParser.urlencoded({extended: true}));

// app.use("/v1/api/users", routes);
// app.use("/v1/api/books", routes);

app.use("/", routes);

export default app;


