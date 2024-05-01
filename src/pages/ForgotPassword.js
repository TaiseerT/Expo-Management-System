import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
export function ForgotPassword() {
  return (
    <section className="flex flex-col md:flex-row  h-screen items-center">
      <div className="bg-sky-200 hidden lg:block w-full md:w-1/1 x;:w-2/3 h-screen">
        <img
          src={require("../Images/wallpaperflare.com_wallpaper(5).jpg")}
          alt="Expo"
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div
        class="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {/* md:mx-0 */}
        <div className="w-full h-100">
          <h1 className=" mb-4 text-x1 md:text-2xl font-bold leading-tight mt-12">
            Forgot your password?
          </h1>
          <p class="mb-4 text-sm text-gray-700">
            We get it, stuff happens. Just enter your email address below and
            we'll send you a link to reset your password!
          </p>
          <form
            className="mt-6"
            action="#"
            x-data="{password: '', password_confirm: ''}"
            method="POST"
          >
            <div>
              <label class="block text-gray-700">Email Address:</label>
              <input
                type="email"
                name=""
                id=""
                placeholder="example@example.com"
                class="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autofocus
                autocomplete
                required
              ></input>
            </div>

            <div class="text-left mt-2">
              <ul>
                <li>
                  <p class="text-sm font-semibold text-gray-700">
                    Already have an account? &nbsp;
                    {/* Endpoint to route to Login component */}
                    <Link className="SignUp_To_Login" to="/login">
                      Login
                    </Link>
                  </p>
                </li>
              </ul>
            </div>

            <div class="text-left mt-2">
              <ul>
                <li>
                  <p class="text-sm font-semibold text-gray-700">
                    Create an account: &nbsp;
                    {/* Endpoint to route to Login component */}
                    <Link className="Login_To_SignUp" to="/signup">
                      Sign Up
                    </Link>
                  </p>
                </li>
              </ul>
            </div>

            <button
              type="submit"
              class="w-full block bg-sky-400 hover:bg-sky-600 focus:bg-sky-600 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
