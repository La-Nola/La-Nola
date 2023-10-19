import React from "react";
import { FaSearch } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
const SearchInput = ({ searchValue, setSearchValue, toggleSearch }) => {
  const changeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="block absolute w-full z-10 bg-white text-lg border-t">
      <div className="Search__Inner md:py-7 md:px-12">
        <div className="Search--Searchbar flex items-center max-h-[calc(100vh-200px)]">
          <div className="Search__Input-IconWrapper md:mr-5 relative">
            <span className="Icon--search">
              <FaSearch />
            </span>
          </div>
          <input
            autoFocus
            onChange={changeSearchValue}
            placeholder="Search"
            className="w-full shadow-none bg-none align-middle rounded-none border-0 focus:outline-none bg-transparent"
            value={searchValue}
            type="text"
          ></input>
          <button>
            <GrClose onClick={toggleSearch} />
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchInput;
