import Searchbar from "../Searchbar/Searchbar";
import ImageGallery  from 'components/ImageGallery/ImageGallery';
import Loader from 'components/Loader/Loader';
import { searchPixabayAPI } from 'components/services/ApiPixabay';
import { AppWrapper } from "./App.styled";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import Warnings from "components/Warnings/Warnings";

import React, { useState, useEffect } from 'react'


export default function App() {

  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(0);
  const [bigImagePath, setBigImagePath] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
  const fetchImages = async () =>  {
    setIsLoading(true);
    
      try {
        const data = await searchPixabayAPI(search, page);

        if (data.hits.length === 0) {
          setNotFound(true);
        } else {
          setImages((prevImages) => {
            return [...prevImages, ...data.hits]
          });
          setNotFound(false);
          setTotalImages(data.totalHits);
        }
      } catch (error) {
        console.log(error);
        setError(error);
      }
      finally {
        setIsLoading(false);
      }
    }
    
    if (search) {
       fetchImages();
    }
}, [search, page])



  const onSearch = search => {
    setImages([]);
    setSearch(search);
    setPage(1);
  }

const loadMore = () => {
  setPage((prevPage) => prevPage + 1);
  }
  
  
const toggleModal = (path) => {
  setBigImagePath(path);
  }

    const isImages = Boolean(images.length);

  return (
      <AppWrapper>
        <Searchbar onSearch={onSearch} />
        <ToastContainer position="top-right" autoClose={5000} />
        {notFound && <Warnings text="Nothing found for this query, try again"/>}
        {bigImagePath && (<Modal onClick={toggleModal} path={bigImagePath}/>)}
        {isLoading && <Loader/>}
        {error && <Warnings text="Please, try again later"/>}
        {!isImages && !notFound && <Warnings text="Enter key word for images search"/>}
        {isImages && <ImageGallery items={images} toggleModal={toggleModal} />}
        {(isImages && images.length < totalImages) && <Button loadMore={loadMore} />}
    </AppWrapper>
    )
}
