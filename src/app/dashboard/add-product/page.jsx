"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [preview, setPreview] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: null,
    },
  });

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return router.push("/login");

  const watchImage = watch("image");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("image", file);
    }
  };

  const onSubmit = (data) => {
    console.log("New Product:", data);
    alert("Product submitted! Check console.");
    reset();
    setPreview(null);
    // TODO: send POST request to /api/products with FormData for image
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add New Product
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title + Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Product Title"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              {...register("category", { required: "Category is required" })}
              placeholder="Product Category"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Price + Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              {...register("price", { required: "Price is required" })}
              placeholder="Product Price"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded border"
              />
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Product Description"
            rows={4}
            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-400 rounded resize-none"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
}
