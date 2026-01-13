// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Sidebar from "./Sidebar";
// // import { useGetAllOrdersQuery } from "../../services/ordersApi";
// import { useGetOrdersQuery } from "../../services/ordersApi";
// // import { useGetProductsQuery } from "../../services/productsApi";
// import { useGetCustomersQuery } from "../../services/customersApi";
// // import { useGetTransactionsQuery } from "../../services/transactionsApi";

// const getStatusClasses = (status) => {
//   switch (status) {
//     case "Delivered":
//       return "bg-green-100 text-green-700";
//     case "Pending":
//       return "bg-yellow-100 text-yellow-700";
//     case "Cancelled":
//       return "bg-red-100 text-red-700";
//     default:
//       return "bg-gray-100 text-gray-600";
//   }
// };




// export default function AdminDashboard() {

//   const navigate = useNavigate();
//   const [timeframe, setTimeframe] = useState("all");
  

//   // ✅ Fetch data via RTK hooks (already created in your services folder)
//   // const { data: orders = [] } = useGetAllOrdersQuery();
//   const { data: orders = [] } = useGetOrdersQuery();
//   // const { data: products = [] } = useGetProductsQuery();
//   const { data: customers = [] } = useGetCustomersQuery();
//   // const { data: transactions = [] } = useGetTransactionsQuery();
//     const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
//     const [products, setProducts] = useState([]);

//     React.useEffect(() => {
//   fetch("http://localhost:5000/products")
//     .then((res) => res.json())
//     .then((data) => setProducts(data))
//     .catch((err) => console.error("Error fetching products:", err));
// }, []);

//   // const handleLogout = () => {
//   //   localStorage.clear();
//   //   navigate("/login");
//   // };

//   // ✅ Filter orders by timeframe
//   const filterOrders = () => {
//     if (timeframe === "all") return orders;
//     const now = new Date();

//     return orders.filter((order) => {
//       const orderDate = new Date(order.createdAt);

//       if (timeframe === "today") {
//         return orderDate.toDateString() === now.toDateString();
//       } else if (timeframe === "yesterday") {
//         const yesterday = new Date();
//         yesterday.setDate(now.getDate() - 1);
//         return orderDate.toDateString() === yesterday.toDateString();
//       } else if (timeframe === "week") {
//         const oneWeekAgo = new Date();
//         oneWeekAgo.setDate(now.getDate() - 7);
//         return orderDate >= oneWeekAgo;
//       } else if (timeframe === "month") {
//         const oneMonthAgo = new Date();
//         oneMonthAgo.setMonth(now.getMonth() - 1);
//         return orderDate >= oneMonthAgo;
//       }
//       return true;
//     });
//   };

//   const filteredOrders = filterOrders();

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main */}
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         <main className="flex-1 p-6 bg-gray-50">
//           {/* ✅ Timeframe */}
//           <div className="mb-6 flex justify-between items-center">
//             <div>
//               <label className="text-sm font-medium text-gray-600 mr-3">
//                 Timeframe:
//               </label>
//               <select
//                 value={timeframe}
//                 onChange={(e) => setTimeframe(e.target.value)}
//                 className="px-4 py-2 border rounded-lg text-sm"
//               >
//                 <option value="all">All</option>
//                 <option value="today">Today</option>
//                 <option value="yesterday">Yesterday</option>
//                 <option value="week">This Week</option>
//                 <option value="month">This Month</option>
//               </select>
//             </div>
//             {/* <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded-lg"
//             >
//               Logout
//             </button> */}
//           </div>

//           {/* ✅ Analytics */}
//           <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
//             <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
//               <span className="text-gray-400">No. of Orders</span>
//               <p className="text-2xl font-bold mt-2">{orders.length}</p>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
//               <span className="text-gray-400">No. of Products</span>
//               <p className="text-2xl font-bold mt-2">{products.length}</p>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
//               <span className="text-gray-400">No. of Customers</span>
//               <p className="text-2xl font-bold mt-2">{customers.length}</p>
//             </div>
//             <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
//               <span className="text-gray-400">Total Revenue</span>
//               <p className="text-2xl font-bold mt-2">
//     ₹{totalRevenue.toLocaleString()}
//   </p>
//               {/* <p className="text-2xl font-bold mt-2">
//                 ₹
//                 {transactions
//                   .reduce(
//                     (sum, t) =>
//                       sum + parseInt(t.amount?.toString().replace(/[^0-9]/g, "") || 0),
//                     0
//                   )
//                   .toLocaleString()}
//               </p> */}
//             </div>
//           </div>

//           {/* ✅ Latest 10 Orders */}
//           <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               Latest Orders
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="text-gray-600 text-sm border-b">
//                     <th className="p-3">Order ID</th>
//                     <th className="p-3">Customer</th>
//                     <th className="p-3">Date</th>
//                     <th className="p-3">Total Amount</th>
//                     <th className="p-3">Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredOrders
//                     .slice(-10) // ✅ last 10 orders
//                     .reverse()
//                     .map((order) => (
//                       <tr key={order._id} className="border-b hover:bg-gray-50 text-sm">
//                         <td className="p-3 font-medium">{order._id}</td>
//                         <td className="p-3">{order.address?.name}</td>
//                         <td className="p-3">
//                           {new Date(order.createdAt).toLocaleDateString()}
//                         </td>
//                         <td className="p-3 font-semibold">₹{order.totalAmount}</td>
//                         <td className="p-3">
//                           <span
//                             className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
//                               order.status
//                             )}`}
//                           >
//                             {order.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useGetOrdersQuery } from "../../services/ordersApi";
import { useGetCustomersQuery } from "../../services/customersApi";

const getStatusClasses = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("all");

  const { data: orders = [] } = useGetOrdersQuery();
  const { data: customers = [] } = useGetCustomersQuery();
  const totalRevenue = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );
  const [products, setProducts] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const filterOrders = () => {
    if (timeframe === "all") return orders;
    const now = new Date();

    return orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (timeframe === "today") {
        return orderDate.toDateString() === now.toDateString();
      } else if (timeframe === "yesterday") {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return orderDate.toDateString() === yesterday.toDateString();
      } else if (timeframe === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        return orderDate >= oneWeekAgo;
      } else if (timeframe === "month") {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        return orderDate >= oneMonthAgo;
      }
      return true;
    });
  };

  const filteredOrders = filterOrders();

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content with responsive left margin */}
      <div className="flex-1 flex flex-col overflow-y-auto ml-0 lg:ml-64">
        <main className="flex-1 p-4 sm:p-6 bg-gray-50">
          {/* Timeframe Selector */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mr-3">
                Timeframe:
              </label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                <option value="all">All</option>
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>

          {/* Analytics Cards */}
          <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400">No. of Orders</span>
              <p className="text-2xl font-bold mt-2">{orders.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400">No. of Products</span>
              <p className="text-2xl font-bold mt-2">{products.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400">No. of Customers</span>
              <p className="text-2xl font-bold mt-2">{customers.length}</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow flex flex-col items-center">
              <span className="text-gray-400">Total Revenue</span>
              <p className="text-2xl font-bold mt-2">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Latest Orders Table */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Latest Orders
            </h2>
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="text-gray-600 text-sm border-b">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Total Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders
                  .slice(-10)
                  .reverse()
                  .map((order) => (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50 text-sm"
                    >
                      <td className="p-3 font-medium">{order._id}</td>
                      <td className="p-3">{order.address?.name}</td>
                      <td className="p-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-3 font-semibold">
                        ₹{order.totalAmount}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

