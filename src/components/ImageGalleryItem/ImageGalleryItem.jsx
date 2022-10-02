import React from 'react';
import PropTypes from "prop-types";
import { Item, Image } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({ id, img, onClick, imgLarge }) {

    const clckHendler = () => {
        onClick(imgLarge);
    }

  return (
    <Item key={id}>
       <Image onClick={clckHendler} src={img} alt="" />
    </Item>
    )
}

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  img: PropTypes.string.isRequired,
  imgLarge: PropTypes.string.isRequired,
}