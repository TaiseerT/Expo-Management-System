import React, { Fragment, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "../../Images/Screen-Shot-2016-03-28-at-10.43.19.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../../LoginProvider";

export default function HomeHeader() {
  const [open, setOpen] = useState(false);
  const loginContext = useContext(LoginContext);

  return (
    <>
      <div className="bg-white">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
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
                    <div className="flow-root">
                      <Link
                        className="-m-2 block p-2  font-medium text-gray-900"
                        to={"/expos"}
                      >
                        Expos
                      </Link>
                    </div>

                    {loginContext.isLoggedIn ? (
                      <div className="flow-root">
                        <button
                          className="-m-2 block p-2  font-medium text-gray-900"
                          onClick={() => {
                            loginContext.setIsLoggedIn("");
                          }}
                        >
                          Log out
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flow-root">
                          <Link
                            to={"/login"}
                            className="-m-2 block p-2 font-medium text-gray-900"
                          >
                            Sign in
                          </Link>
                        </div>
                        <div className="flow-root">
                          <Link
                            to={"/signup"}
                            className="-m-2 block p-2  font-medium text-gray-900"
                          >
                            Create an account
                          </Link>
                        </div>
                      </>
                    )}
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
              <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-6">
                  {loginContext.isLoggedIn ? (
                    <button
                      className="text-sm font-medium text-white hover:text-gray-100"
                      onClick={() => {
                        loginContext.setIsLoggedIn("");
                        window.localStorage.removeItem("isLoggedIn");
                      }}
                    >
                      Log out
                    </button>
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
                      <Link
                        className="pl-5 font-sans text-gray-400 hover:text-gray-500 flex justify-stretch"
                        to={"/expos"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
                          />
                        </svg>
                        Expos
                      </Link>
                    </div>
                    <Link to={"/"}>
                      <span className="sr-only">Your Company</span>
                      <img
                        className="w-auto h-11 hidden lg:block"
                        src={logo}
                        alt=""
                      />
                    </Link>
                    {/* Mobile menu */}
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
                      <div className="flex items-center lg:ml-8"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
    </>
  );
}
