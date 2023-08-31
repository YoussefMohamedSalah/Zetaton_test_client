import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; import Navbar from "react-bootstrap/Navbar";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";
import { useState } from "react";
import UploadImageModal from "./UploadImageModal";
import { removeToken } from "utils/token";

const Header: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { push } = useApp();


  const { session } = useAuth();
  let userName:string = session?.user?.name || "Placeholder";

  const handleLogout = () => {
    removeToken();
    push("/");
  }
  // const { isLoading, error, data } = useNotificationsQuery({});
  // useReactQuerySubscription();

  // const handleLogout = () => {
  //   localStorage.removeItem("session");
  //   push("/");
  // };

  // if (isLoading) return <Loading />;
  // if (error)
  //   return null

  // const notifications: any = null;

  return (
    <>
      <Navbar className="navbar sticky-top navbar-light bg-light">
        <Container>
          <Row>
            <Col>{userName}</Col>
          </Row>
          <Row>
            <Col><Button variant="primary" onClick={handleShow}>
              Upload Image
            </Button></Col>
          </Row>
          <Row>
            <Col>
              <Button variant="secondary" onClick={() => handleLogout()}>Logout</Button>
            </Col>
          </Row>
        </Container>
      </Navbar>
      <UploadImageModal show={show} handleClose={handleClose} />
    </>
  );
};

export default Header;
// function useNotificationsQuery(arg0: {}): { isLoading: any; error: any; data: any; } {
//   throw new Error("Function not implemented.");
// }

