import { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useUploadImage = (image, albumId = null) => {
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadedImage, setUploadedImage] = useState([]);
  const [error, setError] = useState(null);
  const [isSucess, setIsSuccess] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!image) {
      setUploadProgress(null);
      setUploadedImage(null);
      setError(null);
      setIsSuccess(false);

      return;
    }

    setError(null);
    setIsSuccess(false);

    image.forEach((image) => {
      const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);

      const uploadTask = fileRef.put(image);

      uploadTask.on("state_changed", (taskSnapshot) => {
        setUploadProgress(
          Math.round(
            (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
          )
        );
      });

      uploadTask
        .then(async (snapshot) => {
          const url = await snapshot.ref.getDownloadURL();

          const img = {
            name: image.name,
            owner: currentUser.uid,
            path: snapshot.ref.fullPath,
            size: image.size,
            type: image.type,
            url,
          };

          if (albumId) {
            img.album = db.collection("albums").doc(albumId);
          }

          await db.collection("images").add(img);
          setIsSuccess(true);
          setUploadProgress(null);
          setUploadedImage(img);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.error("File upload can been uploadded!", error);
          setError({
            typ: "warning",
            msg: `Image could not be uploaded (${error.code})`,
          });
        });
    });
  }, [image, currentUser, albumId]);

  return { uploadProgress, uploadedImage, error, isSucess };
};

export default useUploadImage;
