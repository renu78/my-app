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



mongoose.connect("mongodb+srv://renukul2002:62yFSslg0cr0Elm4@cluster0.6ovevtk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>app.listen(5000)).then(()=>console.log("connected to database"))
.catch((err)=> console.log(err));

//62yFSslg0cr0Elm4

