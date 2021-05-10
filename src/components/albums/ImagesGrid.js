import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import { useAuth } from "../../contexts/AuthContext";

const ImagesGrid = ({ images }) => {
  const { currentUser } = useAuth();

  return (
    <>
      <SRLWrapper>
        <Row className="my-3">
          {images &&
            images.map((image) => (
              <Col sm={2} md={3} lg={4} key={image.id} className="column">
                <Card className="card">
                  <a href={image.url} title="Image" data-attribute="SRL">
                    <Card.Img
                      variant="top"
                      src={image.url}
                      title={image.name}
                    />
                  </a>

                  <Card.Body>
                    <Link to={`/albums/${image.id}`}>{image.title}</Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </SRLWrapper>
    </>
  );
};

export default ImagesGrid;
