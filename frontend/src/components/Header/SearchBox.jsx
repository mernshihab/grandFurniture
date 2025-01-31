import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ setSearch, setMobileMenu }) {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText) {
      navigate(`/shops?search=${searchText}`);

      if (setSearch) {
        setSearch(false);
      }
    } else {
      navigate(`/shops`);
    }

    if (setMobileMenu) {
      setMobileMenu(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex">
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="search Product..."
        className="searchInput w-full rounded-l border px-3 py-2 text-[15px] text-neutral outline-none placeholder:text-sm"
      />
      <button className="searchIcon flex items-center justify-center rounded-r bg-primary px-3 text-base-100 md:text-lg">
        <BsSearch />
      </button>
    </form>
  );
}
