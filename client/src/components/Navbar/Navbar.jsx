import React, { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
const Navbar = ({ userInfo, onSearch, handleclearSearch }) => {
  const [searchquery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onLogout = () => {
    navigate("/login");
  };
  const handleSearch = () => {
    if (searchquery.trim() === "") return;
    onSearch(searchquery);
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleclearSearch();
  };
  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2 ">Notes</h2>
      <SearchBar
        value={searchquery}
        onChange={({ target }) => {
          setSearchQuery(target.value);
        }}
        handleSearch={handleSearch}
        onClearSearch={() => onClearSearch()}
      />
      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
