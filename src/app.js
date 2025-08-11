import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import shortnUrl from "./routes/url.routes.js";
import { getShortcode } from "./controllers/url.controller.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));

app.use(express.json({ limit: "10kb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/url", shortnUrl);
app.get("/:shortcode", getShortcode);  

if(process.env.NODE_ENV==="production"){
  const dirPath= path.resolve();
  app.use(express.static("Frontend/dist"))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(dirPath,'Frontend/dist','index.html'))
  })
}

export default app;
