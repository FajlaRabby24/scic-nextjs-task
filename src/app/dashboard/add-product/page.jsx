"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function AddProductPage() {
  const [isUploading, setIsUploading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "", // url instead of file
    },
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      setIsUploading(true);
      const payload = {
        title: data.title.trim(),
        category: data.category.trim(),
        price: parseFloat(data.price),
        description: data.description.trim(),
        image: data.image.trim(), // now just a URL
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add product");

      reset();
      toast.success("Product added successfully!");
      router.push("/products");
    } catch (e) {
      toast.error("Product upload failed. Please try again!");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full"
              placeholder="Product Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Category</label>
            <input
              {...register("category", { required: "Category is required" })}
              className="input input-bordered w-full"
              placeholder="Category"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Price + Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <label className="block text-sm mb-1">Price</label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm mb-1">Image URL</label>
            <input
              type="url"
              {...register("image", { required: "Image URL is required" })}
              className="input input-bordered w-full"
              placeholder="https://example.com/product.png"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full resize-none"
            placeholder="Product description"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            disabled={isUploading}
            type="submit"
            className="btn btn-primary"
          >
            {isUploading && (
              <span className="loading loading-spinner loading-sm"></span>
            )}
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
