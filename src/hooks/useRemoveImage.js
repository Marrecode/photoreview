import { useEffect } from "react";
import { db, storage } from "../firebase";

const useRemoveImage = (image) => {
  useEffect(() => {
    if (!image) {
      return;
    }

    const removeImage = async () => {
      storage.ref(image.path).delete().then();

      db.collection("images").doc(image.id).delete().then();
    };
    removeImage();
  }, [image]);

  return {};
};

export default useRemoveImage;
