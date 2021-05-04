import React from "react";
import AlbumImages from "./AlbumImages";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";

const Album = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);

  return (
    <div>
      <h4>specific Album {albumId}</h4>
      <AlbumImages images={images} />
    </div>
  );
};

export default Album;
