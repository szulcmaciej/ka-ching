import React from "react";
import "./Money.css"

export default function Timer(props) {
    let money_earned = (props.hourly_rate * props.time_ms / (3600 * 1000)).toFixed(2);
    let money_earned_string = "💰" + money_earned + " " + props.currency;
return (
	<div className="money">
		{money_earned_string}
	</div>
);
}
