import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const AlbumsGrid = ({ albums }) => {
  return (
    <>
      <div className="container">
        <Row>
          {albums.map((album) => (
            <Col sm={2} md={3} lg={4} key={album.id} className="padding-left">
              <Card className="mb-3">
                <Card.Body>
                  <Link to={`/albums/${album.id}`}>{album.title}</Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default AlbumsGrid;
