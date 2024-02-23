import express from "express";
import mongoose from "mongoose";
import blogRouter from "./route/blog-route.js";
import router from "./route/user-route.js";

import cors from "cors";

const app =express();
app.use(cors());
app.use(express.json())
app.use("/api/user",router);
app.use("/api/blog",blogRouter);



