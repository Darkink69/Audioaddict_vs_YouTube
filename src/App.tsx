import { useState } from "react";
import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage.js";
import { ItemStation } from "./pages/ItemStation.js";
import { Navigation } from "./components/Navigation.js";

function App() {
  const [siteName, setSiteName] = useState("");

  return (
    <>
      <Navigation onSiteChanged={(name) => setSiteName(name)} />
      <Routes>
        <Route path="/" element={<HomePage siteName={siteName} />} />
        <Route path="/item" element={<ItemStation />} />
      </Routes>
    </>
  );
}

export default App;
