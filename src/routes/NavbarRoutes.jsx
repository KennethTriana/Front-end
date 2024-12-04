import React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Principal from '../pages/Principal/Principal';
import Login from '../pages/Login/Login';
import Registro from "../pages/Registro/Registro";
import Ventas from "../pages/Ventas/Ventas";

const NavbarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/principal" element={<Principal />} />
            <Route path="/ventas" element={<Ventas />} />
        </Routes>
    );
};

export default NavbarRoutes;