import { useState } from "react";
import { Route } from "react-router-dom";

import { Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ItemStation } from "./pages/ItemStation";
import { Navigation } from "./components/Navigation";

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
