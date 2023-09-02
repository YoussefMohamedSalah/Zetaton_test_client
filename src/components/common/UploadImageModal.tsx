import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import {
  uploadImageInput,
  useUploadImage,
} from "framework/images/uploadImage";
import { useState } from 'react';

interface Props {
  show: boolean;
  handleClose: () => void;
}
const UploadImageModal: React.FC<Props> = ({ show, handleClose }) => {
  const { mutateAsync: uploadImageMutation } = useUploadImage();
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  const handleUploadImage = async () => {
    if(fileToUpload === null) return alert("Please select an image to upload");
      console.log(fileToUpload)
    try {
      let createInput  = uploadImageInput(fileToUpload);
      await uploadImageMutation(createInput);
      handleClose();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image to upload</Form.Label>
              <Form.Control
                type="file"
                placeholder="Image to upload"
                onChange={(e: any) => {
                  console.log(e.target.files[0])
                  setFileToUpload(e.target.files[0]);
                }}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleUploadImage()}>
            Upload Image
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadImageModal;