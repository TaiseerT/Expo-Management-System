/* eslint-disable jsx-a11y/no-redundant-roles */
import { XMarkIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from '../../services/api'
export default function ShoppingCart() {
  const [cart, setCart] = useState([]);
  const { expoId, expoStoreId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
    api
      .get("/fav-products", config)
      .then((res) => setCart(res.data.data));
  });

  if (!cart.length) {
    return (
      <>
        <h1 className="text-3xl text-bold flex justify-center">
          {" "}
          Your cart is empty!
        </h1>
        <Link
          to={`/expos/${expoId}/expo-stores/${expoStoreId}/products`}
          className="flex justify-center text-red-500 hover:text-red-700 font-bold"
        >
          Return to shop
        </Link>
      </>
    );
  } else {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="lg:text-4xl font-bold tracking-tight text-gray-900 md:text-3xl sm:text-4xl">
            Your Wishlist
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Total
            Items: {cart.length}
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-t border-b border-gray-200"
              >
                {cart.map((product, productIdx) => {
                  const Alert = () => {
                    Swal.fire({
                      title: "Are you sure?",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
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
                            });
                          });
                      }
                    });
                  };
                  return (
                    <li key={product.id} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <img
                          src={product.image}
                          alt=""
                          className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <p className="font-medium text-gray-700">
                                  {product.name}
                                </p>
                              </h3>
                            </div>
                            <p className="mt-1 text-sm font-medium text-gray-900">
                              ${product.price}
                            </p>
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                              {product.info}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9">
                            <span className="sr-only">Remove</span>
                            <XMarkIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                              onClick={Alert}
                            />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          </form>
        </div>
      </div>
    );
  }
}
