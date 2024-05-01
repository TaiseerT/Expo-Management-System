import { Link, useLocation, useParams } from "react-router-dom";
import { useCombobox } from "downshift";
import { useEffect, useState, useContext } from "react";
import api from "../../services/api";
export default function ExpoStoreCard() {
  const [expoStore, setExpoStore] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredExpo, setFilteredExpo] = useState([]);
  const { expoId } = useParams();

  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };

  function handleClick(expo_store) {
    localStorage.setItem("brandIsOwned", expo_store.is_owned.toString());
  }

  useEffect(() => {
    api.get(`/expos/${expoId}/brands`, config).then((res) => {
      setExpoStore(res.data.data);
    });
  }, [expoId]);

  useEffect(() => {
    setFilteredExpo(
      expoStore.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, expoStore]);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: filteredExpo,
    onInputValueChange: ({ inputValue }) => {
      setInputValue(inputValue);
    },
    itemToString: (item) => (item ? item.name : ""),
  });
  return (
    <>
      <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl lg:px-8">
          <div className="flex justify-center py-5 pb-20">
            <div
              {...getComboboxProps}
              className="flex flex-col items-center mt-7"
            >
              <input
                {...getInputProps()}
                placeholder="Search Expo Sections"
                className="rounded border-gray-200 px-20 text-center"
              />

              <ul {...getMenuProps()}>
                {isOpen &&
                  inputValue &&
                  filteredExpo.slice(0, 4).map((item, index) => (
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
                      className="font-medium"
                    >
                      {item.name}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6  sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredExpo.map((expoStore) => (
              <Link
                to={`/expos/${expoId}/expo-stores/${expoStore.id}/products`}
                key={expoStore.id}
                className="group"
                onClick={() => handleClick(expoStore)}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={expoStore.image}
                    alt=""
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{expoStore.name}</h3>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">
                  {expoStore.info}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
