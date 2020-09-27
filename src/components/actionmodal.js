import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import {Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";


export default function ModalAction(props) {
    const [key,setKey] = useState("selectaction");
    const [selectedAction,setSelectedAction]= useState();
    const [resolutionText,setResolutionText]= useState("");


    const handleAction = (action) => {
        setSelectedAction(action);
    }
    const handleSelectedAction=(e)=>{
        if(!selectedAction){
            e.preventDefault();
        }else{
            setResolutionText("");
            setKey("takeaction");
        }
    }
    const handleInput = (e)=>{
        if(e.target.value.length <= 300){
            setResolutionText(e.target.value);
        }else{
            return;
        }
    }
    const handleBackClick=()=>{
        setKey("selectaction");
        setSelectedAction();
        setResolutionText("");
    }
    const handleModalShow = async () => {
       await setKey("selectaction");
       await props.callback(true,resolutionText);

    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                        <Tabs
                            id="details"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            className="d-flex justify-content-center"
                        >
                            <Tab eventKey="selectaction" title="SELECT ACTION" disabled={key === "takeaction"}>
                                <div className="d-flex flex-column w-100 align-items-center">
                                    <button className="action-btn w-100 d-flex flex-column" onClick={()=>handleAction("Mark as Resolved")}>
                                        <span className="text-bold">Mark as Resolved</span>
                                        <span className="text-normal">Mark this event as resolved and enter the details of the resolution.</span>
                                    </button>
                                    <button className="action-btn w-100 d-flex flex-column" onClick={()=>handleAction("Change Asset")}>
                                        <span className="text-bold">Change Asset</span>
                                        <span className="text-normal">Change the asset with another one.</span>
                                    </button>
                                    <button className="btn-success text-bold text-white btn mt-3 w-25" onClick={(e)=>handleSelectedAction(e)}>NEXT</button>
                                </div>

                            </Tab>
                            <Tab eventKey="takeaction" title="TAKE ACTION" disabled={key === "selectaction"}>
                                {selectedAction === "Mark as Resolved" &&
                                <div className="d-flex flex-column pl-2 pt-3">
                                    <span className="text-bold">Mark as Resolved</span>
                                    <span className="text-normal">Mark this event as resolved and enter the details of the resolution.</span>
                                </div>
                                }
                                {selectedAction === "Change Asset" &&
                                <div className="d-flex flex-column pl-2 pt-3">
                                    <span className="text-bold">Change Asset</span>
                                    <span className="text-normal">Change the asset with another one.</span>
                                </div>
                                }
                                <Form>
                                    <Form.Group controlId="resolutionText" className="position-relative">
                                        <Form.Label className="pl-2">Resolution Detail*</Form.Label>
                                        <Form.Control as="textarea" placeholder={"Enter resolution detail..."} value={resolutionText} onChange={(e)=>handleInput(e)} rows="5" maxlenght={300}/>
                                        <span id="res-text-label" className={resolutionText.length === 300 ? "text-danger":""}>( {resolutionText.length} / 300 )</span>
                                    </Form.Group>
                                </Form>
                                <div className="d-flex w-100 justify-content-center">
                                    <button className="btn dark-btn mr-2" onClick={()=>handleBackClick()}>BACK</button>
                                    <button className="btn btn-success w-25 text-bold text-white" onClick={handleModalShow}>TAKE ACTION</button>
                                </div>
                            </Tab>
                        </Tabs>
                    </Modal.Body>

        </Modal>
    );
}
