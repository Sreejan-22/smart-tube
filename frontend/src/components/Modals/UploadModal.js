import { Modal, Button, Form } from "react-bootstrap";

export default function UploadModal(props) {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const dateString = `${date}-${month}-${year}`;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{ outline: "none", border: "none" }}
    >
      <div
        className="modal-header"
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #000000",
          color: "rgba(255, 255, 255, 0.6)",
          border: "none",
        }}
      >
        <h5 className="modal-title">Upload Videos</h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
          onClick={props.onHide}
        >
          <span
            aria-hidden="true"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            &times;
          </span>
        </button>
      </div>
      {/* <Modal.Header
        closeButton
        // style={{
        //   background:
        //     "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #000000",
        //   color: "rgba(255, 255, 255, 0.6)",
        //   border: "none",
        // }}
      >
        <Modal.Title>Upload Videos</Modal.Title>
      </Modal.Header> */}

      <Modal.Body
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #000000",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "300",
          border: "none",
        }}
      >
        <Form>
          <Form.Group>
            <Form.Label>Video Link</Form.Label>
            <Form.Control type="text" />
            <Form.Text className="text-muted">
              This link will be used to derive the video
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Thumbnail Image Link</Form.Label>
            <Form.Control type="text" />
            <Form.Text className="text-muted">
              This link will be used to preview the thumbnail image
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" />
            <Form.Text className="text-muted">
              The title will be the representative text for the video
            </Form.Text>
          </Form.Group>

          <div className="form-group">
            <label for="genre-dropdown">Genre</label>
            <select className="form-control" id="genre-dropdown">
              <option>Education</option>
              <option>Sports</option>
              <option>Comedy</option>
              <option>Lifestyle</option>
            </select>
            <small className="form-text text-muted">
              Genre will help in categorizing the videos
            </small>
          </div>

          <div className="form-group">
            <label for="genre-dropdown">Suitable age group for the clip</label>
            <select
              className="form-control"
              id="genre-dropdown"
              name="genre-dropdown"
            >
              <option value="7+">7+</option>
              <option value="12+">12+</option>
              <option value="16+">16+</option>
              <option value="18+">18+</option>
            </select>
            <small className="form-text text-muted">
              This will be used to filter videos on age group suitability
            </small>
          </div>

          <Form.Group>
            <Form.Label>Release Date</Form.Label>
            <Form.Control type="date" placeholder={dateString} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #000000",
          color: "rgba(255, 255, 255, 0.6)",
          border: "none",
        }}
      >
        <button type="button" className="btn btn-danger">
          Upload Video
        </button>
        <button
          type="button"
          className="btn btn-link"
          onClick={props.onHide}
          style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none" }}
        >
          CANCEL
        </button>
      </Modal.Footer>
    </Modal>
  );
}
