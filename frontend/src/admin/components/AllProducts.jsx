import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "../../services/productsApi";
import { toast } from "react-hot-toast";

const AllProducts = () => {
  const { data: products = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [form, setForm] = useState({
    name: "",
    image: "",
    variants: [{ quantity: "", price: "",discount: "" }],
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm({ ...form, image: data.imageUrl });
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  const handleVariantChange = (index, key, value) => {
    const variants = form.variants.map((variant, i) =>
      i === index ? { ...variant, [key]: value } : variant
    );
    setForm({ ...form, variants });
  };

  const addVariant = () =>
    setForm({ ...form, variants: [...form.variants, { quantity: "", price: "",discount: "" }] });

  const removeVariant = (index) => {
    const variants = form.variants.filter((_, i) => i !== index);
    setForm({ ...form, variants });
  };

  const handleAdd = async () => {
    try {
      await addProduct(form).unwrap();
      toast.success("Product added successfully");
      setForm({ name: "", image: "", variants: [{ quantity: "", price: "",discount: "" }] });
    } catch (err) {
      toast.error(err.data?.error || "Failed to add product");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProduct({ id: form._id, ...form }).unwrap();
      toast.success("Product updated successfully");
      setForm({ name: "", image: "", variants: [{ quantity: "", price: "",discount: "" }] });
    } catch (err) {
      toast.error(err.data?.error || "Failed to update product");
    }
  };

  const handleEdit = (product) => setForm(product);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error(err.data?.error || "Failed to delete product");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto ml-0 lg:ml-64">
        <h1 className="text-2xl font-bold mb-4 text-center sm:text-left">Manage Products</h1>

        {/* Form */}
        <div className="flex flex-col gap-2 mb-4 bg-white p-4 rounded shadow">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={form.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded w-full"
          />

          {form.image && (
            <img
              src={form.image}
              alt="preview"
              className="w-20 h-20 object-cover rounded mt-2"
            />
          )}

          <h2 className="font-semibold mt-2">Variants (Quantity + Price)</h2>
          {form.variants.map((variant, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-2 items-center">
              <input
                type="text"
                placeholder="Quantity (e.g., 10g)"
                value={variant.quantity}
                onChange={(e) => handleVariantChange(i, "quantity", e.target.value)}
                className="border p-2 rounded w-full sm:w-1/3"
              />
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => handleVariantChange(i, "price", e.target.value)}
                className="border p-2 rounded w-full sm:w-1/3"
              />
              <input
                type="number"
                placeholder="Discount (%)"
                value={variant.discount}
                onChange={(e) => handleVariantChange(i, "discount", e.target.value)}
                className="border p-2 rounded w-full sm:w-1/3"
              />
              <button
                onClick={() => removeVariant(i)}
                className="bg-red-500 text-white px-2 py-1 rounded w-full sm:w-auto"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            onClick={addVariant}
            className="bg-gray-500 text-white px-4 py-2 rounded w-full sm:w-fit"
          >
            + Add Variant
          </button>

          {form._id ? (
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-fit"
            >
              Update
            </button>
          ) : (
            <button
              onClick={handleAdd}
              className="bg-green-500 text-white px-4 py-2 rounded w-full sm:w-fit"
            >
              Add
            </button>
          )}
        </div>

        {/* Products Table for large screens */}
        <div className="hidden sm:block overflow-x-auto bg-white shadow rounded">
          <table className="min-w-full border-collapse text-sm text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Variants</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b">
                  <td className="p-2 border">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="p-2 border">{p.name}</td>
                  
                  <td className="p-2 border">
                    {p.variants.map((v, i) => (
                      <div key={i}>
                        {v.quantity} - ₹{v.price} - {v.discount}% off
                      </div>
                    ))}
                  </td>
                  <td className="p-2 border flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="sm:hidden flex flex-col gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow flex flex-col gap-2">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-40 object-cover rounded"
                />
              )}
              <p>
                <span className="font-semibold">Name:</span> {p.name}
              </p>
              <div>
                <span className="font-semibold">Variants:</span>
                {p.variants.map((v, i) => (
                  <div key={i}>
                    {v.quantity} - ₹{v.price}
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-400 text-white px-2 py-1 rounded flex-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded flex-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
