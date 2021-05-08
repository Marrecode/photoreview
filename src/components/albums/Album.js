import React from "react";
import ImagesGrid from "./ImagesGrid";
import { useParams } from "react-router-dom";
import useImages from "../../hooks/useImages";
import UploadAlbumImage from "./UploadAlbumImage";

const Album = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);

  return (
    <>
      <h2 className="mb-4">Album: {albumId}</h2>

      <UploadAlbumImage albumId={albumId} />

      <hr />

      <ImagesGrid images={images} />
    </>
  );
};

export default Album;
