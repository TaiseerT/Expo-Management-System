import { Link, useParams } from "react-router-dom";
import { useCombobox } from "downshift";
import Swal from "sweetalert2";
import { useCart } from "react-use-cart";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../LoginProvider.js";
import api from "../../services/api";
export default function ProductCard() {
  const { addItem, emptyCart } = useCart();
  const [product, setProduct] = useState([]);
  const loginContext = useContext(LoginContext);
  const [inputValue, setInputValue] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const { expoId, expoStoreId } = useParams();
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  const handleClick = (Product) => {
    localStorage.setItem("productIsOwned", Product.is_owned)
  }
  useEffect(() => {
    api
      .get(`/expos/${expoId}/brands/${expoStoreId}/products`, config)
      .then((res) => {
        setProduct(res.data.data);
      });
  }, [expoId, expoStoreId]);

  useEffect(() => {
    setFilteredProduct(
      product.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, product]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: filteredProduct,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue);
    },
    itemToString: (item) => (item ? item.title : ""),
  });

  return (
    <>
      <div className="flex flex-col items-center">
        <div {...getComboboxProps} className="flex justify-center mt-7">
          <input
            {...getInputProps()}
            placeholder="Search Products"
            className="rounded border-gray-200 px-20 text-center"
          />
        </div>
        <ul {...getMenuProps()}>
          {isOpen &&
            inputValue &&
            filteredProduct.slice(0, 4).map((item, index) => (
              <li
                style={
                  highlightedIndex === index
                    ? {
                        backgroundColor: "#e6f8fb",
                        border: "2px",
                        borderRadius: "5px",
                      }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                className="pt-2"
              >
                {item.name}
              </li>
            ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {filteredProduct.map((product) => {
            const addToCart = () => {
              addItem(product);
            };
            const Alert = (e) => {
              e.preventDefault();
              if (loginContext.isLoggedIn) {
                const config = {
                  headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                      "token"
                    )}`,
                  },
                };
                api
                  .post(
                    "/add-to-fav",
                    {
                      product_id: product.id,
                    },
                    config
                  )
                  .then((res) => {
                    Swal.fire({
                      position: "top",
                      icon: "success",
                      title: res.data.message,
                      showConfirmButton: false,
                      timer: 800,
                    }).then(() => {
                      addToCart(product);
                      product.is_added_to_favourite
                        ? (product.is_added_to_favourite = false)
                        : (product.is_added_to_favourite = true);
                    });
                  });
              } else {
                Swal.fire({
                  title: "Oops!",
                  icon: "warning",
                  text: "In order to add to wishlist, you have to be signed in.",
                  confirmButtonColor: "#0ea5e9",
                });
              }
            };
            return (
              <div className="bg-white">
                <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:py-12 md:py-12 ">
                  <div key={product.id}>
                    <div className="relative hover:opacity-75">
                      <Link
                        to={`/expos/${expoId}/expo-stores/${expoStoreId}/products/${product.id}`}
                        onClick={() => handleClick(product)}
                      >
                        <div className="relative h-72 w-full overflow-hidden rounded-lg ">
                          <img
                            src={product.image}
                            alt=""
                            className="h-full w-full object-cover object-center "
                          />
                        </div>

                        <div className="relative mt-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            {product.info}
                          </p>
                        </div>
                        <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                          <div
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-6">
                    {product.is_added_to_favourite ? (
                      <a
                        href=""
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                        onClick={Alert}
                      >
                        Remove from wishlist
                        <span className="sr-only">, {product.name}</span>
                      </a>
                    ) : (
                      <a
                        href=""
                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 py-2 px-8 text-sm font-medium text-gray-900 hover:bg-gray-200"
                        onClick={Alert}
                      >
                        Add to wishlist
                        <span className="sr-only">, {product.name}</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
