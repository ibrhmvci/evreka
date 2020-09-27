import React from "react";


export default function FailMessage() {
    return (
        <div className={"d-flex flex-column align-items-center justify-content-center w-100"}>
            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-x-circle mb-3" fill="#dc3545"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd"
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
            <div className="text-danger mb-1 text-bold" style={{fontSize:"30px"}}>A PROBLEM OCCURED!</div>
            <div className="text-normal text-center">We cannot continue due to a problem. <br/> Please try again later. </div>
        </div>
    )
}