import mongoose from "mongoose";
import Blog from "../models/blog.js";
import User from "../models/user.js";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user");
    if (!blogs.length) {
      return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({ blogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;
  try {
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "Unable to find user by this ID" });
    }
    const blog = new Blog({
      title,
      description,
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: err });
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    }, { new: true });
    if (!blog) {
      return res.status(404).json({ message: "Unable to update the blog" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({ blog });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

export const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let session;
  try {
    session = await mongoose.startSession();
    session.startTransaction();
    const blog = await Blog.findByIdAndRemove(id).populate("user");
    if (!blog) {
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json({ message: "Unable to delete" });
    }
    await blog.user.blogs.pull(blog);
    await blog.user.save({ session });
    await session.commitTransaction();
    session.endSession();
    return res.status(200).json({ message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: err });
  }
};

export const getByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const userBlogs = await User.findById(userId).populate("blogs");
    if (!userBlogs) {
      return res.status(404).json({ message: "No blog found" });
    }
    return res.status(200).json({ user: userBlogs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
