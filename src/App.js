import { Route, Routes } from "react-router-dom";
import './App.css';
import Dashboard from "./Pages/Dashboard"
import SigninPage from "./Pages/SigninPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
