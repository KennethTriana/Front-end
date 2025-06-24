import React from "react";
import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Categoria from '../pages/Categoria';
import Producto from '../pages/Producto';
import Registro from "../pages/Registro";
import Ventas from "../pages/Ventas";
import Profile from "../pages/Profile";
import Historial from "../pages/Historial";
import LoginFrom from "../pages/Login";
import RecuperarContrasenaForm from "../pages/RecuperarContrasena";
import ProductList from "../pages/Inventario";
import UserList from "../pages/Usuarios";
import AlertaList from "../pages/Alertas";


const NavbarRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/categoria" element={<Categoria />} />                                         
            <Route path="/login" element={<LoginFrom />} />
            <Route path="/recuperar-contrasena" element={<RecuperarContrasenaForm />} />
            <Route path="/registro" element={<Registro />} />        
            <Route path="/producto" element={<Producto />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/inventario" element={<ProductList />} />
            <Route path="/usuarios" element={<UserList />} />
            <Route path="/alertas" element={<AlertaList />} />
        </Routes>
    );
};

export default NavbarRoutes;