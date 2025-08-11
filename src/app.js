import express from "express";
import cors from "cors";
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
app.get("/:shortcode", getShortcode);  // সবশেষে রাখতে হবে

export default app;
