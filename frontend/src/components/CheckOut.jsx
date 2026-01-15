import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddressBook from "./AddressBook";
import OpenRaz from "../Thirdparty/Razorpay/OpenRaz";
import { useGetCouponsQuery } from "../services/couponsApi";
// import { useAddOrderMutation } from "../services/ordersApi";

const CheckoutPage = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [cartItems, setCartItems] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [placingOrder, setPlacingOrder] = useState(false);
  useNavigate();
  const [payement, setPayment] = useState("");

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [error, setError] = useState("");

  // Fetch all coupons
  const { data: coupons } = useGetCouponsQuery();

  // ✅ Load cart from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("checkoutItems")) || [];
    setCartItems(stored);
  }, []);

  // ✅ Calculate subtotal (with item-level discounts)
  const baseprice = cartItems.reduce(
    (sum, item) => sum + Math.floor(item.price) * (item.qty || 1),
    0
  );
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.price - (item.price * item.discount) / 100) * (item.qty || 1),
    0
  );

  // ✅ Apply coupon discount (based on subtotal after item-level discounts)
  const total = Math.max(subtotal - discount, 0); // never negative

  // ✅ Apply coupon
  const handleApplyCoupon = () => {
    if (!couponCode) {
      setError("Please enter a coupon code.");
      return;
    }

    const found = coupons?.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!found) {
      setError("Invalid coupon code");
      setDiscount(0);
      setAppliedCoupon(null);
      return;
    }

    // ✅ Check expiry
    const today = new Date();
    const expiry = new Date(found.expiry);
    if (today > expiry) {
      setError("This coupon has expired.");
      setDiscount(0);
      setAppliedCoupon(null);
      return;
    }

    // ✅ Check minimum order
    if (subtotal < found.minAmount) {
      setError(`Minimum order of ₹${found.minAmount} required.`);
      setDiscount(0);
      setAppliedCoupon(null);
      return;
    }

    // ✅ Apply coupon percentage discount
    const calcCouponDiscount = (subtotal * found.discount) / 100;

    setError("");
    setDiscount(calcCouponDiscount);
    setAppliedCoupon(found);
  };

  // ✅ Recalculate coupon discount when subtotal changes
  useEffect(() => {
    if (appliedCoupon) {
      const calcCouponDiscount = (subtotal * appliedCoupon.discount) / 100;
      setDiscount(calcCouponDiscount);
    }
  }, [subtotal, appliedCoupon]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Address Section */}
        <AddressBook onAddressSelect={setSelectedAddress} />
        {payement !== "" && (
          <OpenRaz
            setIsModalOpen={setPayment}
            selectedAddress={selectedAddress}
            payement={payement}
            cartItems={cartItems}
            setPlacingOrder={setPlacingOrder}
            appliedCoupon={appliedCoupon} // Pass applied coupon
          />
        )}

        {/* Order Summary */}
        <div className="p-4 border rounded-xl bg-white shadow-md">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>

          {cartItems.length === 0 ? (
            <p className="text-gray-600">No items found in checkout.</p>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border rounded-lg p-3 bg-gray-50"
                >
                  <img
                    src={item.image && (item.image.startsWith('http://') || item.image.startsWith('https://')) ? item.image : '/default-image.png'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="ml-3 flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Type: {item.type || "default"}
                    </p>
                    <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                    <p className="text-sm text-gray-600">Discount: {item.discount}%</p>
                  </div>
                  {/* <p className="font-bold">
                    ₹{(item.price - (item.price * item.discount) / 100) * (item.qty || 1)}
                  </p> */}
                  <p className="font-bold">
  ₹{Math.floor((item.price - (item.price * item.discount) / 100) * (item.qty || 1))}
</p>

                </div>
              ))}

              {/* Coupon Section */}
              <div className="mt-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 border rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Apply
                  </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-1">
                    Coupon <strong>{appliedCoupon.code}</strong> applied (
                    {appliedCoupon.discount}% off) 🎉
                  </p>
                )}
              </div>

              {/* Totals */}
              <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Subtotal</span>
                <span>₹{baseprice}</span>
              </div>
              {/* <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Discount (Item-Level)</span>
                <span>₹{cartItems.reduce((sum, item) => (item.price * item.discount) / 100 * (item.qty || 1), 0)}</span>
              </div> */}
              <div className="flex justify-between border-t pt-3 font-semibold">
  <span>Discount (Item-Level)</span>
  <span>
    ₹{Math.round(
      cartItems.reduce(
        (sum, item) => sum + ((item.price * item.discount) / 100) * (item.qty || 1),
        0
      )
    )}
  </span>
</div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Total</span>
                <span>₹{Math.floor(total)}</span>
              </div>
            </div>
          )}

          {/* Place Order Button */}
          <button
            onClick={() => setPayment(Math.floor(total))}
            disabled={!selectedAddress || cartItems.length === 0 || placingOrder}
            className={`w-full py-3 rounded-lg mt-4 transition ${!selectedAddress || cartItems.length === 0 || placingOrder
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 text-white"
              }`}
          >
            {placingOrder ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;