import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../services/productsApi";
import {useEffect} from "react";

function ProductDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  
  const { id } = useParams();
  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [variantIndex, setVariantIndex] = useState(0);
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p._id === id);
  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError || !product) return <div className="text-center py-10 text-red-500">Product not found.</div>;

  const selectedVariant = product.variants[variantIndex] || {};
  const pricePerUnit = selectedVariant.price || 0; // Price per variant (not per gram)

  // Calculate total price before discount
  const totalPrice = pricePerUnit * qty;

  // Get the discount from the selected variant
  const discount = selectedVariant.discount || 0;  // Discount percentage from backend (0 if none)
  const discountAmount = totalPrice * (discount / 100);
  const finalPrice = totalPrice - discountAmount;

  // Example product benefits (replace with real data if available)
  // const benefits = product.benefits || [
  //   "Shilajit resin (semi-liquid) is the purest form of Shilajit, with numerous benefits of healthy body, mind & lifestyle",
  //   "Trusted by fitness experts for post-workout recovery and strength",
  //   "Improves sporting performance and physical stamina naturally",
  //   "Potent source of vitamins and minerals",
  //   "Tested by NABL labs and is backed by R&D Experts"
  // ];

  // Example product benefits (based on product name)
let benefits = [];

if (product.name.toLowerCase().includes("shilajit")) {
  benefits = [
    "Shilajit resin (semi-liquid) is the purest form of Shilajit, with numerous benefits of healthy body, mind & lifestyle",
    "Trusted by fitness experts for post-workout recovery and strength",
    "Improves sporting performance and physical stamina naturally",
    "Potent source of vitamins and minerals",
    "Tested by NABL labs and is backed by R&D Experts",
  ];
} else if (product.name.toLowerCase().includes("saffron") || product.name.toLowerCase().includes("kesar")) {
  benefits = [
    "Saffron (Kesar) is one of the purest and most luxurious natural ingredients, known for promoting a healthy body, radiant skin, and balanced lifestyle.",
    "Trusted by wellness experts for its rejuvenating and mood-lifting properties.",
    "Enhances vitality, improves complexion, and supports overall well-being naturally.",
    "Rich in antioxidants, vitamins, and essential minerals.",
    "Tested by NABL-certified labs and backed by R&D experts for guaranteed purity and quality.",
  ];
} else {
  // Fallback for other products
  benefits = product.benefits || ["Experience premium quality and natural goodness",
    "Trusted by fitness experts for post-workout recovery and strength",
    "Improves sporting performance and physical stamina naturally",
    "Potent source of vitamins and minerals",
    "Tested by NABL labs and is backed by R&D Experts",
  ];
}


  // Add to Cart handler
  const handleAddToCart = () => {
    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      discount,

      qty,
      variant: selectedVariant.quantity,
      price: pricePerUnit,
      totalPrice,
      finalPrice,
      type: selectedVariant.quantity,
    };
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingIndex = existingCart.findIndex(
      (item) => item._id === cartItem._id && item.variant === cartItem.variant
    );
    if (existingIndex >= 0) {
      existingCart[existingIndex].qty += qty;
    } else {
      existingCart.push(cartItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 bg-white rounded-2xl shadow-lg p-6 mt-10">
      {/* Left: Product Image and vertical label */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-xs h-auto object-contain rounded-xl mb-4"
        />
        {/* Vertical label */}
        <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 bg-[#667D60] text-white px-3 py-2 rounded-r-xl text-lg font-bold tracking-widest rotate-[-90deg] origin-bottom-left">
          PURE SWACCHH PRODUCTS
        </div>
        {/* Show grams on image bottom left */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-80 text-white px-3 py-1 rounded-lg text-lg font-bold">
          {selectedVariant.quantity}
        </div>
      </div>

      {/* Right: Details */}
      <div className="flex-1 min-w-[300px]">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Swacchh Pure {product.name} Product</h1>

        {/* MRP and Offer Price */}
        <div className="mb-2 flex items-center gap-3">
          <span className="text-gray-500 line-through text-lg">
            M.R.P. ₹{selectedVariant.mrp || (selectedVariant.price ? Math.floor(selectedVariant.price * 1.87) : "-")}
          </span>
          <span className="text-2xl font-bold text-[#b12704]">₹{Math.floor(selectedVariant.price)}</span>
        </div>
        <div className="text-xs text-gray-500 mb-2">Prices are inclusive of all taxes.</div>

        {/* Product Benefits */}
        <div className="mb-4">
          <div className="font-semibold mb-1">Product Benefits</div>
          <ul className="list-disc ml-6 text-gray-700 text-sm space-y-1">
            {benefits.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        </div>

        {/* Weight/Variant Buttons */}
        <div className="mb-4">
          <div className="font-semibold mb-1">Weight</div>
          <div className="flex gap-2 flex-wrap">
            {product.variants.map((v, idx) => (
              <button
                key={idx}
                onClick={() => { setVariantIndex(idx); setQty(1); }}
                className={`px-4 py-2 border rounded-md font-semibold ${variantIndex === idx ? 'bg-[#FFF7EC] border-[#b12704] text-[#b12704]' : 'bg-white border-gray-300 text-gray-700'} transition`}
              >
                {v.quantity}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setQty((q) => Math.max(q - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold"
          >
            -
          </button>
          <span className="w-12 text-center border rounded-md bg-white">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-3 py-1 bg-gray-200 rounded-md text-lg font-bold"
          >
            +
          </button>
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-bold text-lg">Price:</span>
          <span className="text-black font-bold text-lg">
          
             ₹{Math.floor(pricePerUnit)} x {qty} = ₹{Math.floor(totalPrice)}
          </span>
        </div>

        {/* Discount Section */}
        {discount > 0 && (
          <div className="mb-4 text-lg font-bold text-green-600">
            <span>Discount: ({discount}%)</span>
            <span className="line-through text-gray-400">₹{Math.round(discountAmount)}</span>
           <span> - You Save ₹{Math.round(discountAmount)}</span>

          </div>
        )}

        {/* Final Price */}
        <div className="mb-4 text-lg font-bold">
           <span className="text-xl">Final Price: ₹{Math.floor(finalPrice)}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-[#667D60] hover:bg-[#a61c00] text-white font-bold px-8 py-3 rounded-md text-lg transition w-full"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}

export default ProductDetail;