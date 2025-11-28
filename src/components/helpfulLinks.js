import React, { useEffect } from 'react';

function HelpfulLinks(props) {
   
    useEffect(() => {
    })
    console.log(props)
    if (!props.links || props.links.length === 0) {
        return(null); 
    }
    else {
        return (
            <div className="mt-4">
            <h4 className="text-center"> Helpful links:</h4>
            <div className="row mt-3 justify-content-center">
                <div className="col-auto text-center" key={`link`}>
                        <a href={props.links} role="button" className="btn btn-primary text-decoration-none" target="_blank" rel="noreferrer">Click here</a>
                    </div>
            </div>
            </div>
        )
    }
}

export default HelpfulLinks;