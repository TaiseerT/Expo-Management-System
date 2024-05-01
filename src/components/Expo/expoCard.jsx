import { Link } from "react-router-dom";
import { useCombobox } from "downshift";
import { useEffect, useState } from "react";
import api from '../../services/api'

export default function ExpoCard() {
  const [expo, setExpo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filteredExpo, setFilteredExpo] = useState([]);

  const handleClick = (Expo) => {
    localStorage.setItem("expoIsOwned", Expo.is_owned)
  }
  const config = {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`,
    },
  };
  useEffect(() => {
    api.get("/expos", config).then((res) => {
      setExpo(res.data.data);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFilteredExpo(
      expo.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  }, [inputValue, expo]);
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
    itemToString: (item) => (item ? item.title : ""),
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
                placeholder="Search Expos"
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
                    >
                      {item.title}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6  sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {filteredExpo.map((expo) => (
              <Link
                to={`/expos/${expo.id}/expo-stores`}
                key={expo.id}
                className="group"
                onClick={() => {handleClick(expo)}}
              >
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg sm:aspect-w-2 sm:aspect-h-3">
                  <img
                    src={expo.image}
                    alt=""
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                  <h3>{expo.name}</h3>
                </div>
                <p className="mt-1 text-sm italic text-gray-500">{expo.info}</p>
                <p className="mt-1 text-sm text-gray-500">Address: {expo.address}</p>
                {console.log(expo.expires_at)}
                <p className="mt-1 text-sm text-red-500">Expires at: {expo.expires_at.substring(0, 10).split('-').reverse().join('-')}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
