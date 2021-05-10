import React from "react";

const ImageBox = ({ chooseImg, setChooseImg }) => {
  const handelClick = (e) => {
    if (e.target.classList.contains("select-Image")) {
      setChooseImg(null);
    }
  };
  return (
    <div className="select-Image" onClick={handelClick}>
      <img src={chooseImg} alt="random" />
    </div>
  );
};
export default ImageBox;
