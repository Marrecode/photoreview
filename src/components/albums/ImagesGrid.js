import { Col, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";

const ImagesGrid = ({ images }) => {
  return (
    <>
      <SRLWrapper>
        <Row className="my-3">
          {images.map((image) => (
            <Col sm={2} md={3} lg={4} key={image.id} className="column">
              <Card className="mb-3">
                <a
                  href={image.url}
                  title="View image in lightbox"
                  data-attribute="SRL"
                >
                  <Card.Img variant="top" src={image.url} title={image.name} />
                </a>
                <Card.Text className="text-muted small">
                  {image.name} ({Math.round(image.size / 1024)} kb)
                </Card.Text>
                <Card.Body>
                  {/*   <Button variant="danger" size="sm" onClick={handleRemoveImage}>
            {" "}
            Remove{" "}
          </Button> */}
                </Card.Body>
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
