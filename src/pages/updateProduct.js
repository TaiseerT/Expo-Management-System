import { Button, Form, Input, Upload } from "antd";
import api from "../services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TextArea from "antd/es/input/TextArea";

export default function UpdateProduct() {
  const navigate = useNavigate();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const deleteClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0ea5e9",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/products/${productId}`, config)
          .then((res) => {
            // Handle successful response
            Swal.fire("Deleted!", "Your product has been deleted.", "success");
            navigate("/");
          })
          .catch((error) => {
            // Log and handle error
            console.log(error);
          });
      }
    });
  };
  const { productId, expoId, expoStoreId } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    api.get(`/products/${productId}`, config).then((res) => {
      setProduct(res.data.data);
    });
  }, [productId]);
  // const { title, description, images, price } = product;

  const handleSubmit = async (values) => {
    // values.preventDefault();
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("info", values.info);
    formData.append("price", values.price);
    if (values.image) {
      formData.append("image", values.image?.file?.originFileObj);
    }
    formData.append("_method", "PUT");
    await api
      .post(`/products/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Product Updated Successfully",
          showConfirmButton: false,
          timer: 1000,
        }).then(() => {
          navigate(`/expos/${expoId}/expo-stores/${expoStoreId}/products`)
        });
      });
  };
  if (!product.name) {
    return <div>Loading...</div>; // or a loading spinner component
  }
  return (
    <Form
      initialValues={{
        name: product.name,
        info: product.info,
        price: product.price,
      }}
      onFinish={handleSubmit}
      className="space-y-8 divide-y divide-gray-200 pl-7 pt-7 pr-7 pb-7"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div className="space-y-6 sm:space-y-5">
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Edit Product
            </h3>
          </div>

          <div className="space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Product Name
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <Form.Item name={"name"}>
                  <Input
                    type="text"
                    required
                    autoComplete="productName"
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        name: e.target.value,
                      }));
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
                    value={product.info}
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        description: e.target.value,
                      }));
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
                Photo
              </label>
              <div className="mt-1 sm:col-span-2 sm:mt-0">
                <img
                  src={product.image}
                  alt=""
                  className="w-64 h-64 pb-5"
                ></img>
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
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
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
                    value={product.price}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-md border-gray-300 focus:border-sky-500 focus:ring-sky-500 sm:text-sm"
                    onChange={(e) => {
                      setProduct((prevProduct) => ({
                        ...prevProduct,
                        price: e.target.value,
                      }));
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <Link to={`/expos/${expoId}/expo-stores/${expoStoreId}/products/${productId}`}>
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Cancel
            </button>
            </Link>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-sky-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
        <div className="flex justify-start">
          <button
            type="button"
            className="ml-2 inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={deleteClick}
          >
            Delete product
          </button>
        </div>
      </div>
    </Form>
  );
}
