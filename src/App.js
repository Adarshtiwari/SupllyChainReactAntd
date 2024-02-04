import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BaseLayout from './components/Layout/Baselayout';
function App() {  
  return (
    <Router>
      <>
        {/* <Dashboard /> */}
        <BaseLayout/>
        {/* <Routes>
          <Route path="/create-ad" element={<CreateAd />} />
          <Route path="/"  element={<Dashboard />} />
          <Route path="/form-media-ads"  element={<Formmediaad />} />
          <Route path="/form-text-ads"  element={<Formtextad />} />
        </Routes> */}
        
      </>
    </Router>
  );
}

export default App;
