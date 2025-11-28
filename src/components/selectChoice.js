import React from 'react';

function Select(props) {

    if (!props.choices || props.choices.length === 0) {
        return(null); 
    }

    let generateSelectOptions = function () {
        return props.choices.map((choice, index) =>
                <div className="form-check-inline" key={`${props.name}_${index}`} >
                    <input className={`form-check-input ${props.name}`} type="radio" name={`${props.name}`}id={`${props.name}_${index}`} value={choice} required />
                    <label className="form-check-label" htmlFor={`${props.name}_${index}`}>
                        {choice}
                    </label>
                </div>
            )
    }

    return (
        <div className="row mt-4">
            <h4 className="text-center">{props.heading}</h4>
            <div className="col mt-3 text-center">
                {generateSelectOptions()}
            </div>
        </div>
    )

}

export default Select;