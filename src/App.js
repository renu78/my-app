import React from "react"
import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlog from "./components/UserBlog";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";


import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";

function App() {
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn);
  <header>
    <Header/>
  </header>
  return  <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
         
            <>
            <Route path="/auth" element={<Auth/>}/>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlog/>} />
              <Route path="/myBlogs/:id" element={<BlogDetail />} />
            </>
        
        </Routes>
      </main>
    </React.Fragment>

}

export default App;