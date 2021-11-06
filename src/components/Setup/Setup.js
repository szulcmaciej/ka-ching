import React, { useState } from 'react'
import "./Setup.css"

const Setup = (props) => {
    let div_classes = props.visible ? "setup" : "setup hidden";
    return (
        <div className={div_classes}>
            <p>
                Currency
                <input id="currency" value={props.currency} onInput={e => props.setCurrency(e.target.value)} />
            </p>
            <p>
                Hourly rate
                <input id="hourly-rate" value={props.hourly_rate} onInput={e => props.setHourlyRate(e.target.value)}/>
            </p>
        </div>
    )
}

export default Setup
