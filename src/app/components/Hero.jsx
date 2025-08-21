import Image from "next/image";
import Button from "./Button";


export default function Hero() {
  return (
    <section className="relative w-full bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:flex lg:items-center lg:justify-between lg:gap-12 lg:px-12">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl lg:text-5xl">
            Discover the Best <span className="text-blue-600">Products</span>
            <br />
            For Your Daily Needs
          </h1>
          <p className="mt-4 text-base text-gray-600 dark:text-gray-300 sm:mt-6 sm:text-lg lg:text-xl">
            Shop top-rated gadgets, accessories, and essentials with unbeatable
            prices. Fast delivery, trusted sellers, and the latest trends.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-8 lg:justify-start">
            <Button  >
              Shop Now
            </Button>
            <Button


            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right Content (Hero Image) */}
        <div className="relative mt-10 flex-1 lg:mt-0">
          <Image
            src="/hero-product.png" // 👉 replace with your product/banner image
            alt="Hero Product"
            width={600}
            height={500}
            priority
            className="mx-auto w-full max-w-md rounded-xl shadow-lg lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
}
