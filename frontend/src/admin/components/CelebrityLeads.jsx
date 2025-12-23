// import React from "react";
// import { useParams } from "react-router-dom";
// import { useGetOrdersQuery } from "../../services/ordersApi";
// import Sidebar from "./Sidebar";

// function CelebrityLeads() {
//   const { celebrityName } = useParams();
//   const { data: orders = [], isLoading } = useGetOrdersQuery();
  
//   const filteredOrders = orders.filter(
//   (order) =>
//     order.coupon?.createdBy?.toLowerCase() === celebrityName.toLowerCase()
// );


//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* ✅ Sidebar on the left */}
//       <Sidebar />

//       {/* ✅ Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Leads for Celebrity: {celebrityName}
//         </h1>

//         {isLoading ? (
//           <p>Loading orders...</p>
//         ) : filteredOrders.length === 0 ? (
//           <p className="text-gray-500">No leads found for {celebrityName}.</p>
//         ) : (
//           <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
//             <table className="min-w-full border-collapse text-sm text-left">
//               <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-6 py-3">Order ID</th>
//                   <th className="px-6 py-3">Customer</th>
//                   <th className="px-6 py-3">Amount</th>
//                   <th className="px-6 py-3">Coupon</th>
//                   <th className="px-6 py-3">Date</th>
//                 </tr>
//               </thead>
//               {/* <tbody>
//                 {filteredOrders.map((order) => (
//                   <tr key={order._id} className="border-b hover:bg-gray-50">
//                     <td className="px-6 py-3">{order._id}</td>
//                     <td className="px-6 py-3">{order.customerName}</td>
//                     <td className="px-6 py-3">₹{order.total}</td>
//                     <td className="px-6 py-3">{order.coupon?.code}</td>
//                     <td className="px-6 py-3">
//                       {new Date(order.createdAt).toLocaleDateString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody> */}
//               <tbody>
//   {filteredOrders.map((order) => (
//     <tr key={order._id} className="border-b hover:bg-gray-50">
//       <td className="px-6 py-3">{order._id}</td>
//       <td className="px-6 py-3">{order.address?.name}</td>
//       <td className="px-6 py-3">₹{order.totalAmount}</td>
//       <td className="px-6 py-3">{order.coupon?.code}</td>
//       <td className="px-6 py-3">
//         {new Date(order.createdAt).toLocaleDateString()}
//       </td>
//     </tr>
//   ))}
// </tbody>

//             </table>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default CelebrityLeads;


import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrdersQuery } from "../../services/ordersApi";
import Sidebar from "./Sidebar";

function CelebrityLeads() {
  const { celebrityName } = useParams();
  const { data: orders = [], isLoading } = useGetOrdersQuery();

  const filteredOrders = orders.filter(
    (order) =>
      order.coupon?.createdBy?.toLowerCase() === celebrityName.toLowerCase()
  );

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto ml-0 lg:ml-64">
        <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">
          Leads for Celebrity: {celebrityName}
        </h1>

        {isLoading ? (
          <p className="text-center mt-6">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center mt-6">
            No leads found for {celebrityName}.
          </p>
        ) : (
          <>
            {/* Table for large screens */}
            <div className="hidden sm:block overflow-x-auto bg-white shadow-lg rounded-xl">
              <table className="min-w-full border-collapse text-sm text-left">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Customer</th>
                    <th className="px-6 py-3">Amount</th>
                    <th className="px-6 py-3">Coupon</th>
                    <th className="px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-3">{order._id}</td>
                      <td className="px-6 py-3">{order.address?.name || "—"}</td>
                      <td className="px-6 py-3">₹{order.totalAmount}</td>
                      <td className="px-6 py-3">{order.coupon?.code || "—"}</td>
                      <td className="px-6 py-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Card layout for small screens */}
            <div className="sm:hidden flex flex-col gap-4">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-4 rounded-lg shadow-md"
                >
                  <p>
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </p>
                  <p>
                    <span className="font-semibold">Customer:</span>{" "}
                    {order.address?.name || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Amount:</span> ₹{order.totalAmount}
                  </p>
                  <p>
                    <span className="font-semibold">Coupon:</span> {order.coupon?.code || "—"}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default CelebrityLeads;
