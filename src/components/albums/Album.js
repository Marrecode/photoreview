import React from "react";
import ImagesGrid from "./ImagesGrid";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";

const Album = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);

  return (
    <div>
      <h4>The Album id: {albumId}</h4>
      <ImagesGrid images={images} />
    </div>
  );
};

export default Album;
