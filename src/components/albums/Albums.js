import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Albums = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <div>This will be the album</div>
      {currentUser && (
        <div>
          <Link to="/albums/create">Create a new album</Link>
        </div>
      )}
    </>
  );
};

export default Albums;
