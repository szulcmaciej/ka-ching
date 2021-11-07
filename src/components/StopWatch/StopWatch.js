import React, { useState } from "react";
import "./StopWatch.css";
import Timer from "../Timer/Timer";
import Money from "../Money/Money";
import ControlButtons from "../ControlButtons/ControlButtons";
import {play_ka_ching, play_school_bell} from "../../utils/audio";
import Setup from "../Setup/Setup";

function StopWatch() {
const [isActive, setIsActive] = useState(false);
const [isPaused, setIsPaused] = useState(true);
const [time, setTime] = useState(0);
const [startTime, setStartTime] = useState(0);
const [currency, setCurrency] = useState('PLN');
const [hourlyRate, setHourlyRate] = useState(20);

React.useEffect(() => {
	if(localStorage.getItem('runningStartTime')){
		setIsActive(true);
		setIsPaused(false);
		let start_time_int = parseInt(localStorage.getItem('runningStartTime'));
		setStartTime(start_time_int);
	}
	if(localStorage.getItem('pausedElapsedTime')){
		setIsActive(true);
		setIsPaused(true);
		let elapsed_time_int = localStorage.getItem('pausedElapsedTime');
		setStartTime(Date.now() - elapsed_time_int);
		setTime(elapsed_time_int);
	}
	if(localStorage.getItem('currency')){
		setCurrency(localStorage.getItem('currency'));
	}
	if(localStorage.getItem('hourlyRate')){
		setHourlyRate(localStorage.getItem('hourlyRate'));
	}
}, []);

React.useEffect(() => {
	let interval = null;

	if (isActive && !isPaused) {
	interval = setInterval(() => {
		setTime(Date.now() - startTime);
	}, 10);
	} else {
	clearInterval(interval);
	}
	return () => {
	clearInterval(interval);
	};
}, [isActive, isPaused, startTime]);

const handleStart = () => {
	let newStartTime = Date.now();
	setStartTime(newStartTime);
	localStorage.setItem('runningStartTime', newStartTime);
	setIsActive(true);
	setIsPaused(false);
};

const handlePauseResume = () => {
	if(isPaused){
		let newStartTime = Date.now() - time;
		setStartTime(newStartTime);
		localStorage.setItem('runningStartTime', newStartTime);
		localStorage.removeItem('pausedElapsedTime');
	}
	else{
		localStorage.setItem('pausedElapsedTime', time);
		localStorage.removeItem('runningStartTime');
	}
	setIsPaused(!isPaused);
};

const handleReset = () => {
	setIsActive(false);
	setTime(0);
	localStorage.removeItem('pausedElapsedTime');
	localStorage.removeItem('runningStartTime');
};

const ka_ching_every_n_minutes = 60;
const finish_after_hours = 8;

let is_ka_ching_time = time % (ka_ching_every_n_minutes * 60 * 1000) < 10 && time !== 0;
let is_finish_time = time % (finish_after_hours * 60 * 60 * 1000) < 10 && time !== 0;

if(is_ka_ching_time && !is_finish_time){
	play_ka_ching();
	console.log('ka-ching!');
}

if (is_finish_time){
	play_school_bell();
	console.log('bell!');
}

const setAndSaveCurrency = (newCurrency) => {
	setCurrency(newCurrency);
	localStorage.setItem('currency', newCurrency);
};

const setAndSaveHourlyRate = (newHourlyRate) => {
	setHourlyRate(newHourlyRate);
	localStorage.setItem('hourlyRate', newHourlyRate);
};

let setup_div = (
	<Setup 
		currency={currency}
		hourly_rate={hourlyRate}
		setCurrency={setAndSaveCurrency}
		setHourlyRate={setAndSaveHourlyRate}
		visible={isPaused || !isActive}
	/>
);

return (
	<div className="stop-watch">
	<Timer time={time} />
	<Money time_ms={time} hourly_rate={hourlyRate} currency={currency}/>
	{setup_div}
	<ControlButtons
		active={isActive}
		isPaused={isPaused}
		handleStart={handleStart}
		handlePauseResume={handlePauseResume}
		handleReset={handleReset}
	/>
	</div>
);
}

export default StopWatch;
