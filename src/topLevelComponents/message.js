import React from 'react';
import Title from '../components/title';

function Message(props) {
    return (
        <div>
            <Title title={props.title}></Title>
            <div className="mt-4">
                <h2 className="text-center">{props.message}</h2>
            </div>
        </div>
    )
}

export default Message;