import React from "react";

const AlbumImages = ({ images }) => {
  return (
    <div>
      All images in Album {images.length}
      <ul>
        {images.length !== 0 &&
          images.map((image) => <li key={image.id}>{image.name}</li>)}
      </ul>
    </div>
  );
};

export default AlbumImages;
