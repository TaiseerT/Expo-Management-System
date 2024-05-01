import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Swal from "sweetalert2";
import { LoginContext } from "../LoginProvider";
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginContext = useContext(LoginContext);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleApi = (e) => {
    console.log({ email, password });
    e.preventDefault();
    api
      .get("/auth/login?email=" + email + "&password=" + password)
      .then((result) => {
        console.log(result.data);
        loginContext.setIsLoggedIn(result.data.token);
        loginContext.setName(result.data.data.user.name);
        if (
          result.data.data.user &&
          result.data.data.user.role &&
          result.data.data.user.role.name
        ) {
          loginContext.setRole(result.data.data.user.role.name);
          console.log(result.data.data.user.role.name);
        } else {
          console.log("Error: role not found in response data");
        }
        Swal.fire({
          position: "center",
          // icon: "success",
          title: "Welcome back",
          showConfirmButton: false,
          timer: 900,
        });
        setEmail("");
        setPassword("");
        navigate("/");
        setFailedAttempts(0);
      })
      .catch((error) => {
        setFailedAttempts((prevAttempts) => prevAttempts + 1);
        if (failedAttempts >= 2) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Maximum login attempts reached, login button is disabled.",
            confirmButtonColor: "#0ea5e9",
            showConfirmButton: true,
          });
        } else {
          console.log(error);
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.response.data.message,
            showConfirmButton: false,
            timer: 1550,
          });
          loginContext.setIsLoggedIn("");
          console.log(error);
        }
      });
  };
  return (
    <section className="flex flex-col md:flex-row  h-screen items-center">
      <div className="bg-sky-200 hidden lg:block w-full md:w-1/1 x;:w-2/3 h-screen">
        <img
          src={require("../Images/wallpaperflare.com_wallpaper(5).jpg")}
          alt="Hello!"
          className="w-full h-full object-cover"
        ></img>
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-x1 md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>
          <form className="mt-6">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                required
                autoFocus
                value={email}
                onChange={handleEmail}
              ></input>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
                value={password}
                onChange={handlePassword}
              ></input>
            </div>

            <div className="text-right mt-2">
              <Link className="Forgot_Password" to="/forgot_password">
                Forgot Password?
              </Link>
            </div>

            <div className="text-left mt-2">
              <ul>
                <li>
                  <p className="text-sm font-semibold text-gray-700">
                    Don't have an account? &nbsp;
                    {/* Endpoint to route to Sign Up component */}
                    <Link className="Login_To_SignUp" to="/signup">
                      Sign Up
                    </Link>
                  </p>
                </li>
              </ul>
            </div>
            <button
              type="submit"
              className="w-full block bg-sky-400 hover:bg-sky-600 focus:bg-sky-600 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              onClick={handleApi}
              disabled={failedAttempts >= 3}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
