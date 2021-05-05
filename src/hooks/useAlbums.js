import { useEffect, useState } from "react";
import { db } from "../firebase";

const useAlbums = () => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("albums")
      .orderBy("title")
      .onSnapshot((snapshot) => {
        setLoading(true);
        const getAlbums = [];

        snapshot.forEach((album) => {
          getAlbums.push({
            id: album.id,
            ...album.data(),
          });
        });
        setAlbums(getAlbums);
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  return { albums, loading };
};

export default useAlbums;
