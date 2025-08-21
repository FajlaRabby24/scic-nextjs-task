import Link from "next/link";

const ProductCard = ({ product }) => {
  const { image, title, price, description } = product;
  return (
    <div className="card bg-base-100  shadow-sm">
      <figure>
        <img className="max-h-[150px] object-cover" src={image} alt={title} />
      </figure>
      <div className="card-body">
        <h2 className="text-md font-semibold">{title}</h2>
        <p className="text-lg font-semibold">${price}</p>
        <div className="card-actions justify-end">
          <Link href={`/products/${product.id}`}>
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
