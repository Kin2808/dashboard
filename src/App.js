import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Employee from "./pages/Employee";
import Order from "./pages/Order";
import Product from "./pages/Product";
import Supplier from "./pages/Supplier";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category" element={<Category />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/employee" element={<Employee />} />
          <Route path="/order" element={<Order />} />
          <Route path="/product" element={<Product />} />
          <Route path="/supplier" element={<Supplier />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
