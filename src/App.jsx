import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Add_exp from './Add_exp';
import Category from './Category';
import Dashboard from "./Dashboard";
import Chatbot from "./Chatbot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      <Route 
        path="/add-expense" 
        element={
          <div>
            <h1 className="page-title">Track where your expenses go!🚀</h1>
            <div className="card-container">
              <Add_exp title="CANTEEN" category="canteen" />
              <Add_exp title="GURUNATH" category="gurunath" />
              <Add_exp title="TRAVEL" category="travel" />
            </div>
          </div>
        } 
      />
      
      <Route path="/category/:category" element={<Category />} />
    </Routes>
  );
}

export default App;
