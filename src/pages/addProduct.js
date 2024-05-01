import { Button, Form, Input, Upload } from "antd";
import api from "../services/api";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [productImage, setProductImage] = useState(null); // Updated to null
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const { expoId, expoStoreId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      // Append the form values to the FormData object
      formData.append("name", values.name);
      formData.append("info", values.info);
      formData.append("price", values.price);
      formData.append("expo_id", expoId);
      // Append the image file to the FormData object
      formData.append("image", values.image.file.originFileObj);
      // Make the API call to post the data
      await api.post("/products", formData, config).then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Created Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate(`/expos/${expoId}/expo-stores/${expoStoreId}/products`)
        });
      });
      setProductId(0);
      setProductName("");
      setProductImage("");
      setProductDesc("");
      setProductPrice("");
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      className="space-y-8 divide-y divide-gray-200 pl-7 pt-7 pr-7 pb-7 "
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Add a Product
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Product Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                
                  <Form.Item name={"name"}>
                    <Input
                      type="text"
                      name="productName"
                      id="productName"
                      value={productName}
                      required
                      autoComplete="productName"
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                      onChange={(e) => {
                        setProductName(e.target.value);
                      }}
                    />
                  </Form.Item>
                
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"info"}>
                  <TextArea
                    rows={3}
                    className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    defaultValue={""}
                    value={productDesc}
                    onChange={(e) => {
                      setProductDesc(e.target.value);
                    }}
                  />
                </Form.Item>
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about the product.
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Image
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md bg-white font-medium text-sky-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-sky-500 focus-within:ring-offset-2 hover:text-sky-500"
                >
                  <Form.Item name={"image"}>
                    <Upload>
                      <Button>Upload Product Image</Button>
                    </Upload>
                  </Form.Item>
                </label>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Price
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                
                  <Form.Item name={"price"}>
                    <Input
                      type="text"
                      name="price"
                      id="price"
                      required
                      autoComplete="Price"
                      value={productPrice}
                      className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    />
                  </Form.Item>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link to={`/expos/${expoId}/expo-stores/${expoStoreId}/products`}>
            <button
              type="button"
              className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            >
              Cancel
            </button>
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
