/* eslint-disable jsx-a11y/anchor-is-valid */
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";
import Header from "./Header.jsx";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../LoginProvider.js";
import api from "../../services/api";

const ProductDetail = () => {
  const { addItem } = useCart();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const loginContext = useContext(LoginContext);
  const { productId, expoId, expoStoreId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    api.get(`/products/${productId}`, config).then((res) => {
      setProduct(res.data.data);
      localStorage.getItem("productIsOwned", res.data.is_owned);
      console.log("PRODUCT:", res);
    });
  }, [productId]);
  // const { name, info, image, price } = product;
  const addToCart = () => {
    addItem(product);
  };
  const Alert = () => {
    if (loginContext.isLoggedIn) {
      const config = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      };
      api
        .post(
          "/add-to-fav",
          {
            product_id: product.id,
          },
          config
        )
        .then((res) => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: res.data.message,
            showConfirmButton: false,
            timer: 800,
          }).then(() => {
            addToCart(product);
            product.is_added_to_favourite
              ? (product.is_added_to_favourite = false)
              : (product.is_added_to_favourite = true);
          });
        });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "In order to add to wishlist, you have to be signed in.",
        confirmButtonColor: "#0ea5e9",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">
                  ${product.price}
                </p>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.info}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt=""
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="mt-10">
                  {console.log(product.is_added_to_favourite)}
                  {(product.is_added_to_favourite === true) ? (
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick={Alert}
                    >
                      Remove from wishlist
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex w-full items-center justify-center rounded-md border border-transparent bg-sky-600 py-3 px-8 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      onClick={Alert}
                    >
                      Add to wishlist
                    </button>
                  )}
                </div>
                <div className="mt-6 text-center">
                  {loginContext.isLoggedIn &&
                  loginContext.role === "INVESTOR" &&
                  localStorage.getItem("productIsOwned") === "true" ? (
                    <div>
                      <Link
                        to={`/expos/${expoId}/expo-stores/${expoStoreId}/products/edit-product/${productId}`}
                        className="mb-6 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 py-3 px-8 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Edit Product
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                  <a
                    href="#"
                    className="group inline-flex text-base font-medium"
                  >
                    <ShieldCheckIcon
                      className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="text-gray-500 hover:text-gray-700">
                      Lifetime Guarantee
                    </span>
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetail;
