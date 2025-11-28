import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function Eta(props) {
    const [startDate, setStartDate] = useState('');

    useEffect(() => {
    })

    if (!(
        (props.eta && props.eta === "YES") ||
        (props.eta === "CONDITIONAL" && props.required)
    )
    ) {
        return (null);
    }

    function handleChange(date) {
        setStartDate(date);
        props.formChange({ 'target': { 'className': 'eta', 'value': date } })
    }

    return (
        <div className="row mt-3">
            <h4 className="text-center"> Please, select the ETA:</h4>
            <div className="col text-center">
                {
                    (props.required)
                        ? <DatePicker selected={startDate} onChange={date => handleChange(date)} className="eta" required />
                        : <DatePicker selected={startDate} onChange={date => handleChange(date)} className="eta" />
                }
            </div>
        </div>
    )

}

export default Eta;