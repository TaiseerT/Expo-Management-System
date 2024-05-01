import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api.js";
import { Upload, Button, Form, Input, DatePicker, Space } from "antd";
import Swal from "sweetalert2";

export default function ExpoForm() {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    },
  };
  // Handle form submission
  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const formData = new FormData();
      // Append the form values to the FormData object
      formData.append("name", values.name);
      formData.append("info", values.info);
      formData.append("address", values.address);

      const expiresAt = new Date(values.expires_at);
      const formattedDate = expiresAt.toLocaleDateString("en-GB", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
      });
      formData.append("expires_at", formattedDate);
      console.log(formattedDate)
      // Append the image file to the FormData object
      formData.append("image", values.image.file.originFileObj);
      // Make the API call to post the data
      await api.post("/expos", formData, config).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Expo Created Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate("/expos")
        });
      });
      setName("");
      setInfo("");
      setAddress("");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error",
        showConfirmButton: false,
        timer: 700,
      });
    }
  };

  return (
    <>
      <Form
        onFinish={handleSubmit}
        className="space-y-8 divide-y divide-gray-200 pt-8 pl-10 pb-8 pr-10"
      >
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">
            <div>
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Create an expo
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Expo Name
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Form.Item
                    name={"name"}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  >
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="name"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="info"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Description
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Form.Item name={"info"}>
                    <Input
                      type="text"
                      name="info"
                      id="info"
                      autoComplete="info"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      value={info}
                      onChange={(e) => {
                        setInfo(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences info the expo.
                  </p>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Address
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Form.Item
                    name={"address"}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                  >
                    <Input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="address"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Expo Image
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Form.Item name={"image"}>
                    <Upload>
                      <Button>Upload Expo Image</Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>

              <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="expires_at"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Expo Expiry Date
                </label>
                <div className="mt-1 sm:col-span-2 sm:mt-0">
                  <Form.Item name={"expires_at"}>
                    <DatePicker />
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <Link to={"/expos"}>
              <button
                type="button"
                className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </Link>
            <Button
              htmlType="submit"
              className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-400 hover:bg-sky-600 focus:bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
