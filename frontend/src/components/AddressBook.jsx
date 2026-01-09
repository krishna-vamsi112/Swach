import React, { useState, useEffect } from "react";

const AddressBook = ({ onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    street: "",
    city: "",
    state: "",
  });
  

  // ✅ Fetch addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/users/addresses", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setAddresses(Array.isArray(data) ? data : data.addresses || []);
    } catch (err) {
      console.error("❌ Error fetching addresses:", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // ✅ Form input handler
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // ✅ Save new address (backend-compatible + auto-select)
  const handleSaveAddress = async () => {
    if (!newAddress.name || !newAddress.phone || !newAddress.pincode) {
      return alert("Please fill all required fields");
    }
    if (newAddress.phone.length !== 10) return alert("Phone must be 10 digits");
    if (newAddress.pincode.length !== 6) return alert("Pincode must be 6 digits");

    const mappedAddress = {
      name: newAddress.name,
      mobile: newAddress.phone,
      pincode: newAddress.pincode,
      locality: newAddress.locality,
      address: newAddress.street,
      city: newAddress.city,
      state: newAddress.state,
      landmark: "",
      alternatePhone: "",
      addressType: "Home",
    };

    try {
      const res = await fetch("http://localhost:5000/users/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(mappedAddress),
      });

      if (!res.ok) {
        const err = await res.json();
        return alert("❌ " + (err.error || "Failed to save address"));
      }

      const saved = await res.json();      // <-- get the saved address
      setSelectedId(saved._id);            // <-- auto-select it
      onAddressSelect(saved);              // <-- notify parent

      // Reset form
      setNewAddress({
        name: "",
        phone: "",
        pincode: "",
        locality: "",
        street: "",
        city: "",
        state: "",
      });
      setShowForm(false);
      await fetchAddresses();              // refresh list
    } catch (err) {
      console.error("❌ Error saving address:", err);
    }
  };

  // ✅ CORRECT
const handleDeleteAddress = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/users/addresses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = await res.json();

    if (!res.ok) return alert(data.error || "Failed to delete address");

    setAddresses(data.addresses);  // ✅ use data.addresses
    if (selectedId === id) setSelectedId(null);
  } catch (err) {
    console.error("❌ Error deleting address:", err);
  }
};





  return (
    <div className="p-4 border rounded-xl bg-white shadow-md">
      <h2 className="text-lg font-bold mb-4">Delivery Address</h2>

      {loading && <p className="text-gray-500">Loading addresses...</p>}
      {!loading && addresses.length === 0 && (
        <p className="text-gray-500 italic">No saved addresses found.</p>
      )}

      {addresses.map((addr) => (
        <div
          key={addr._id}
          className={`border rounded-lg p-3 mb-2 flex justify-between items-start cursor-pointer transition ${
            selectedId === addr._id ? "border-blue-600 bg-blue-50" : "border-gray-300"
          }`}
          onClick={() => {
            setSelectedId(addr._id);
            onAddressSelect(addr);
          }}
        >
          <div className="flex">
            <input
              type="radio"
              name="deliveryAddress"
              checked={selectedId === addr._id}
              readOnly
              className="mt-1 mr-3 accent-blue-600"
            />
            <div>
              <p className="font-semibold">
                {addr.name}{" "}
                <span className="ml-2 text-sm text-gray-500">{addr.mobile}</span>
              </p>
              <p className="text-sm text-gray-600">
                {addr.address}, {addr.locality}, {addr.city}, {addr.state} - {addr.pincode}
              </p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(addr._id);
            }}
            className="text-red-600 hover:underline ml-4"
          >
            Delete
          </button>
        </div>
      ))}

      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full border rounded-lg p-3 text-blue-600 mt-3 hover:bg-blue-50"
        >
          + Add a New Address
        </button>
      )}

      {showForm && (
        <div className="border rounded-lg p-4 mt-3 bg-gray-50">
          <h3 className="font-semibold mb-2">Add a New Address</h3>
          {["name", "phone", "pincode", "locality", "street", "city", "state"].map(
            (field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newAddress[field]}
                onChange={handleChange}
                className="w-full border p-2 mb-2 rounded"
              />
            )
          )}
          <button
            onClick={handleSaveAddress}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-700"
          >
            Save & Deliver Here
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
