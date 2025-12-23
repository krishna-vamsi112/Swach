// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import {
//   useGetCouponsQuery,
//   useAddCouponMutation,
//   useUpdateCouponMutation,
//   useDeleteCouponMutation,
// } from "../../services/couponsApi";
// import { Link } from "react-router-dom";
// function Coupons() {
//   const { data: coupons = [], isLoading } = useGetCouponsQuery();
//   const [addCoupon] = useAddCouponMutation();
//   const [updateCoupon] = useUpdateCouponMutation();
//   const [deleteCoupon] = useDeleteCouponMutation();

//   const [form, setForm] = useState({
//     code: "",
//     discount: "",
//     minAmount: "",
//     expiry: "",
//     createdBy: "",
//   });

//   const [editingId, setEditingId] = useState(null);

//   // ✅ Handle form submit (Add or Update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (editingId) {
//       await updateCoupon({ id: editingId, ...form });
//       setEditingId(null);
//     } else {
//       await addCoupon(form);
//     }

//     setForm({ code: "", discount: "", minAmount: "", expiry: "", createdBy: "" });
//   };

//   // ✅ Handle edit
//   const handleEdit = (coupon) => {
//     setEditingId(coupon._id);
//     setForm({
//       code: coupon.code,
//       discount: coupon.discount,
//       minAmount: coupon.minAmount,
//       expiry: coupon.expiry.split("T")[0], // format date
//       createdBy: coupon.createdBy,
//     });
//   };

//   // ✅ Handle delete
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this coupon?")) {
//       await deleteCoupon(id);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Coupons</h1>

//         {/* Create / Update Coupon Form */}
//         <div className="bg-white shadow rounded-lg p-6 mb-8">
//           <h2 className="text-lg font-semibold mb-4">
//             {editingId ? "Edit Coupon" : "Generate New Coupon"}
//           </h2>

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               type="text"
//               placeholder="Coupon Code"
//               className="border rounded-lg p-2"
//               value={form.code}
//               onChange={(e) => setForm({ ...form, code: e.target.value })}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Discount (%)"
//               className="border rounded-lg p-2"
//               value={form.discount}
//               onChange={(e) => setForm({ ...form, discount: e.target.value })}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Min Order Amount"
//               className="border rounded-lg p-2"
//               value={form.minAmount}
//               onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
//               required
//             />
//             <input
//               type="date"
//               className="border rounded-lg p-2"
//               value={form.expiry}
//               onChange={(e) => setForm({ ...form, expiry: e.target.value })}
//               required
//             />
//             <input
//               type="text"
//               placeholder="Celebrity Name"
//               className="border rounded-lg p-2"
//               value={form.createdBy}
//               onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
//               required
//             />
//             <button
//               type="submit"
//               className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//             >
//               {editingId ? "Update Coupon" : "Create Coupon"}
//             </button>
//           </form>
//         </div>

//         {/* Coupons List */}
//         <div className="bg-white shadow rounded-lg p-6">
//           <h2 className="text-lg font-semibold mb-4">Available Coupons</h2>

//           {isLoading ? (
//             <p>Loading...</p>
//           ) : coupons.length > 0 ? (
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="px-6 py-3 text-left">Code</th>
//                   <th className="px-6 py-3 text-left">Discount</th>
//                   <th className="px-6 py-3 text-left">Min Amount</th>
//                   <th className="px-6 py-3 text-left">Expiry</th>
//                   <th className="px-6 py-3 text-left">Celebrity</th>
//                   <th className="px-6 py-3 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {coupons.map((coupon) => (
//                   <tr key={coupon._id} className="border-b hover:bg-gray-50">
//                     <td className="px-6 py-3">{coupon.code}</td>
//                     <td className="px-6 py-3">{coupon.discount}%</td>
//                     <td className="px-6 py-3">₹{coupon.minAmount}</td>
//                     <td className="px-6 py-3">
//                       {new Date(coupon.expiry).toLocaleDateString()}
//                     </td>
//                     {/* <td className="px-6 py-3">
//                       {coupon.createdBy}</td> */}
//                                             <td className="px-6 py-3">
//                         <Link
//                           to={`/admin/celebrity-leads/${coupon.createdBy}`}
//                           className="text-blue-600 hover:underline"
//                         >
//                           {coupon.createdBy}
//                         </Link>
                        
//                       </td>

                    
//                     <td className="px-6 py-3">
//                       <button
//                         className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                         onClick={() => handleEdit(coupon)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="bg-red-500 text-white px-3 py-1 rounded"
//                         onClick={() => handleDelete(coupon._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="text-gray-500">No coupons found.</p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Coupons;
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetCouponsQuery,
  useAddCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
} from "../../services/couponsApi";
import { Link } from "react-router-dom";

function Coupons() {
  const { data: coupons = [], isLoading } = useGetCouponsQuery();
  const [addCoupon] = useAddCouponMutation();
  const [updateCoupon] = useUpdateCouponMutation();
  const [deleteCoupon] = useDeleteCouponMutation();

  const [form, setForm] = useState({
    code: "",
    discount: "",
    minAmount: "",
    expiry: "",
    createdBy: "",
  });

  const [editingId, setEditingId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateCoupon({ id: editingId, ...form });
      setEditingId(null);
    } else {
      await addCoupon(form);
    }
    setForm({ code: "", discount: "", minAmount: "", expiry: "", createdBy: "" });
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setForm({
      code: coupon.code,
      discount: coupon.discount,
      minAmount: coupon.minAmount,
      expiry: coupon.expiry.split("T")[0],
      createdBy: coupon.createdBy,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      await deleteCoupon(id);
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col p-4 sm:p-6 lg:ml-64 overflow-x-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Coupons</h1>

        {/* Coupon Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8 w-full max-w-4xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            {editingId ? "Edit Coupon" : "Generate New Coupon"}
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              placeholder="Coupon Code"
              className="border rounded-lg p-2 w-full"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Discount (%)"
              className="border rounded-lg p-2 w-full"
              value={form.discount}
              onChange={(e) => setForm({ ...form, discount: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Min Order Amount"
              className="border rounded-lg p-2 w-full"
              value={form.minAmount}
              onChange={(e) => setForm({ ...form, minAmount: e.target.value })}
              required
            />
            <input
              type="date"
              className="border rounded-lg p-2 w-full"
              value={form.expiry}
              onChange={(e) => setForm({ ...form, expiry: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Celebrity Name"
              className="border rounded-lg p-2 w-full"
              value={form.createdBy}
              onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
              required
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
            >
              {editingId ? "Update Coupon" : "Create Coupon"}
            </button>
          </form>
        </div>

        {/* Coupons Table */}
        <div className="bg-white shadow rounded-lg p-6 w-full overflow-x-auto">
          <h2 className="text-lg font-semibold mb-4">Available Coupons</h2>

          {isLoading ? (
            <p>Loading...</p>
          ) : coupons.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-4 py-2 text-left">Code</th>
                    <th className="px-4 py-2 text-left">Discount</th>
                    <th className="px-4 py-2 text-left">Min Amount</th>
                    <th className="px-4 py-2 text-left">Expiry</th>
                    <th className="px-4 py-2 text-left">Celebrity</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr
                      key={coupon._id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="px-4 py-2">{coupon.code}</td>
                      <td className="px-4 py-2">{coupon.discount}%</td>
                      <td className="px-4 py-2">₹{coupon.minAmount}</td>
                      <td className="px-4 py-2">
                        {new Date(coupon.expiry).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          to={`/admin/celebrity-leads/${coupon.createdBy}`}
                          className="text-blue-600 hover:underline"
                        >
                          {coupon.createdBy}
                        </Link>
                      </td>
                      <td className="px-4 py-2 flex flex-wrap gap-2">
                        <button
                          className="bg-yellow-500 text-white px-3 py-1 rounded"
                          onClick={() => handleEdit(coupon)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded"
                          onClick={() => handleDelete(coupon._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No coupons found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default Coupons;
