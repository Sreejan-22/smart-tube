import { Modal, Form } from "react-bootstrap";

const FiltersModal = (props) => {
  return (
    <Modal
      // {...props}
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
          // onClick={props.onHide}
        >
          <span
            aria-hidden="true"
            style={{ color: "rgba(255, 255, 255, 0.6)" }}
          >
            &times;
          </span>
        </button>
      </div>

      <Modal.Body
        style={{
          background:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16)), #000000",
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: "300",
          border: "none",
        }}
      ></Modal.Body>
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
          // onClick={props.onHide}
          style={{ color: "rgba(255, 255, 255, 0.6)", textDecoration: "none" }}
        >
          CANCEL
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default FiltersModal;
