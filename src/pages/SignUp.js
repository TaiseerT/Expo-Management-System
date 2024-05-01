import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../services/api'
import Swal from "sweetalert2";
import "../App.css";
import { LoginContext } from "../LoginProvider";

export default function SignUp() {
  const loginContext = useContext(LoginContext);
  const checkEmailExists = (email) => {
    api
      .get(`/api/checkEmailExists?email=${email}`)
      .then((result) => {
        if (result.data.emailExists) {
          setError((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Email already exists",
            showConfirmButton: true,
            confirmButtonColor: "#0ea5e9",
          });
        } else {
          setError((prev) => ({
            ...prev,
            email: "",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
    if (name === "email") {
      checkEmailExists(value);
    }
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };
  const handleApi = (e) => {
    e.preventDefault();
    api
      .post("/auth/reg", {
        name: input.name,
        email: input.email,
        password: input.password,
        confirm_password: input.confirmPassword,
      })
      .then((result) => {
        console.log(result.data);
        loginContext.setIsLoggedIn(result.data.token);
        Swal.fire({
          position: "center",
          // icon: "success",
          title: "Welcome!!",
          showConfirmButton: false,
          timer: 900,
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        console.log(error);
      });
  };
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
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        {/* md:mx-0 */}
        <div className="w-full h-100">
          <h1 className="text-x1 md:text-2xl font-bold leading-tight mt-12">
            Create an account
          </h1>
          <form
            className="mt-6"
            action="#"
            x-data="{password: '', password_confirm: ''}"
          >
            <div className="mt-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="John"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                autoFocus
                required
                value={input.name}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.name && <span className="err">{error.name}</span>}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                
                required
                value={input.email}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.email && <span className="err">{error.email}</span>}
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
                value={input.password}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.password && <span className="err">{error.password}</span>}
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                minLength="6"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                focus:bg-white focus:outline-none"
                required
                value={input.confirmPassword}
                onChange={onInputChange}
                onBlur={validateInput}
              ></input>
              {error.confirmPassword && (
                <span className="err">{error.confirmPassword}</span>
              )}
            </div>

            <div className="text-left mt-2">
              <ul>
                <li>
                  <p className="text-sm font-semibold text-gray-700">
                    Already have an account? &nbsp;
                    {/* Endpoint to route to Login component */}
                    <Link className="SignUp_To_Login" to="/login">
                      Login
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
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
