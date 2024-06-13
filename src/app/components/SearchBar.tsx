import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Search } from "../lib";

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleClick = () => {
    if (searchQuery.trim()) {
      router.push(
        `listproducts?searchQuery=${encodeURIComponent(searchQuery)}`,
      );
    }
  };

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-white flex px-2 py-1 rounded border overflow-hidden w-[97%] sm:w-2/4 mx-auto font-[sans-serif]">
      <input
        type="text"
        placeholder="Search Something..."
        value={searchQuery}
        onChange={handleChange}
        className="w-full outline-none bg-white pl-4 text-sm"
      />
      <button type="button" onClick={handleClick}>
        <Search />
      </button>
    </div>
  );
};

export default SearchBar;
