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
  return (
    <BrowserRouter>
      {renderAppComponent(appComponentConfig, isAuth)}
    </BrowserRouter>
  );
}

export default App;
