import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import BaseLayout from "./components/Layout/Baselayout";
import { useEffect } from "react";
import Tablesample from "./components/tablesample";
function App() {
  useEffect(() => {
    console.log("app call");
  });
  return (

    // <Router>
      <>
      <BaseLayout />
        {/* <Dashboard /> */}
        {/* <Tablesample/> */}
        {/* <Routes> */}
          {/* <Route path="/dashboard" element={<BaseLayout />} /> */}
          {/* <Route path="/create-ad" element={<CreateAd />} /> */}
          {/* <Route path="/"  element={<Dashboard />} /> */}
          {/* // <Route path="/form-media-ads"  element={<Formmediaad />} /> */}
          {/* // <Route path="/form-text-ads"  element={<Formtextad />} /> */}
        {/* </Routes> */}
      </>
    // </Router>
  );
}

export default App;
