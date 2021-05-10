import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import firebase from "firebase/app";
import { db } from "../../firebase";
import AlbumsImages from "./AlbumsImages";
import useImages from "../../hooks/useImages";
import useAlbum from "../../hooks/useAlbum";
import ImageLightBox from "../ImageLightBox/ImageShow";

const ReviewAlbum = () => {
  const { albumId } = useParams();
  const { images } = useImages(albumId);
  const [msg, setMsg] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [Likes, setLikes] = useState([]);
  const [cardImage, setCardImage] = useState([]);
  const [chooseImg, setchooseImg] = useState(null);
  const { album, loading } = useAlbum(albumId);

  const navigate = useNavigate();

  useEffect(() => {
    async function getImages() {
      const cardList = await Promise.all(
        images.map((image) => {
          return {
            id: image.id,
            like: undefined,
          };
        })
      );
      setCardImage(cardList);
    }
    getImages();
  }, [images]);

  useEffect(() => {
    const filterArray = cardImage.filter((image) => {
      return image.like === true;
    });
    setLikes(filterArray);

    const resultCard = cardImage.every((image) => image.like !== undefined);
    if (resultCard === false) {
      setDisabled(true);
      return;
    } else if (resultCard === true) {
      setDisabled(false);
    }
  }, [cardImage]);

  const handleReview = async () => {
    const title = `${album.title} is reviewed`;

    setMsg(false);

    try {
      const docRef = await db.collection("albums").add({
        title,
        owner: album.owner,
      });
      await Likes.forEach((image) => {
        db.collection("images")
          .doc(image.id)
          .update({
            album: firebase.firestore.FieldValue.arrayUnion(
              db.collection("albums").doc(docRef.id)
            ),
          });
      });
      navigate(`/reviewdone`);
    } catch (fault) {
      setMsg(msg.message);
    }
  };

  const handleTheReview = (id, liked) => {
    const reviewId = document.getElementById(id);
    if (liked === true) {
      reviewId.getElementsByClassName("like")[0].classList.add("like-active");
      reviewId
        .getElementsByClassName("dislike")[0]
        .classList.remove("dislike-active");
    } else if (liked === false) {
      reviewId
        .getElementsByClassName("dislike")[0]
        .classList.add("dislike-active");
      reviewId
        .getElementsByClassName("like")[0]
        .classList.remove("like-active");
    }
  };

  const handleLikes = (image, liked) => {
    let changeArray = cardImage.map((img) => {
      if (img.id === image.id) {
        return {
          id: img.id,
          like: liked,
        };
      } else {
        return img;
      }
    });
    setCardImage(changeArray);
    handleTheReview(image.id, liked);
  };

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <>
      <h4 className="mb-5">Album name: {album && album.title}</h4>

      <AlbumsImages
        images={images}
        handleLikes={handleLikes}
        key={images.id}
        setchooseImg={setchooseImg}
      />
      {chooseImg && (
        <ImageLightBox chooseImg={chooseImg} setchooseImg={setchooseImg} />
      )}

      <h2 className="text-center mb-2">
        {Likes.length} / {images.length}
      </h2>

      <div className="d-flex justify-content-center mb-5">
        <button
          disabled={disabled}
          className="btn btn-success"
          onClick={handleReview}
        >
          Send the review
        </button>
      </div>

      {msg && <p>{msg}</p>}
    </>
  );
};

export default ReviewAlbum;
