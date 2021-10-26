import React, { useState } from "react";
import "./StopWatch.css";
import Timer from "../Timer/Timer";
import Money from "../Money/Money";
import ControlButtons from "../ControlButtons/ControlButtons";
import {play_ka_ching, play_school_bell} from "../../utils/audio";

function StopWatch() {
const [isActive, setIsActive] = useState(false);
const [isPaused, setIsPaused] = useState(true);
const [time, setTime] = useState(0);
const [lastStartTime, setLastStartTime] = useState(0);
const [elapsedBeforePause, setElapsedBeforePause] = useState(0);

React.useEffect(() => {
	let interval = null;

	if (isActive && !isPaused) {
	interval = setInterval(() => {
		setTime((time) => Date.now() - lastStartTime + elapsedBeforePause);
	}, 10);
	} else {
	clearInterval(interval);
	}
	return () => {
	clearInterval(interval);
	};
}, [isActive, isPaused, lastStartTime, elapsedBeforePause]);

const handleStart = () => {
	setLastStartTime(Date.now());
	localStorage.setItem('lastStartTime', lastStartTime);
	setIsActive(true);
	setIsPaused(false);
};

const handlePauseResume = () => {
	if(isPaused){
		setLastStartTime(Date.now());
		localStorage.setItem('lastStartTime', lastStartTime);
	}
	else{
		setElapsedBeforePause(elapsedBeforePause + Date.now() - lastStartTime);
		localStorage.setItem('elapsedBeforePause', elapsedBeforePause);
	}
	setIsPaused(!isPaused);
};

const handleReset = () => {
	setIsActive(false);
	setTime(0);
	setElapsedBeforePause(0);
	localStorage.removeItem('elapsedBeforePause');
};

const hourly_money = 60;
const currency = "PLN";
const ka_ching_every_n_minutes = 60;
const finish_after_hours = 8;

let is_ka_ching_time = time % (ka_ching_every_n_minutes * 60 * 1000) === 0 && time !== 0;
let is_finish_time = time % (finish_after_hours * 60 * 60 * 1000) === 0 && time !== 0;

if(is_ka_ching_time && !is_finish_time){
	play_ka_ching();
	console.log('ka-ching!');
}

if (is_finish_time){
	play_school_bell();
	console.log('bell!');
}

return (
	<div className="stop-watch">
	<Timer time={time} />
	<Money time_ms={time} hourly_money={hourly_money} currency={currency}/>
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
