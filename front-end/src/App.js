import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import MainLayout from "./layouts/main"


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>} />
      </Routes>
    </MainLayout>
  );
}

export default App;