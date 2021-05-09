import React, { useState } from "react";
import useClipboard from "react-use-clipboard";
import ImagesGrid from "./ImagesGrid";
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import useImages from "../../hooks/useImages";
import UploadAlbumImage from "./UploadAlbumImage";
import { ClipLoader } from "react-spinners";

const Album = () => {
  const { albumId } = useParams();
  const [reviewLink, setReviewLink] = useState(null);
  const [copy, setCopy] = useClipboard(reviewLink);
  const { album, images, loading } = useImages(albumId);

  const chooseNewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/Reviewalbum/${album}`;
    setReviewLink(url);
  };

  return (
    <>
      <h2 className="mb-4">Album: {album && album.title}</h2>

      <Button className="btn btn-dark btn-lg mt-2 ">
        <Link
          className="text-light text-decoration-none"
          to={`/albums/edit/${albumId}`}
        >
          Change name of the Album
        </Link>
      </Button>
      <Button
        className="btn btn-dark btn-lg ml-3 mt-2 "
        onClick={() => {
          chooseNewLink(albumId);
        }}
      >
        Create client review
      </Button>

      {reviewLink && (
        <p className="mt-3 text-muted font-weight-light">
          {reviewLink}
          <Button className="btn btn-dark btn-sm ml-3" onClick={setCopy}>
            {copy ? "Copied " : "Copy Link "}
          </Button>
        </p>
      )}

      <UploadAlbumImage albumId={albumId} />

      <hr />

      {loading ? (
        <ClipLoader color={"black"} />
      ) : (
        <ImagesGrid images={images} />
      )}
    </>
  );
};

export default Album;
