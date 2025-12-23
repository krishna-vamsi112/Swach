
// import React from "react";
// import { motion } from "framer-motion";
// import { useGetAllLeadsQuery } from "../../services/leadsApi";
// import Sidebar from "./Sidebar";  // Ensure Sidebar component is properly imported

// const Leads = () => {
//   const { data: leads, isLoading, isError } = useGetAllLeadsQuery();

//   if (isLoading) return <p>Loading leads...</p>;
//   if (isError) return <p>Error loading leads</p>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />

//       <div className="flex-1 p-8">
//         <h1 className="text-3xl font-bold mb-6 text-center">Leads</h1>

//         <div className="overflow-x-auto bg-white rounded-lg shadow-md">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Phone
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Subject
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Message
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date Submitted
//                 </th>
//               </tr>
//             </thead>

//             <tbody className="bg-white divide-y divide-gray-200">
//               {leads.map((lead) => (
//                 <motion.tr
//                   key={lead._id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {lead.name}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {lead.phone}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {lead.email}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                     {lead.subject}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
//                     {lead.message}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {new Date(lead.createdAt).toLocaleString()}
//                   </td>
//                 </motion.tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Leads;
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetAllLeadsQuery } from "../../services/leadsApi";
import Sidebar from "./Sidebar";

export default function Leads() {
  const { data: leads = [], isLoading, isError } = useGetAllLeadsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  if (isLoading)
    return <p className="text-center mt-10">Loading leads...</p>;
  if (isError)
    return <p className="text-center mt-10">Error loading leads</p>;

  // Calculate pagination details
  const totalLeads = leads.length;
  const totalPages = Math.ceil(totalLeads / leadsPerPage);
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirstLead, indexOfLastLead);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-auto ml-0 lg:ml-64">
        <main className="flex-1 p-4 sm:p-6 bg-gray-50">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Leads
          </h1>

          {/* Responsive Table Container */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
            <table className="min-w-full table-auto text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 text-sm border-b">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Message</th>
                  <th className="p-3">Date Submitted</th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map((lead) => (
                  <motion.tr
                    key={lead._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="border-b hover:bg-gray-50 text-sm"
                  >
                    <td className="p-3 whitespace-nowrap">{lead.name}</td>
                    <td className="p-3 whitespace-nowrap">{lead.phone}</td>
                    <td className="p-3 whitespace-nowrap">{lead.email}</td>
                    <td className="p-3 whitespace-nowrap">{lead.subject}</td>
                    <td className="p-3">{lead.message}</td>
                    <td className="p-3 whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center items-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
