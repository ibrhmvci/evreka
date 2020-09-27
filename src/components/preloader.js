import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import SuccessMessage from "./molecules/successMessage";
import FailMessage from "./molecules/failMessage";


export default function Preloader(props) {
    const {result} = props;

    const switchComponent = () => {
        switch(result){
            case "fetching":
                return  <Spinner animation="border" variant="success" size="lg" />;
            case "success":
                return <SuccessMessage/>;
            case "fail":
                return <FailMessage/>
            default:
                return  <Spinner animation="border" variant="success" size="lg" />;
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <div className="d-flex justify-content-center w-100">
                    {switchComponent()}
                </div>
            </Modal.Body>
        </Modal>
    );
}
