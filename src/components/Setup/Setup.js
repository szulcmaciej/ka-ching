import React, { useState } from 'react'

const Setup = () => {
    const [isSetUp, setIsSetUp] = useState(false);
    const [currency, setCurrency] = useState('USD')
    const [hourlyRate, setHourlyRate] = useState(20)
    const [audioOn, setAudioOn] = useState(true)

    return (
        <div>
            <h1>Setup</h1>
        </div>
    )
}

export default Setup
