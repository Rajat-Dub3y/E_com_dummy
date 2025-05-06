import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import clsx from "clsx";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added");
  };

  return (
    <div
      className={clsx(
        "max-w-sm rounded-lg shadow bg-white",
        "flex flex-col justify-between h-auto max-h-[400px]"
      )}
    >
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span
            className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full"
          >
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full object-cover"
            src={p.image}
            alt={p.name}
            style={{ height: "170px" }}
          />
        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="p-4 flex flex-col justify-between h-full">
        <div className="flex justify-between items-start mb-1">
          <h5 className="text-lg font-medium text-black">{p?.name}</h5>
          <p className="text-pink-500 font-semibold text-sm">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="text-sm text-gray-800 mb-3">
          {p?.description?.substring(0, 40)}...
        </p>

        <div className="flex justify-between items-center mt-auto">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-black bg-pink-700 hover:bg-pink-800 rounded-lg focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="p-2 rounded-full hover:bg-gray-200 transition"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;