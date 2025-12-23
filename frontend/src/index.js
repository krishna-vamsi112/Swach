// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { BrowserRouter } from "react-router-dom";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import App from "./App";
// import { store } from "./store";
// import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
//         <App />
//       </GoogleOAuthProvider>
//     </BrowserRouter>
//   </Provider>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./Home/AllPages";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Blog from "./components/Blog";
// import ProductDetail1 from "./components/ProductDetail1";
import ProductDetail2 from "./components/ProductDetail2";
import ProfilePage from "./components/ProfilePage";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Myorders from "./components/Myorders";
import AllProducts from "./admin/components/AllProducts";
import AdminDashboard from "./admin/components/Admindashboard";
import Sidebar from "./admin/components/Sidebar";
import OrdersPage from "./admin/components/OrdersPage";
import Customers from "./admin/components/Customers";
import Leads from "./admin/components/Leads";
import CelebrityLeads from "./admin/components/CelebrityLeads";
import Coupons from "./admin/components/Coupons";
import ScrollToTop from "./components/ScrollToTop";
import PhoneLogin from "./components/Phonelogin";
import ProductDetail from "./components/ProductDetail";
import TermsPage from "./components/TermsPage";
import Refundpolicypage from "./components/Refundpolicypage";
import Returnpolicypage from "./components/Returnpolicypage";
import Shippingpolicypage from "./components/Shippingpolicypage";
import Privacypolicypage from "./components/Privacypolicypage";
import Exploreplans from "./components/Exploreplans";
// 🔹 ProtectedRoute Component
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/" />; // Not logged in
  if (role && role !== userRole) return <Navigate to="/" />; // Role mismatch

  return children;
};

// 🔹 Define Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Public Layout
    children: [
      { index: true, element: <Home /> },
      {path: "login", element: <Login /> }, // Example public route
      {path: "register", element: <Register /> },
      {path: "about", element: <About /> },
      {path: "contact", element: <Contact /> },
      {path: "blog", element: <Blog /> },
      {path: "productDetail", element: <ProductDetail /> },
      {path: "productDetail2", element: <ProductDetail2 /> },
      {path: "myorders", element: <ProtectedRoute><Myorders /></ProtectedRoute> },
      { path: "Profilepage", element: <ProtectedRoute><ProfilePage /></ProtectedRoute> },
      { path: "products", element: <Products /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <ProtectedRoute><CheckOut /></ProtectedRoute>  },
      {path: "product/:id", element: <ProductDetail /> },
      {path:"scrolltotop", element:<ScrollToTop /> },
      {path:"login-phone", element:<PhoneLogin /> },
      {path: "TermsPage", element: <TermsPage /> },
      {path: "Refundpolicypage", element: <Refundpolicypage /> },
      {path: "Returnpolicypage", element: <Returnpolicypage /> },
      {path: "Shippingpolicypage", element: <Shippingpolicypage/> },
      {path: "Privacypolicypage", element: <Privacypolicypage /> },
      {path: "Exploreplans", element: <Exploreplans /> }, // Catch-all route
    
    ],
  },

  // 🔹 Admin Dashboard (Protected)
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminDashboard /> },
      // {path: "sidebar", element: <Sidebar /> },
      { path: "allproducts", element: <AllProducts /> },
      { path: "orders", element: <OrdersPage /> },
      { path: "customers", element: <Customers /> },
      {path:"leads", element:<Leads /> },
      {path:"celebrity-leads/:celebrityName", element:<CelebrityLeads/> },
      // {path:"celebrity-leads/:celebrityName", element:<CelebrityLeads /> },


      {path:"coupons", element:<Coupons /> },

    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
