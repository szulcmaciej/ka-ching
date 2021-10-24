import React from 'react';

let hourly_rate = 60;
let currency = "PLN"

function format_time_from_seconds(seconds){
    return new Date(seconds * 1000).toISOString().substr(11, 8);
}

function play_ka_ching() {
    var audio = new Audio('https://www.myinstants.com/media/sounds/ka-ching.mp3');
    audio.play();
  }

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        elapsed_time_seconds: 0,
        elapsing: false,
        intervalID: null
      };
    }
    componentWillUnmount = () => {
      clearInterval(this.state.intervalID);
    }
    tick = () => {
        console.log('tick');
      this.setState((old_state, props) => {
          return {
            elapsed_time_seconds: old_state.elapsed_time_seconds + 1}
          });
        if(this.state.elapsed_time_seconds % 3600 == 0){
            play_ka_ching();
        }
    }

    toggle_elapsing = () => {
        console.log('The button was clicked.')
        this.setState((old_state, props) => {
            if(old_state.elapsing){
                clearInterval(old_state.intervalID);
                return {elapsing: false};
            }
            else{
                console.log('Setting interval')
                let intervalID = setInterval(
                    () => this.tick(),
                    1000
                  );
                return {elapsing: true, intervalID: intervalID};
            }
        });
    }

    render() {
        let time_string = format_time_from_seconds(this.state.elapsed_time_seconds);
        let earnings = hourly_rate / 3600 * this.state.elapsed_time_seconds;
        let play_pause_string = this.state.elapsing ? "Pause" : "Play";
      return (
        <div className="App-clock">
          <h3 class="elapsed-time">{time_string}</h3>
          <h2>You earned {earnings.toFixed(2)} {currency} today</h2>
          <button id="play-pause-button" onClick={() => this.toggle_elapsing()}>{play_pause_string}</button>
        </div>
      );
    }
  }

  export default Clock;