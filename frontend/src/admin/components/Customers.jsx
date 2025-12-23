// import React, { useState } from "react";
// import Sidebar from "./Sidebar";
// import {
//   useGetCustomersQuery,
//   useAddCustomerMutation,
//   useUpdateCustomerMutation,
//   useDeleteCustomerMutation,
// } from "../../services/customersApi";

// function Customers() {
//   const { data: customers = [], isLoading } = useGetCustomersQuery();
//   const [addCustomer] = useAddCustomerMutation();
//   const [updateCustomer] = useUpdateCustomerMutation();
//   const [deleteCustomer] = useDeleteCustomerMutation();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     mobile: "",
//     address: "",
//     role: "user",
//   });

//   const [editing, setEditing] = useState(null); // store editing customer

//   const handleAdd = async () => {
//     if (editing) {
//       await updateCustomer({ id: editing._id, ...form });
//       setEditing(null);
//     } else {
//       await addCustomer(form);
//     }
//     setForm({ name: "", email: "", mobile: "", address: "", role: "user" });
//   };

//   const handleEdit = (cust) => {
//     setEditing(cust);
//     setForm({
//       name: cust.name,
//       email: cust.email,
//       mobile: cust.mobile,
//       address: cust.address,
//       role: cust.role,
//     });
//   };

//   const handleDelete = async (id) => {
//     await deleteCustomer(id);
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-6">Customers</h1>

//         {/* Add / Edit Customer Form */}
//         <div className="mb-6 bg-white p-4 rounded shadow">
//           <input
//             className="border p-2 mr-2"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//           />
//           <input
//             className="border p-2 mr-2"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />
//           <input
//             className="border p-2 mr-2"
//             placeholder="Mobile"
//             value={form.mobile}
//             onChange={(e) => setForm({ ...form, mobile: e.target.value })}
//           />
//           {/* <input
//             className="border p-2 mr-2"
//             placeholder="Address"
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//           /> */}
//           <select
//             className="border p-2 mr-2"
//             value={form.role}
//             onChange={(e) => setForm({ ...form, role: e.target.value })}
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>

//           <button
//             onClick={handleAdd}
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {editing ? "Update" : "Add"}
//           </button>
//           {editing && (
//             <button
//               onClick={() => {
//                 setEditing(null);
//                 setForm({ name: "", email: "", mobile: "", address: "", role: "user" });
//               }}
//               className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//             >
//               Cancel
//             </button>
//           )}
//         </div>

//         {isLoading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full bg-white rounded shadow">
//             <thead>
//               <tr>
//                 <th className="px-6 py-3">Name</th>
//                 <th className="px-6 py-3">Email</th>
//                 <th className="px-6 py-3">Mobile</th>
//                 {/* <th className="px-6 py-3">Address</th> */}
//                 <th className="px-6 py-3">Role</th>
//                 <th className="px-6 py-3">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {customers.map((cust) => (
//                 <tr key={cust._id} className="border-b">
//                   <td className="px-6 py-3">{cust.name}</td>
//                   <td className="px-6 py-3">{cust.email}</td>
//                   <td className="px-6 py-3">{cust.mobile}</td>
//                   {/* <td className="px-6 py-3">{cust.address}</td> */}
//                   <td className="px-6 py-3">{cust.role}</td>
//                   <td className="px-6 py-3">
//                     <button
//                       onClick={() => handleEdit(cust)}
//                       className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(cust._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </main>
//     </div>
//   );
// }

// export default Customers;



import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} from "../../services/customersApi";

function Customers() {
  const { data: customers = [], isLoading } = useGetCustomersQuery();
  const [addCustomer] = useAddCustomerMutation();
  const [updateCustomer] = useUpdateCustomerMutation();
  const [deleteCustomer] = useDeleteCustomerMutation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    role: "user",
  });

  const [editing, setEditing] = useState(null); // store editing customer

  // const handleAdd = async () => {
  //   if (editing) {
  //     await updateCustomer({ id: editing._id, ...form });
  //     setEditing(null);
  //   } else {
  //     await addCustomer(form);
  //   }
  //   setForm({ name: "", email: "", mobile: "", address: "", role: "user" });
  // };

  // const handleEdit = (cust) => {
  //   setEditing(cust);
  //   setForm({
  //     name: cust.name,
  //     email: cust.email,
  //     // mobile: cust.mobile,
      
  //       mobile: cust.addresses?.[0]?.mobile || "",
  //     address: cust.address,
  //     role: cust.role,
  //   });
  // };

  const handleAdd = async () => {
  const customerData = {
    name: form.name,
    email: form.email,
    role: form.role,
    addresses: [{ mobile: form.mobile, address: form.address }],
  };

  try {
    if (editing) {
      await updateCustomer({ id: editing._id, ...customerData });
      setEditing(null);
    } else {
      await addCustomer(customerData);
    }

    setForm({ name: "", email: "", mobile: "", address: "", role: "user" });
  } catch (err) {
    console.log(err);
  }
};
const handleEdit = (cust) => {
  setEditing(cust);
  setForm({
    name: cust.name,
    email: cust.email,
    mobile: cust.addresses?.[0]?.mobile || "",
    address: cust.addresses?.[0]?.address || "",
    role: cust.role,
  });
};


  const handleDelete = async (id) => {
    await deleteCustomer(id);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-y-auto ml-0 lg:ml-64 p-4 sm:p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Customers</h1>

        {/* Responsive Add / Edit Form */}
        <div className="mb-6 bg-white p-4 sm:p-6 rounded shadow flex flex-col sm:flex-row flex-wrap gap-2 items-center">
          <input
            className="border p-2 rounded flex-1 min-w-[150px]"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded flex-1 min-w-[150px]"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 rounded flex-1 min-w-[150px]"
            placeholder="Mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          />
          <select
            className="border p-2 rounded flex-1 min-w-[120px]"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-2 mt-2 sm:mt-0">
            <button
              onClick={handleAdd}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              {editing ? "Update" : "Add"}
            </button>
            {editing && (
              <button
                onClick={() => {
                  setEditing(null);
                  setForm({ name: "", email: "", mobile: "", address: "", role: "user" });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Customers Table */}
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm border-b">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Mobile</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust) => (
                  <tr key={cust._id} className="border-b hover:bg-gray-50 text-sm">
                    <td className="px-4 py-3">{cust.name}</td>
                    <td className="px-4 py-3">{cust.email}</td>
                    {/* <td className="px-4 py-3">{cust.mobile}</td> */}
                    <td className="px-4 py-3">{cust.addresses?.[0]?.mobile || "N/A"}</td>

                    <td className="px-4 py-3">{cust.role}</td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(cust)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(cust._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Customers;
