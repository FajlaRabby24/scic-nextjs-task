"use client";

import React, { useEffect, useState } from "react";

const ProductDetails = ({ params }) => {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className=" p-6 pb-40 mt-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-10">
        {/* Product Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[400px] object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {product.title}
            </h1>

            <p className="text-gray-700 text-base md:text-lg mb-4">
              {product.description}
            </p>

            <p className="text-2xl font-semibold mb-4">
              Price: ${product.price}
            </p>

            {/* Category Badge */}
            {product.category && (
              <span className="badge badge-outline text-lg">
                {product.category}
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="btn btn-primary">Add to Cart</button>
            <button className="btn btn-outline">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
