import React, { useEffect } from 'react';

function Checkboxes(props) {
   
    useEffect(() => {
    })

    if (!props.checks) {
        return(null); 
    }

    return (
      <div className="row mt-4">
        <h4 className="text-center">Please, select the status of the task from options below:</h4>
        <div className="col mt-3 text-center">
        {props.checks.map((check, index) => 
                <div className="form-check-inline" key={`check_${index}`}>
                <input className="form-check-input checkboxes" type="checkbox" name="checkboxes" id={`check_${index}`} value={check}/>
                <label className="form-check-label" for={`check_${index}`}>
                    {check}
                </label>
            </div>
            )}
        </div>
      </div>
        ) 
}

export default Checkboxes;