import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import useAlbum from "../../hooks/useAlbum";
import useClipboard from "react-use-clipboard";
import { db } from "../../firebase";
import firebase from "../../firebase/index";
import ImageBox from "../ImageLightBox/ImageShow";
import AlbumsImages from "./AlbumsImages";
import { useAuth } from "../../contexts/AuthContext";
import UploadAlbumImage from "./UploadAlbumImage";

const Album = () => {
  const { currentUser } = useAuth();
  const { albumId } = useParams();
  const { album, images, loading } = useAlbum(albumId);
  const [linkCopy, setLinkCopy] = useState(null);
  const [copy, setCopy] = useClipboard(linkCopy);
  const [choseImgs, setChooseImage] = useState([]);
  const [error, setError] = useState(false);
  const [switcher, setSwitcher] = useState(false);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [chooseImg, setChooseImg] = useState(null);

  const reviewLink = (album) => {
    let baseUrl = window.location.origin;
    let url = `${baseUrl}/Reviewalbum/${album}`;
    setLinkCopy(url);
  };

  const onChange = (e) => {
    setTitle(e.target.value);
  };

  const newAlbum = async (e) => {
    e.preventDefault();

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: currentUser.uid,
      });

      await choseImgs.forEach((image) => {
        db.collection("images")
          .doc(image)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            ),
          });
      });
      navigate(`/albums`);
    } catch (error) {
      setError(error.message);
    }
  };

  const PickedImage = async (e) => {
    let newArray = [];
    if (e.target.checked === true) {
      if (choseImgs.includes(e.target.id)) {
        return;
      }
      newArray.push(e.target.id);
      setChooseImage(choseImgs.concat(newArray));
    }
  };

  return (
    <>
      <h2 className="mb-3">{album && album.title}</h2>

      <Button className="btn btn-dark btn-lg mt-2 ">
        <Link
          className="text-light text-decoration-none"
          to={`/albums/edit/${albumId}`}
        >
          Edit Album
        </Link>
      </Button>

      <Button
        className="btn btn-dark btn-lg ml-3 mt-2 "
        onClick={() => {
          reviewLink(albumId);
        }}
      >
        Create client review
      </Button>

      <Button
        className="btn btn-dark btn-lg ml-3 mt-2"
        onClick={() => {
          setSwitcher(!switcher);
        }}
      >
        {switcher ? "Close it" : "Create album"}
      </Button>

      {switcher && (
        <div className="d-flex justify-content-center ">
          <Form onSubmit={newAlbum} className="w-50 p-3 text-center">
            <Form.Group id="title">
              <Form.Label>New Album Title</Form.Label>
              <Form.Control
                type="title"
                onChange={onChange}
                value={title}
                required
              />
              {error && <p>{error}</p>}
              {title && title.length < 4 && (
                <Form.Text className="text-dark">
                  Please enter a title at least 4 characters long.
                </Form.Text>
              )}
            </Form.Group>

            <Button
              className="btn btn-dark btn-lg text-decoration-none"
              disabled={loading}
              type="submit"
            >
              Create New Album
            </Button>
          </Form>
        </div>
      )}

      {linkCopy && (
        <p className="mt-3 text-muted font-weight-light">
          {linkCopy}
          <Button className="btn btn-dark btn-sm ml-3" onClick={setCopy}>
            {copy ? "Copied " : "Copy Link "}
          </Button>
        </p>
      )}
      <UploadAlbumImage albumId={albumId} />
      <AlbumsImages
        images={images}
        PickedImage={PickedImage}
        setChooseImg={setChooseImg}
      />
      {chooseImg && (
        <ImageBox chooseImg={chooseImg} setChooseImg={setChooseImg} />
      )}
    </>
  );
};

export default Album;
