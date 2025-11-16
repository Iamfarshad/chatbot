import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./screens/Index";
import Auth from "./screens/Auth";
import Chat from "./screens/Chat";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
