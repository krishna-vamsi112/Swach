
// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import {
//   useGetOrdersQuery,
//   useDeleteOrderMutation,
//   useUpdateTrackingMutation,
// } from "../../services/ordersApi";

// const OrdersPage = () => {
//   const {
//     data: orders = [],
//     isLoading,
//     isError,
//     error,
//   } = useGetOrdersQuery();

//   const [deleteOrder] = useDeleteOrderMutation();
//   const [updateTracking] = useUpdateTrackingMutation();
//   const [trackingInputs, setTrackingInputs] = useState({});
//   const [editingTracking, setEditingTracking] = useState({}); 
// // { [orderId]: true/false } to track which order is being edited

//   const [selectedAddress, setSelectedAddress] = useState(null); // For popup

//   const handleDelete = async (orderId) => {
//     if (window.confirm("Are you sure you want to delete this order?")) {
//       try {
//         await deleteOrder(orderId).unwrap();
//         alert("✅ Order deleted successfully");
//       } catch (err) {
//         console.error("Failed to delete order:", err);
//         alert("❌ Failed to delete order");
//       }
//     }
//   };

//   // Save tracking ID only
//   // const handleTrackingSave = async (orderId) => {
//   //   const trackingId = trackingInputs[orderId] || "";
//   //   if (!trackingId) return alert("Please enter a tracking ID");

//   //   try {
//   //     await updateTracking({ id: orderId, trackingId }).unwrap();
//   //     alert("✅ Tracking ID updated successfully");
//   //     setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }));
//   //   } catch (err) {
//   //     console.error("Failed to update tracking:", err);
//   //     alert("❌ Failed to update tracking ID");
//   //   }
//   // };
// // const handleTrackingSave = async (orderId) => {
// //   const trackingUrl = trackingInputs[orderId] || "";

// //   if (!trackingUrl)
// //     return alert("Please enter a tracking URL (https://maps.app.goo.gl/...)");

// //   try {
// //     await updateTracking({
// //       id: orderId,
// //       trackingId: trackingUrl,  // Store the same value as trackingId
// //       trackingUrl: trackingUrl, // Store the full URL
// //     }).unwrap();

// //     alert("✅ Tracking URL updated successfully");
// //     setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }));
// //   } catch (err) {
// //     console.error("Failed to update tracking:", err);
// //     alert("❌ Failed to update tracking URL");
// //   }
// // };
// const handleTrackingSave = async (orderId) => {
//   const trackingUrl = trackingInputs[orderId] || "";

//   if (!trackingUrl)
//     return alert("Please enter a tracking URL (https://maps.app.goo.gl/...)");

//   try {
//     await updateTracking({
//       id: orderId,
//       trackingId: trackingUrl,  // Store the same value
//       trackingUrl: trackingUrl,
//     }).unwrap();

//     alert("✅ Tracking URL updated successfully");

//     // Exit editing mode and clear input
//     setEditingTracking((prev) => ({ ...prev, [orderId]: false }));
//     setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }));
//   } catch (err) {
//     console.error("Failed to update tracking:", err);
//     alert("❌ Failed to update tracking URL");
//   }
// };


//   const handleCopyAddress = () => {
//     if (!selectedAddress) return;
//     navigator.clipboard.writeText(selectedAddress.fullAddress);
//     alert("✅ Address copied to clipboard!");
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <main className="flex-1 p-6">
//         <h2 className="text-2xl font-bold mb-6">Orders</h2>

//         {/* Loading state */}
//         {isLoading && <p className="text-gray-600">Loading orders...</p>}

//         {/* Error state */}
//         {isError && (
//           <p className="text-red-500">
//             Failed to fetch orders: {error?.data?.message || error?.error}
//           </p>
//         )}

//         {/* Empty state */}
//         {!isLoading && !isError && orders.length === 0 && (
//           <p className="text-gray-600">No orders found.</p>
//         )}

//         {/* Orders Table */}
//         {!isLoading && !isError && orders.length > 0 && (
//           <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
//             <table className="min-w-full text-sm text-left">
//               <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
//                 <tr>
//                   <th className="px-4 py-3">Customer</th>
//                   <th className="px-4 py-3">Purchase Date</th>
//                   <th className="px-4 py-3">Contact</th>
//                       <th className="px-4 py-3">Address</th> {/* New Address column */}

//                   <th className="px-4 py-3">Payment ID</th>
//                   <th className="px-4 py-3">Amount</th>
//                   <th className="px-4 py-3">Coupon</th>
//                   <th className="px-4 py-3">Status</th>
//                   <th className="px-4 py-3">Tracking</th>
//                   {/* <th className="px-4 py-3">Actions</th> */}
//                 </tr>
//               </thead>

//               <tbody>
//   {orders.map((order) => {
//     // Combine address fields for popup
//     const fullAddress = order.address
//       ? `${order.address.name || ""}\n${order.address.street || ""}\n${order.address.city || ""}, ${order.address.state || ""} - ${order.address.pincode || ""}\nMobile: ${order.address.mobile || ""}`
//       : "—";

//     return (
//       <tr key={order._id} className="border-b hover:bg-gray-50">
//         <td className="px-4 py-3 font-medium">{order.address?.name || "—"}</td>
//         <td className="px-4 py-3">{new Date(order.createdAt).toLocaleDateString()}</td>
//         <td className="px-4 py-3">{order.address?.mobile || "—"}</td>

//         {/* Address column clickable */}
//         {/* <td
//           className="px-4 py-3 cursor-pointer text-blue-600 underline"
//           onClick={() =>
//             setSelectedAddress({ fullAddress, customer: order.address?.name || "Customer" })
//           }
//         >
//           {order.address
//             ? `${order.address.street || ""}, ${order.address.city || ""}, ${order.address.state || ""} - ${order.address.pincode || ""}`
//             : "—"}
//         </td> */}
//         <td
//           className="px-4 py-3 cursor-pointer text-blue-600 underline"
//           onClick={() =>
//             setSelectedAddress({ fullAddress, customer: order.address?.name || "Customer" })
//           }
//         >
//           {order.address
//             ? `${order.address.street || ""}, ${order.address.city || ""}, ${order.address.state || ""} - ${order.address.pincode || ""}`
//             : "—"}
//         </td>
//         <td className="px-4 py-3">{order.razorpayPaymentId || "—"}</td>
//         <td className="px-4 py-3 font-semibold">₹{order.totalAmount}</td>
//         <td className="px-4 py-3">
//           {order.coupon?.code ? (
//             <span className="text-green-600 font-semibold">{order.coupon.code}</span>
//           ) : (
//             "—"
//           )}
//         </td>
//         <td className="px-4 py-3">
//           <span
//             className={`px-3 py-1 rounded-full text-xs font-semibold ${
//               order.status === "Paid"
//                 ? "bg-green-100 text-green-600"
//                 : order.status === "Unpaid"
//                 ? "bg-red-100 text-red-600"
//                 : "bg-yellow-100 text-yellow-600"
//             }`}
//           >
//             {order.status}
//           </span>
//         </td>
//         {/* <td className="px-4 py-3">
//           {order.trackingId ? (
//             <a
//               href={order.trackingUrl || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`text-blue-600 underline ${!order.trackingUrl ? "cursor-default" : ""}`}
//               onClick={(e) => !order.trackingUrl && e.preventDefault()}
//             >
//               {order.trackingId}
//             </a>
//           ) : (
//             <div className="flex gap-2 items-center">
//               <input
//                 type="text"
//                 placeholder="Tracking URL"
//                 className="border p-1 rounded text-sm w-36"
//                 value={trackingInputs[order._id] || ""}
//                 onChange={(e) =>
//                   setTrackingInputs({ ...trackingInputs, [order._id]: e.target.value })
//                 }
//               />
//               <button
//                 onClick={() => handleTrackingSave(order._id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </td> */}

//       <td className="px-4 py-3">
//   {editingTracking[order._id] || !order.trackingId ? (
//     <div className="flex gap-2 items-center">
//       <input
//         type="text"
//         placeholder="Tracking URL"
//         className="border p-1 rounded text-sm w-36"
//         value={trackingInputs[order._id] || order.trackingId || ""}
//         onChange={(e) =>
//           setTrackingInputs({ ...trackingInputs, [order._id]: e.target.value })
//         }
//       />
//       <button
//         onClick={() => handleTrackingSave(order._id)}
//         className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
//       >
//         Save
//       </button>
//       {order.trackingId && (
//         <button
//           onClick={() =>
//             setEditingTracking((prev) => ({ ...prev, [order._id]: false }))
//           }
//           className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs"
//         >
//           Cancel
//         </button>
//       )}
//     </div>
//   ) : (
//     <div className="flex items-center gap-2">
//       <a
//         href={order.trackingUrl || "#"}
//         target="_blank"
//         rel="noopener noreferrer"
//         className={`text-blue-600 underline ${
//           !order.trackingUrl ? "cursor-default" : ""
//         }`}
//         onClick={(e) => {
//           if (!order.trackingUrl) e.preventDefault();
//         }}
//       >
//         {order.trackingId}
//       </a>
//       <button
//         onClick={() =>
//           setEditingTracking((prev) => ({ ...prev, [order._id]: true }))
//         }
//         className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
//       >
//         Edit
//       </button>
//     </div>
//   )}
// </td>



//         {/* <td className="px-4 py-3">
//           {order.trackingId ? (
//             <a
//               href={order.trackingUrl || "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`text-blue-600 underline ${
//                 !order.trackingUrl ? "cursor-default" : ""
//               }`}
//               onClick={(e) => {
//                 if (!order.trackingUrl) e.preventDefault();
//               }}
//             >
//               {order.trackingId}
//             </a>
//           ) : (
//             <div className="flex gap-2 items-center">
//               <input
//                 type="text"
//                 placeholder="Tracking ID"
//                 className="border p-1 rounded text-sm w-32"
//                 value={trackingInputs[order._id] || ""}
//                 onChange={(e) =>
//                   setTrackingInputs({
//                     ...trackingInputs,
//                     [order._id]: e.target.value,
//                   })
//                 }
//               />
//               <button
//                 onClick={() => handleTrackingSave(order._id)}
//                 className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </td> */}
//         {/* <td className="px-4 py-3">
//           <button
//             onClick={() => handleDelete(order._id)}
//             className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//           >
//             Delete
//           </button>
//         </td> */}
//       </tr>
//     );
//   })}
// </tbody>
//             </table>
//           </div>
//         )}
//         {selectedAddress && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
//       <h3 className="text-lg font-bold mb-4">
//         {selectedAddress.customer}'s Address
//       </h3>
//       <pre className="text-sm whitespace-pre-wrap">{selectedAddress.fullAddress}</pre>
//       <div className="mt-4 flex justify-end gap-2">
//         <button
//           onClick={handleCopyAddress}
//           className="bg-green-500 text-white px-3 py-1 rounded"
//         >
//           Copy
//         </button>
//         <button
//           onClick={() => setSelectedAddress(null)}
//           className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       </main>
//     </div>
//   );
// };

// export default OrdersPage;


import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetOrdersQuery,
  useDeleteOrderMutation,
  useUpdateTrackingMutation,
} from "../../services/ordersApi";

const OrdersPage = () => {
  const { data: orders = [], isLoading, isError, error } = useGetOrdersQuery();
  const [deleteOrder] = useDeleteOrderMutation();
  const [updateTracking] = useUpdateTrackingMutation();

  const [trackingInputs, setTrackingInputs] = useState({});
  const [editingTracking, setEditingTracking] = useState({});
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId).unwrap();
        alert("✅ Order deleted successfully");
      } catch (err) {
        console.error("Failed to delete order:", err);
        alert("❌ Failed to delete order");
      }
    }
  };

  const handleTrackingSave = async (orderId) => {
    const trackingUrl = trackingInputs[orderId] || "";

    if (!trackingUrl)
      return alert("Please enter a tracking URL (https://maps.app.goo.gl/...)");

    try {
      await updateTracking({
        id: orderId,
        trackingId: trackingUrl,
        trackingUrl: trackingUrl,
      }).unwrap();

      alert("✅ Tracking URL updated successfully");
      setEditingTracking((prev) => ({ ...prev, [orderId]: false }));
      setTrackingInputs((prev) => ({ ...prev, [orderId]: "" }));
    } catch (err) {
      console.error("Failed to update tracking:", err);
      alert("❌ Failed to update tracking URL");
    }
  };

  const handleCopyAddress = () => {
    if (!selectedAddress) return;
    navigator.clipboard.writeText(selectedAddress.fullAddress);
    alert("✅ Address copied to clipboard!");
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-4 sm:p-6 lg:ml-64 overflow-x-auto">
        <h2 className="text-2xl font-bold mb-6">Orders</h2>

        {/* Loading, Error, Empty States */}
        {isLoading && <p className="text-gray-600">Loading orders...</p>}
        {isError && (
          <p className="text-red-500">
            Failed to fetch orders: {error?.data?.message || error?.error}
          </p>
        )}
        {!isLoading && !isError && orders.length === 0 && (
          <p className="text-gray-600">No orders found.</p>
        )}

        {/* Orders Table */}
        {!isLoading && !isError && orders.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Purchase Date</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">Address</th>
                  <th className="px-4 py-3">Payment ID</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Coupon</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Tracking</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const fullAddress = order.address
                    ? `${order.address.name || ""}\n${order.address.street || ""}\n${order.address.city || ""}, ${order.address.state || ""} - ${order.address.pincode || ""}\nMobile: ${order.address.mobile || ""}`
                    : "—";

                  return (
                    <tr
                      key={order._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-3 font-medium">
                        {order.address?.name || "—"}
                      </td>
                      <td className="px-4 py-3">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">{order.address?.mobile || "—"}</td>
                      <td
                        className="px-4 py-3 cursor-pointer text-blue-600 underline"
                        onClick={() =>
                          setSelectedAddress({
                            fullAddress,
                            customer: order.address?.name || "Customer",
                          })
                        }
                      >
                        {order.address
                          ? `${order.address.street || ""}, ${order.address.city || ""}, ${order.address.state || ""} - ${order.address.pincode || ""}`
                          : "—"}
                      </td>
                      <td className="px-4 py-3">{order.razorpayPaymentId || "—"}</td>
                      <td className="px-4 py-3 font-semibold">₹{order.totalAmount}</td>
                      <td className="px-4 py-3">
                        {order.coupon?.code ? (
                          <span className="text-green-600 font-semibold">
                            {order.coupon.code}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "Paid"
                              ? "bg-green-100 text-green-600"
                              : order.status === "Unpaid"
                              ? "bg-red-100 text-red-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        {editingTracking[order._id] || !order.trackingId ? (
                          <div className="flex flex-wrap gap-2 items-center">
                            <input
                              type="text"
                              placeholder="Tracking URL"
                              className="border p-1 rounded text-sm w-full sm:w-36"
                              value={trackingInputs[order._id] || order.trackingId || ""}
                              onChange={(e) =>
                                setTrackingInputs({
                                  ...trackingInputs,
                                  [order._id]: e.target.value,
                                })
                              }
                            />
                            <button
                              onClick={() => handleTrackingSave(order._id)}
                              className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Save
                            </button>
                            {order.trackingId && (
                              <button
                                onClick={() =>
                                  setEditingTracking((prev) => ({
                                    ...prev,
                                    [order._id]: false,
                                  }))
                                }
                                className="bg-gray-300 text-gray-700 px-2 py-1 rounded text-xs"
                              >
                                Cancel
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-2 items-center">
                            <a
                              href={order.trackingUrl || "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-blue-600 underline ${
                                !order.trackingUrl ? "cursor-default" : ""
                              }`}
                              onClick={(e) => !order.trackingUrl && e.preventDefault()}
                            >
                              {order.trackingId}
                            </a>
                            <button
                              onClick={() =>
                                setEditingTracking((prev) => ({
                                  ...prev,
                                  [order._id]: true,
                                }))
                              }
                              className="bg-yellow-500 text-white px-2 py-1 rounded text-xs"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Address Modal */}
        {selectedAddress && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
              <h3 className="text-lg font-bold mb-4">{selectedAddress.customer}'s Address</h3>
              <pre className="text-sm whitespace-pre-wrap">{selectedAddress.fullAddress}</pre>
              <div className="mt-4 flex justify-end gap-2 flex-wrap">
                <button
                  onClick={handleCopyAddress}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Copy
                </button>
                <button
                  onClick={() => setSelectedAddress(null)}
                  className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
