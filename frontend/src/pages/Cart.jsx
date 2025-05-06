import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {cartItems.length === 0 ? (
          <div className="text-center text-lg text-gray-600">
            Your cart is empty.{" "}
            <Link to="/shop" className="text-pink-600 hover:underline">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">
              Shopping Cart
            </h1>
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-start sm:items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 gap-4"
              >
                <div className="w-24 h-24 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    to={`/product/${item._id}`}
                    className="text-lg font-medium text-pink-600 hover:underline"
                  >
                    {item.name}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">{item.brand}</div>
                  <div className="mt-1 text-md font-bold text-gray-800">
                    ${item.price}
                  </div>
                </div>
                <div className="w-28">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                    className="w-full p-2 border rounded-md text-black bg-white"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option value={x + 1} key={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => removeFromCartHandler(item._id)}
                  className="text-red-600 hover:text-red-800 transition"
                  title="Remove from cart"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            ))}
            <div className="mt-8 w-full max-w-xs sm:max-w-md mx-auto">
              <div className="p-4 rounded-lg bg-white shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold mb-2">
                  Items (
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  )
                </h2>
                <div className="text-2xl font-bold">
                  ${" "}
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
                <button
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                  className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full disabled:opacity-50"
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
