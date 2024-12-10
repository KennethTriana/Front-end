import React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Principal from '../pages/Principal';
import Registro from "../pages/Registro";
import Ventas from "../pages/Ventas";
import Profile from "../pages/Profile";
import UploadImage from "../pages/Imagen";
import LoginFrom from "../pages/Login";
import ProductList from "../pages/Inventario";
import UserList from "../pages/Usuarios";
import AlertaList from "../pages/Alertas";

const NavbarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LoginFrom />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadImage />} />
            <Route path="/inventario" element={<ProductList />} />
            <Route path="/usuarios" element={<UserList />} />
            <Route path="/alertas" element={<AlertaList />} />
        </Routes>
    );
};

export default NavbarRoutes;