

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SH2 from "../assets/SH2.png";
import S2 from "../assets/SA3.webp";
import SA1 from "../assets/SA1.webp";
import icon3 from "../assets/icon3.png";
import { useGetProductsQuery } from "../services/productsApi";  // ✅ RTK Query hook
import { useEffect } from "react";



function Products() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: products = [], isLoading, isError } = useGetProductsQuery();
  const [inlineNotification, setInlineNotification] = useState(null);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  const handleVariantChange = (productId, variantIndex) => {
    // Get grams from selected variant
    let grams = 1;
    if (products && products.length) {
      const product = products.find((prod) => prod._id === productId);
      if (product && product.variants[variantIndex] && product.variants[variantIndex].quantity) {
        const match = product.variants[variantIndex].quantity.match(/(\d+)/);
        grams = match ? parseInt(match[1], 10) : 1;
      }
    }
    setSelectedVariants((prev) => ({
      ...prev,
      [productId]: variantIndex,
    }));
    // Set quantity to variant grams on variant change
    setQuantities((prev) => ({
      ...prev,
      [productId]: grams,
    }));
  };

  const handleQtyChange = (productId, type) => {
    setQuantities((prev) => {
      // Get variant grams as minimum
      let grams = 1;
      const variantIndex = selectedVariants[productId] || 0;
      if (products && products.length) {
        const product = products.find((prod) => prod._id === productId);
        if (product && product.variants[variantIndex] && product.variants[variantIndex].quantity) {
          const match = product.variants[variantIndex].quantity.match(/(\d+)/);
          grams = match ? parseInt(match[1], 10) : 1;
        }
      }
      const current = prev[productId] || grams;
      if (type === "inc") {
        return { ...prev, [productId]: current + 1 };
      } else {
        return { ...prev, [productId]: Math.max(current - 1, grams) };
      }
    });
  };

  const handleAddOnly = (product) => {
    const variantIndex = selectedVariants[product._id] || 0;
    const selectedVariant = product.variants[variantIndex];
    const qty = quantities[product._id] || 1;

    const cartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      qty,
      variant: selectedVariant.quantity,
      price: selectedVariant.price,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingIndex = existingCart.findIndex(
      (item) =>
        item._id === cartItem._id && item.variant === cartItem.variant
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].qty += qty;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cartItems", JSON.stringify(existingCart));
    window.dispatchEvent(new Event("cartUpdated"));

    setInlineNotification(product._id);
    setTimeout(() => setInlineNotification(null), 2500);
  };

  const handleBuyNow = (product) => {
    handleAddOnly(product);
    navigate("/cart");
  };

  if (isLoading)
    return <div className="text-center py-10">Loading products...</div>;

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products.
      </div>
    );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        className="bg-[#667D60] text-white py-14 px-6 md:px-16 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex flex-col md:flex-col xl:flex-row items-center justify-between gap-10">
          <motion.div
            className="text-center md:text-left flex flex-col items-center md:items-start"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-6xl font-bold mb-6 font-serif">
              OUR PRODUCT
            </h1>
            <ul className="list-decimal md:ml-10 space-y-0 md:space-y-3 text-xl md:text-3xl font-bold font-serif">
              <li>SAFFRON</li>
              {/* <li>SHILAJIT RESIN</li> */}
            </ul>
          </motion.div>

          <motion.div
            className="relative flex flex-col md:flex-row gap-4 md:gap-6"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={icon3}
              alt="Leaf"
              className="w-16 mx-auto mb-2 md:w-32 h-24 md:mx-0 md:mb-0 md:absolute md:bottom-4 md:left-40 md:-translate-x-96"
            />
            <div className="w-40 md:w-60 md:w-80 rounded-xl overflow-hidden shadow-lg">
              <img src={SA1} alt="Saffron" className="w-full h-full object-cover" />
            </div>
            <div className="w-40 md:w-80 rounded-xl overflow-hidden shadow-lg">
              <img src={S2} alt="Shilajit Resin" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </motion.section>


      <section className="bg-[#FFF7EC] py-12 px-4 sm:px-8 md:px-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Items</h2>

        {/* ✅ Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => {
            const variantIndex = selectedVariants[p._id] || 0;
            const selectedVariant = p.variants[variantIndex] || {};

            // Get variant grams as minimum
            let grams = 1;
            if (selectedVariant.quantity) {
              const match = selectedVariant.quantity.match(/(\d+)/);
              grams = match ? parseInt(match[1], 10) : 1;
            }
            const qty = quantities[p._id] || grams;
            const totalGrams = qty;
            // Price per gram (float, not rounded)
            const pricePerGram = grams > 0 ? selectedVariant.price / grams : 0;
            // If user selects exactly the variant grams, use variant price
            let totalPrice = 0;
            if (totalGrams === grams) {
              totalPrice = selectedVariant.price;
            } else {
              totalPrice = Math.round(pricePerGram * totalGrams);
            }
            // Discount logic
            let discount = 0;
            if (totalGrams >= 20 && totalGrams < 40) {
              discount = 0.10;
            } else if (totalGrams >= 40) {
              discount = 0.11;
            }
            const discountedPrice = Math.floor(totalPrice - totalPrice * discount);

            // Show discount label if applicable
            let discountLabel = '';
            if (discount === 0.10) discountLabel = ' (10% OFF)';
            if (discount === 0.11) discountLabel = ' (11% OFF)';

            return (
              <motion.div
                key={p._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden p-6 relative w-full cursor-pointer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="w-full aspect-[4/3] overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => navigate(`/product/${p._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <motion.img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <h2 className="text-lg sm:text-xl md:text-2xl text-center font-bold mt-4">
                  {p.name}
                </h2>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Products;
