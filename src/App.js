import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import {API_KEY} from './.env'
// import Axios from "axios";
// import styled from "styled-components";
// import MovieComponent from "./components/MovieComponent";
// import MovieInfoComponent from "./components/MovieInfoComponent";


import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";



function App() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  return (
    <div>
     
        <Routes>
          <Route path="/" element={<Home name={userName}/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup  />} />
        </Routes>
      
    </div>
  )
}

export default App;
