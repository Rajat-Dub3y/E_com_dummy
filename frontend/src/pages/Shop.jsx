import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import {
  setcategories,
  setProduct,
  setchecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";
import ProductCard from "./Products/ProductCard";
import clsx from "clsx";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPrice] = useState("");

  const filteredProductQuery = useGetFilteredProductsQuery({ checked, radio });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setcategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductQuery.isLoading) {
        const filteredProducts = filteredProductQuery.data.filter((product) => {
          return (
            product.price.toString().includes(priceFilter) ||
            product.price === parseInt(priceFilter, 10)
          );
        });
        dispatch(setProduct(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductQuery, priceFilter]);

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProduct(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedCheck = value
      ? [...checked, id]
      : checked.filter((c) => c === id);
    dispatch(setchecked(updatedCheck));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex md:flex-row">
          <div className="bg-white p-3 mt-2 mb-2">
            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
              Filter by Category
            </h2>
            <div className="p-5 w-[15rem]">
              {categories?.map((c) => (
                <div key={c._id} className="mb-2">
                  <div className="flex items-center mr-4">
                    <input
                      type="checkbox"
                      id={`cat-${c._id}`}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className={clsx(
                        "w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded",
                        "focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2",
                        "dark:bg-gray-700 dark:border-gray-600"
                      )}
                    />
                    <label
                      htmlFor={`cat-${c._id}`}
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {c.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
              Filter by Brand
            </h2>
            <div className="p-5">
              {uniqueBrands?.map((brand) => (
                <div key={brand}>
                  <div className="flex items-center mr-4 mb-5">
                    <input
                      type="radio"
                      id={brand}
                      name="brand"
                      onChange={() => handleBrandClick(brand)}
                      className={clsx(
                        "w-4 h-4 text-pink-400 bg-gray-100 border-gray-300",
                        "focus:ring-pink-500 dark:focus:ring-pink-600 dark:ring-offset-gray-800 focus:ring-2",
                        "dark:bg-gray-700 dark:border-gray-600"
                      )}
                    />
                    <label
                      htmlFor={brand}
                      className="ml-2 text-sm font-medium text-black dark:text-gray-300"
                    >
                      {brand}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="h4 text-center py-2 bg-white rounded-full mb-2">
              Filter by Price
            </h2>
            <div className="p-5 w-[15rem]">
              <input
                type="text"
                placeholder="Enter Price"
                value={priceFilter}
                onChange={handlePriceChange}
                className={clsx(
                  "w-full px-3 py-2 placeholder-gray-400 border rounded-lg",
                  "focus:outline-none focus:ring focus:border-pink-300"
                )}
              />
            </div>

            <div className="p-5 pt-0">
              <button
                className="w-full border my-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="p-3 flex-1">
            <h2 className="h4 text-center mb-2">{products?.length}</h2>
            <div className="flex flex-wrap gap-4">
              {products?.length === 0 ? (
                <Loader />
              ) : (
                products.map((p) => (
                  <div className="p-3 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                    <div className="h-full">
                      <ProductCard p={p} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;