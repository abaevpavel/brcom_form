import React, { useEffect } from 'react';

function Comments(props) {

    useEffect(() => {
    })


    return (
        <div className="row mt-4">
            <h4 className="text-center">Comment below:</h4>
            <div className="col col-sm-6 mx-auto">
                <div className="input-group">
                    <textarea className="form-control comments" aria-label="comment"></textarea>
                </div>
            </div>
        </div>
    )
}

export default Comments;