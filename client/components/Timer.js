import React, { Component } from 'react'

class Timer extends Component {
  constructor() {
    super()
    this.beginTimer = this.beginTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
    this.resetTimer = this.resetTimer.bind(this)
    this.interval
    this.state = {
      toggle: false,
      buttonText: 'START',
      start: 0,
      pauseTime: 0,
      timeIdle: 0,
      hrs: '00',
      mins: '00',
      secs: '00',
      msecs: '00'
    }
  }

  beginTimer() {
    this.interval = setInterval(() => {
      let delta = Date.now() - this.state.start - this.state.timeIdle
      let secsToDisplay = this.state.secs
      let msecsToDisplay = this.state.msecs
      let minsToDisplay = this.state.mins
      let hrsToDisplay = this.state.hrs

      let secsSinceStart = Math.floor((delta / 1000) % 60)
      if (secsSinceStart < 10) {
        secsToDisplay = `0${secsSinceStart.toString()}`
      } else {
        secsToDisplay = secsSinceStart.toString()
      }

      let msecsSinceStart = Math.floor((delta / 10) % 100)
      if (msecsSinceStart < 10) {
        msecsToDisplay = `0${msecsSinceStart.toString()}`
      } else {
        msecsToDisplay = msecsSinceStart.toString()
      }
      // console.log(msecsToDisplay, msecsSinceStart, secsToDisplay)

      let minsSinceStart = Math.floor(delta / 1000 / 60) % 60
      if (minsSinceStart < 60) {
        minsToDisplay = `0${minsSinceStart.toString()}`
      } else {
        minsToDisplay = minsSinceStart.toString()
      }

      let hrsSinceStart = Math.floor(delta / 1000 / 60 / 60)
      if (hrsSinceStart < 60) {
        hrsToDisplay = `0${hrsSinceStart.toString()}`
      } else {
        hrsToDisplay = hrsSinceStart.toString()
      }

      this.setState({
        secs: secsToDisplay,
        msecs: msecsToDisplay,
        mins: minsToDisplay,
        hrs: hrsToDisplay
      })
    }, 25)
  }

  pauseTimer() {
    this.setState({ pauseTime: Date.now() })
    clearInterval(this.interval)
  }

  toggleTimer() {
    if (this.state.toggle) {
      this.setState({
        toggle: false,
        buttonText: 'START'
      })
      this.pauseTimer()
    } else {
      if (this.state.start === 0) {
        this.setState({
          start: Date.now(),
          toggle: true,
          buttonText: 'PAUSE'
        })
      } else {
        let timeToStart = Date.now()
        let timeIdle = timeToStart - this.state.pauseTime
        this.setState({
          pauseTime: 0,
          timeIdle: this.state.timeIdle + timeIdle,
          toggle: true,
          buttonText: 'PAUSE'
        })
      }
      this.beginTimer()
    }
  }

  resetTimer() {
    if (!this.state.toggle) {
      this.setState({
        start: 0,
        pauseTime: 0,
        timeIdle: 0,
        hrs: '00',
        mins: '00',
        secs: '00',
        msecs: '00'
      })
    }
  }

  render() {
    return (
      <div id="stopwatch">
        <div id="timer-container">
          <div id="timer-image" />
          <div id="timer">
            <div id="hrs">{this.state.hrs}</div>
            <div className="colons">:</div>
            <div id="mins">{this.state.mins}</div>
            <div className="colons">:</div>
            <div id="secs">{this.state.secs}</div>
            <div id="msecs">{this.state.msecs}</div>
          </div>
        </div>
        <div id="button-container">
          <div id="reset-button" onClick={() => this.resetTimer()}>
            RESET
          </div>
          <div id="start-button" onClick={() => this.toggleTimer()}>
            {this.state.buttonText}
          </div>
        </div>
      </div>
    )
  }
}

export default Timer
