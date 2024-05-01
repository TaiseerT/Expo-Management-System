import { Button, Form, Input, Upload } from 'antd';
import api from '../services/api'
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { Link } from 'react-router-dom';

export default function CreateInvestor() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [brand_name, setBrandName] = useState("");
  const [brand_info, setBrandInfo] = useState("");
  const [brand_image, setBrandImage] = useState();
  const navigate = useNavigate();
  const { expoId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    brand_name: "",
    brand_info: "",
    brand_image: "",
    expo_id: "",
  });

  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (confirm_password && value !== confirm_password) {
            stateObj["confirm_password"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirm_password"] = confirm_password
              ? ""
              : error.confirm_password;
          }
          break;

        case "confirm_password":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (password && value !== password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // Append the form values to the FormData object
      formData.append("name", values.name);
      formData.append("info", values.info);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("confirm_password", values.confirm_password);
      formData.append("brand_name", values.brand_name);
      formData.append("brand_info", values.brand_info);

      formData.append("expo_id", expoId);
      // Append the image file to the FormData object
      formData.append("brand_image", values.image.file.originFileObj);
      // Make the API call to post the data
      await api.post("/auth/add-investor", formData, config).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Brand Created Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate(`/expos/${expoId}/expo-stores`)
        });
      });
      setName("");
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setBrandName("");
      setBrandInfo("");
      setBrandImage("");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
      }).then(() => {
        if (error.response.data.message == "The email has already been taken") {
          navigate(`/expos/${expoId}/expo-stores/add`)
        }
      });
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="space-y-8 divide-y divide-gray-200 pb-7 pl-7 pr-7 pt-7">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-bold leading-6 text-gray-900 pb-5">
              Create an Investor
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Name
              </label>
                
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"name"}>
                    <Input
                      type="text"
                      name="productName"
                      id="productName"
                      value={name}
                      required
                      autoComplete="productName"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Email
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"email"}>
                <Input
                  type="email"
                  required
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  // onBlur={validateInput}
                  />
                  </Form.Item>
                {error.email && <span className="err">{error.email}</span>}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Password
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"password"}>
                <Input
                  type="password"
                  required
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onBlur={validateInput}
                  />
                  </Form.Item>
                {error.password && (
                  <span className="err">{error.password}</span>
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Confirm Password
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"confirm_password"}>
                <Input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  required
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  value={confirm_password}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  onBlur={validateInput}
                  />
                  </Form.Item>
                {error.confirm_password && (
                  <span className="err">{error.confirm_password}</span>
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="company-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Company Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                
                  <Form.Item name={"brand_name"}>
                  <Input
                    type="text"
                    required
                    value={brand_name}
                    onChange={(e) => {
                      setBrandName(e.target.value);
                    }}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                    </Form.Item>
                </div>
              
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Company Description
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                
                <Form.Item name={"brand_info"}>
                  <Input
                    type="text"
                    name="address"
                    id="address"
                    value={brand_info}
                    onChange={(e) => {
                      setBrandInfo(e.target.value);
                    }}
                    required
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                    </Form.Item>
                
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Photo
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500"
                >
                  <Form.Item name={"image"}>
                    <Upload>
                      <Button>Upload Investor's Brand Image</Button>
                    </Upload>
                  </Form.Item>
                </label>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link
            to={`/expos/${expoId}/expo-stores`}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Cancel
          </Link>
          <Button
            htmlType="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
