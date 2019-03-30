import React, { Component } from 'react'

class Timer extends Component {
  constructor() {
    super()
    this.beginTimer = this.beginTimer.bind(this)
    this.pauseTimer = this.pauseTimer.bind(this)
    this.toggleTimer = this.toggleTimer.bind(this)
    this.interval
    this.state = {
      toggle: false,
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
    // this.setState({
    //   start: Date.now()
    // })
    // let start = Date.now()
    // let start = Date.now() - 7190000
    this.interval = setInterval(() => {
      // console.log('start', this.state.start, 'idle', this.state.timeIdle)
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

      // let msecsSinceStart = Math.floor(delta % 100)
      let msecsSinceStart = Math.floor((delta / 10) % 100)
      if (msecsSinceStart < 10) {
        msecsToDisplay = `0${msecsSinceStart.toString()}`
      } else {
        msecsToDisplay = msecsSinceStart.toString()
      }
      console.log(msecsToDisplay, msecsSinceStart, secsToDisplay)

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
        toggle: false
      })
      this.pauseTimer()
    } else {
      if (this.state.start === 0) {
        this.setState({
          start: Date.now(),
          toggle: true
        })
        console.log('HIT')
      } else {
        let timeToStart = Date.now()
        let timeIdle = timeToStart - this.state.pauseTime
        // console.log(timeIdle)
        this.setState({
          pauseTime: 0,
          timeIdle: this.state.timeIdle + timeIdle,
          toggle: true
        })
      }
      this.beginTimer()
    }
  }

  render() {
    return (
      <div id="timer-container">
        <div id="hrs">{this.state.hrs}</div>
        <div className="colons">:</div>
        <div id="mins">{this.state.mins}</div>
        <div className="colons">:</div>
        <div id="secs">{this.state.secs}</div>
        <div className="colons">:</div>
        <div id="msecs">{this.state.msecs}</div>
        <div onClick={() => this.toggleTimer()}>START</div>
      </div>
    )
  }
}

export default Timer
