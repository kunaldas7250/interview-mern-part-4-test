import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginSignup from "./LoginSighnup"; 
import MainPage from "./MainPage";
import Movie from "./Movie";
import Product from "./Product"
import Todo from "./Tode"
const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/Product" element={<Product/>}/>
        <Route path="/Movie" element={<Movie/>}/>
        <Route path="/Todo" element={<Todo/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
