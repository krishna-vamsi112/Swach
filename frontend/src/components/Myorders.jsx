

import React from "react";
import { useGetMyOrdersQuery } from "../services/ordersApi";
import { useEffect } from "react";  

const MyOrders = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: myOrders = [], isLoading, isError } = useGetMyOrdersQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load orders.</p>;

  return (
    <div className="bg-[#FFF7EC] p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {myOrders.length === 0 ? (
        <p>No successful orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order._id} className="p-4 border rounded bg-white shadow">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> <span className="text-orange-400">₹{order.totalAmount}</span></p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>

              {/* ✅ Tracking Info: Display clickable link if trackingUrl exists */}
              {order.trackingUrl ? (
                <p>
                  <strong>Tracking URL:</strong>{" "}
                  <a
                    href={order.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Track My Order
                  </a>
                </p>
              ) : (
                <p><strong>Tracking URL:</strong> Not available</p>
              )}

              <div>
                <strong>Items:</strong>
                <ul className="list-disc ml-5">
                  {order.items.map((item, i) => (
                    <li key={i}>{item.name} (x{item.qty}) - ₹{item.price}</li>
                  ))}
                </ul>

                <div className="mt-2 justify-end flex">
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    Ordered Successfully
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
