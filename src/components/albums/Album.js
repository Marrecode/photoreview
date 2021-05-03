import React from "react";
import AlbumImages from "./AlbumImages";

const Album = () => {
  // query firestore for the images
  return (
    <div>
      specific Album
      <AlbumImages images={[]} />
    </div>
  );
};

export default Album;
