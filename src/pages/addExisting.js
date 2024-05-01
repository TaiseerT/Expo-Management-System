import api from '../services/api'
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginContext } from "../LoginProvider";

export default function AddExisting() {
  const [brands, setBrands] = useState([]);
  // const [brandId, setBrandId] = useState("");
  const { expoId } = useParams();
  const config = {
    headers: { Authorization: `Bearer ${window.localStorage.getItem("token")}` },
  };
  const click = (brandId) => {
    //fix the url
    api.post(
        `/expos/${expoId}/brands/${brandId}/add-investor`,
        null,
        config
      )
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Done",
          showConfirmButton: false,
          timer: 900,
        })
      }).catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.response.data.message,
          showConfirmButton: false,
          timer: 700,
        });
        console.log(error);
      });;
  };

  useEffect(() => {
    api.get(`expos/${expoId}/not-joined-brands`, config).then((res) => {
      setBrands(res.data.data);
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={brand.image}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <Link to={`/expos/${expoId}/expo-stores`} onClick={() => click(brand.id)}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {brand.name}
                  </Link>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
