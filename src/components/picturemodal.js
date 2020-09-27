import React from "react";
import Modal from "react-bootstrap/Modal";


export default function ModalPicture(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-center w-100">
                    <img src={props.src} className="img-fluid" />
                </div>

            </Modal.Body>
        </Modal>
    );
}
