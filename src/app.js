import express from "express";
import cros from "cros";
import cookieParser from "cookie-parser";

const app = express();

//allow request ORIGIN
app.use(cros({
    origin: process.env.CROS_ORIGIN,
    Credential:true
}))

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(express.cookieParser())

export{app}