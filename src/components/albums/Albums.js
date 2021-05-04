import React, { useState, useEffect } from "react";
import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { ClipLoader } from "react-spinners";

const Albums = () => {
  const { currentUser } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.collection("albums").onSnapshot((snapshot) => {
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

  return (
    <>
      <h1>All them Albums</h1>

      {loading && <ClipLoader color={"black"} />}

      {!loading && (
        <Row>
          {albums.map((album) => (
            <Col sm={2} md={3} lg={4} key={album.id}>
              <Card className="mb-3">
                <Card.Body>
                  <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
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
