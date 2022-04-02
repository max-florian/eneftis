import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import Eneftis from "./views/Eneftis";
import Enefti from "./views/Enefti";
import CreateWallet from './views/CreateWallet';
import MainLayout from "./layouts/main"


function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" exact element={<Home/>} />
      </Routes>
      <Routes>
        <Route path="/myeneftis" exact element={<Eneftis/>} />
      </Routes>
      <Routes>
        <Route path="/myeneftis/:tokenId" exact element={<Enefti/>} />
      </Routes>
      <Routes>
        <Route path="/createwallet" exact element={<CreateWallet/>} />
      </Routes>
    </MainLayout>
  );
}

export default App;