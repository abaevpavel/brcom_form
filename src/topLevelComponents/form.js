import Title from '../components/title';
import HelpfulLinks from '../components/helpfulLinks';
import Select from '../components/selectChoice';
import Eta from '../components/eta';
import FileUploads from '../components/fileUpload';
import Comments from '../components/comment';
import React, { useState, useEffect } from 'react';
const axios = require('axios').default;
const INTEGROMAT_URL = 'https://hook.integromat.com/6t9x2fgue999slw3zrhlpoubty5ci7co'
const possibleInputs = ['choices', 'comments', 'eta', 'selections'];

function Form(props) {
    const [inputs, setInputs] = useState({ 'choices': '', 'comments': '', 'uploads': [], 'selections' : '' });
    const [filesLoading, setFilesLoading] = useState({});
    const parsedInputs = props.parsedInputs;

    function handleSubmit(e) {
        e.preventDefault();
        let dataWillBeSubmitted = {};
        Object.assign(dataWillBeSubmitted, inputs);
        if (dataWillBeSubmitted.uploads.length === 1) {
            dataWillBeSubmitted.file = dataWillBeSubmitted.uploads[0].url;
        }
        dataWillBeSubmitted = Object.assign(parsedInputs, dataWillBeSubmitted)
        dataWillBeSubmitted.id = dataWillBeSubmitted.item.id;
        axios.post(INTEGROMAT_URL, dataWillBeSubmitted)
            .then((res) => {
                props.showThankYou(true);
            })
            .catch((err) => alert("Unexpected error occured. Please try again."))
    }
    function formChange(e) {
        let newInputs = {};
        Object.assign(newInputs, inputs);
        possibleInputs.forEach(possibleField => {
            if (e.target.className.includes(possibleField)) {
                newInputs[possibleField] = e.target.value;
            }
        })
        setInputs(newInputs);
    };

    function fileIsLoading(uploadName, stillLoading) {
        let obj = {};
        obj[uploadName] = stillLoading;
        setFilesLoading(Object.assign(filesLoading, obj))
    }
    function saveUrlOfUpload(urlObj) {
        let newInputs = {};
        Object.assign(newInputs, inputs);
        newInputs['uploads'].push(urlObj);
        setInputs(newInputs);
    }

    function renderCorrectFormFields() {
        if (props.subForm === "ETA") {
            return (
                <React.Fragment>
                    <Eta eta={parsedInputs.config.fields['ETA Required']} formChange={formChange} required={true}></Eta>
                    <Comments></Comments>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <HelpfulLinks links={(parsedInputs.item.fields || {})['Internal Links']}></HelpfulLinks>
                    <Select choices={parsedInputs.config.fields['Form Fields']} heading="Please, select the status of the task from options below:" name="choices"> </Select>
                    <Select choices={parsedInputs.config.fields['Selections Choices']} heading="Please, pick selections:" name="selections"> </Select>
                    <FileUploads 
                        optionalUploads={parsedInputs.config.fields['Optional Uploads']} 
                        requiredUploads={parsedInputs.config.fields['Required Uploads']} 
                        showUploads={parsedInputs.config.fields['Show Upload When']?.includes(inputs.choices || "NOTHING")} 
                        passUrlUp={saveUrlOfUpload} 
                        fileIsLoading={fileIsLoading}>
                        </FileUploads>
                    <Comments></Comments>
                    <Eta eta={parsedInputs.config.fields['ETA Required']} formChange={formChange} required={parsedInputs.config.fields['Require ETA When']?.includes(inputs.choices) }></Eta>
                </React.Fragment>
            )
        }
    }

    return (
        <form onSubmit={handleSubmit} onChange={formChange} data-netlify="true">
            <Title title={parsedInputs.item.fields.Item}></Title>
            {renderCorrectFormFields()}
            <div className="row mt-4">
                <div className="col text-center">
                    {
                        (Object.values(filesLoading).some(e => e))
                            ? <button type="submit" className="btn btn-primary" disabled>Files are loading</button>
                            : <button type="submit" className="btn btn-primary">Submit</button>
                    }
                </div>
            </div>
        </form>
    );
}

export default Form;
