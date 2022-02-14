import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import AddDomainPage from '../Pages/AddDomainPage';
import DomainListPage from '../Pages/DomainListPage';
import UpdateDomainPage from '../Pages/UpdateDomainPage';
import LoginPage from '../Pages/LoginPage';
import Navbar from '../Components/Navbar';

const AppRouter = () => {
  return (
    <BrowserRouter  >
    <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route  path="/login" element={<LoginPage />} />
        <Route  path="/domain/add" element={<AddDomainPage />} />
        <Route  path="/domain/list" element={<DomainListPage />} />
        <Route  path="/domain/update/:id" element={<UpdateDomainPage />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter