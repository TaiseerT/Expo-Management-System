import { Fragment, useContext, useEffect, useState } from "react";
import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import logo from "../../Images/Screen-Shot-2016-03-28-at-10.43.19.png";
import { useCart } from "react-use-cart";
import { Link, useParams } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";
export default function Header() {
  const [open, setOpen] = useState(false);
  const { isEmpty, totalItems } = useCart();
  const loginContext = useContext(LoginContext);
  const { expoId, expoStoreId } = useParams();

  function renderElement() {
    if (loginContext.isLoggedIn) {
      return (
        <>
          {loginContext.role === "INVESTOR" &&
          localStorage.getItem("brandIsOwned") === "true" ? (
            <Link to={`/expos/${expoId}/expo-stores/${expoStoreId}/addProduct`}>
              <button className=" bg-white hover:bg-gray-200 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Add a product
              </button>
            </Link>
          ) : (
            ""
          )}
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center lg:ml-8">
              {/* Cart */}
              <div className="ml-4 flow-root lg:ml-8">
                <Link
                  to={`/expos/${expoId}/expo-stores/${expoStoreId}/products/cart`}
                  className="group -m-2 flex items-center p-2"
                >
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="sr-only">items in cart, view bag</span>
                  {!isEmpty && (
                    <span
                      style={{
                        position: "relative",
                        right: "-4px",
                      }}
                    ></span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </>
      );
    } else if (loginContext.isLoggedIn && loginContext.role === "USER") {
      return (
        <>
          <div className="ml-4 flow-root lg:ml-8">
            <Link
              to={`/expos/${expoId}/expo-stores/${expoStoreId}/products/cart`}
              className="group -m-2 flex items-center p-2"
            >
              <ShoppingBagIcon
                className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              <span className="sr-only">items in cart, view bag</span>
              {!isEmpty && (
                <span
                  style={{
                    position: "relative",
                    right: "-4px",
                  }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </>
      );
    } else {
      return "";
    }
  }
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pt-5 pb-2">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                  {renderElement()}
                </div>

                <div className="space-y-6 border-t border-gray-200 py-6 px-4"></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div className="bg-gray-900 hidden lg:block">
            <div className=" mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                {loginContext.isLoggedIn ? (
                  <Link
                    to={"/"}
                    className="text-sm font-medium text-white hover:text-gray-100"
                    onClick={() => {
                      loginContext.setIsLoggedIn("");
                    }}
                  >
                    Log out
                  </Link>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Sign in
                    </Link>
                    <Link
                      to={"/signup"}
                      className="text-sm font-medium text-white hover:text-gray-100"
                    >
                      Create an account
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link to={"/"}>
                      <span className="sr-only">Your Company</span>
                      <img className="w-auto h-11" src={logo} alt="" />
                    </Link>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setOpen(true)}
                    >
                      <span className="sr-only">Open menu</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Logo (lg) */}
                  <Link to={"/"} className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img src={logo} alt="" className="h-11 w-auto" />
                  </Link>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      {/* Cart */}

                      {renderElement()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
