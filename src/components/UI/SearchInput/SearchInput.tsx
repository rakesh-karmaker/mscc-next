"use client";

import "./SearchInput.css";
import React from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

type SearchInputProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  children: string;
  style?: React.CSSProperties;
};

const SearchInput = ({ setSearch, children, ...rest }: SearchInputProps) => {
  const [text, setText] = React.useState<string>("");

  const { handleSubmit } = useForm();

  const onSubmit = () => {
    setSearch(text);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="search flex gap-2"
      {...rest}
    >
      <div className="search-container">
        <div className="search-icon">
          <FaSearch />
        </div>
        <input
          placeholder={children}
          className="search-input"
          type="text"
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value === "") {
              setSearch(e.target.value);
            }
          }}
        />
      </div>
      <button
        type="submit"
        className="search-btn w-fit h-[49.4px] flex justify-between items-center [padding:0em_1em!important] text-[#808080] bg-[#f2f2f2] rounded-[3px] cursor-pointer :hover:bg-[#e6e6e6]"
        onClick={() => setSearch(text)}
        disabled={text === ""}
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
