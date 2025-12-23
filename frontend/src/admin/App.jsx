import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
