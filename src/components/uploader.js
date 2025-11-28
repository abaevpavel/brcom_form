import React, { useEffect, useState } from 'react';
import { promiseUpload } from '../helpers/fileUpload';


function Uploader(props) {
    const [status, setStatus] = useState("Empty");

    useEffect(() => {
    })

    if (!props.upload) {
        return (null);
    }

    let handleUpload = function (e) {
        if (e.target.files.length === 0) {
            return;
        }
        console.log("Uploading! ", e.target.files)
        for (let index = 0; index < e.target.files.length; index += 1) { 
            if (e.target.files[index].size === 0) {
                e.target.value = '';
                alert("No empty files are allowed! Please, try again with proper files.")
                return;
            }
        }

        setStatus("Loading");
        props.fileIsLoading(props.upload.name, true);
        for (let index = 0; index < e.target.files.length; index += 1) {
            let f = e.target.files[index];
            let promiseOfUpload = promiseUpload(f);
            if (!promiseOfUpload) {
                props.fileIsLoading(props.upload.name, false);
                return
            }
            let { url, promise } = promiseOfUpload;
            promise.then((res) => {
                if (index === e.target.files.length-1) {
                    setStatus("Uploaded");
                    props.fileIsLoading(props.upload.name, false);
                }
                props.passUrlUp({ 'name': props.upload.name, 'url': url });
            }).catch((e) => {
                console.log(e);
                alert("Something broke. Try again. If it doesn't help, yell at bogdan. Error, ", e)
            })
        }

    }

    let inputField = function (upload) {
        if (props.upload.required) {
            if (props.upload.name === "Proposed Floorplan") {
                return (<input type="file" accept="image/png, image/jpeg, .pdf" className="form-control reqUploads" id={props.upload.name} onChange={handleUpload} aria-describedby={props.upload.name} aria-label="Upload" required />)
            }
            return (<input type="file" accept="image/png, image/jpeg, .pdf" multiple="multiple" className="form-control reqUploads" id={props.upload.name} onChange={handleUpload} aria-describedby={props.upload.name} aria-label="Upload" required />)
        }
        return (<input type="file" accept="image/png, image/jpeg, .pdf" multiple="multiple" className="form-control opUploads" id={props.upload.name} onChange={handleUpload} aria-describedby={props.upload.name} aria-label="Upload" />)
    }

    let loadingIndicator = function () {
        if (status === 'Loading') {
            return (
                <div className="col-auto ">
                    <div className="spinner-border" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )
        } else if (status === 'Uploaded') {
            return (
                <div className="col-auto ">
                    <button type="button" className="btn btn-outline-secondary btn" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"></path>
                        </svg>
                        <span className="visually-hidden"></span>
                    </button>
                </div>
            )
        }
    }
    return (
        <div className="row">
            <div className="col">
                <div className="input-group mb-3 mx-auto">
                    <button style={{ opacity: 100, 'borderColor': 'darkgrey' }} className="btn btn-outline-dark" type="button" id={props.upload.name} disabled >{props.upload.name}</button>
                    {inputField()}
                </div>
            </div>
            {loadingIndicator()}
        </div>
    )
}

export default Uploader;