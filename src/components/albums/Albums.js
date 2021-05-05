import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import useAlbums from "../../hooks/useAlbums";
import AlbumsGrid from "./AlbumsGrid";

const Albums = () => {
  const { currentUser } = useAuth();
  const { loading, albums } = useAlbums();

  return (
    <>
      <h1>All them Albums</h1>

      {loading && <ClipLoader color={"black"} />}

      {!loading && <AlbumsGrid albums={albums} />}

      <div>This will be the album</div>
      {currentUser && (
        <div>
          <Link to="/albums/create" className="btn btn-success">
            Create a new album
          </Link>
        </div>
      )}
    </>
  );
};

export default Albums;
