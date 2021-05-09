import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useAlbums = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db
      .collection("albums")
      .where("owner", "==", currentUser.uid)
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
  }, [currentUser]);

  return { albums, loading };
};

export default useAlbums;
