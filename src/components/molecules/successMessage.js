import React from "react";


export default function SuccessMessage() {
    return(
        <div className={"d-flex flex-column align-items-center justify-content-center w-100"}>
            <svg width="3em" height="3em" viewBox="0 0 16 16" className="bi bi-check-circle mb-3" fill="#28a745"
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path fill-rule="evenodd"
                      d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
            </svg>
            <div className="text-success mb-1 text-bold" style={{fontSize:"30px"}}>ACTION HAS BEEN TAKEN!</div>
            <div className="text-normal ">You can see the action details from details tab.</div>
        </div>
    )
}
