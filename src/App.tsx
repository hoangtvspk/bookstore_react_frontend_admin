import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { appComponentConfig, renderAppComponent } from "./routes/routes";
import { RootStateOrAny, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const isAuth = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAuth;
  });
  const isAdmin = useSelector((state: RootStateOrAny) => {
    return state.authSlice.isAdmin;
  });

  return (
    <BrowserRouter>
      {renderAppComponent(appComponentConfig, isAuth, isAdmin)}
    </BrowserRouter>
  );
}

export default App;
