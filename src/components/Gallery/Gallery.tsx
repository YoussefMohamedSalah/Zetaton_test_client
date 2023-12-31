import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import testImage from "../../assets/test.jpg";

const Gallery = () => {
  return (
    <Row xs={1} md={4} className="g-4">
      {Array.from({ length: 40 }).map((_, idx) =>
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src={testImage} />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )}
    </Row>
  );
};

export default Gallery;
