import React, { useState } from 'react';
import PropTypes from "prop-types";
import { SearchbarHeader, SearchForm, Button, Label, Input, } from './Searchbar.styled';
import { MdOutlineImageSearch } from "react-icons/md";
import { toast } from 'react-toastify'; 

export default function Searchbar({onSearch}) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setSearch(value.toLowerCase());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() === "") {
      toast.warn('The search field is empty', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    onSearch(search.trim());
    reset();
  }
  
  const reset = () => {
    setSearch("");
  }  

  return (
      <SearchbarHeader>
       <SearchForm onSubmit={handleSubmit}>
          <Button type="submit" onClick={handleSubmit}>
            <MdOutlineImageSearch size={40}/>
           <Label>Search</Label>
          </Button>
          
         <Input 
            type="text"
            name="search"
            value={search}
           autocomplete="off"
            placeholder="Search images and photos"
            onChange={handleChange}
         />
        </SearchForm>
      </SearchbarHeader>
    )
}


Searchbar.propTypes = {
  onSearch: PropTypes.func
}