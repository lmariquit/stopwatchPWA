import React, { useState, useEffect, useRef } from 'react'

const Timer = () => {
  let timeInterval
  let resetOpacity
  const [toggle, setToggle] = useState(false)
  const [buttonText, setButtonText] = useState('START')
  const [startTime, setStartTime] = useState(0)
  const [pauseTime, setPauseTime] = useState(0)
  const [timeIdle, setTimeIdle] = useState(0)
  const [hrs, setHrs] = useState('00')
  const [mins, setMins] = useState('00')
  const [secs, setSecs] = useState('00')
  const [msecs, setMsecs] = useState('00')

  if (toggle || startTime === 0) {
    resetOpacity = { opacity: '0.6' }
  }

  useEffect(
    function beginOrPauseTimer() {
      if (toggle) {
        console.log('starting....')
        beginTimer()
      } else {
        console.log('pausing...')
        clearInterval(timeInterval)
        pauseTimer()
      }
    },
    [toggle]
  )

  function beginTimer() {
    timeInterval = setInterval(runTimer(), 1000)
  }

  function runTimer() {
    console.log('Running Timer')
    timeInterval = setInterval(() => {
      let delta = Date.now() - startTime - timeIdle
      let secsToDisplay = secs
      let msecsToDisplay = msecs
      let minsToDisplay = mins
      let hrsToDisplay = hrs

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

      setSecs(secsToDisplay)
      setMsecs(msecsToDisplay)
      setMins(minsToDisplay)
      setHrs(hrsToDisplay)
    }, 25)
  }

  function pauseTimer() {
    console.log('PAUSING TIMER NOW')
    setPauseTime(Date.now())
  }

  function toggleTimer() {
    if (toggle) {
      setToggle(false)
      setButtonText('START')
    } else {
      if (startTime === 0) {
        setStartTime(Date.now())
      } else {
        let timeToStart = Date.now()
        let newTimeIdle = timeToStart - pauseTime
        setPauseTime(0)
        setTimeIdle(timeIdle + newTimeIdle)
      }
      setToggle(true)
      setButtonText('PAUSE')
    }
  }

  function resetTimer() {
    if (!toggle) {
      setStartTime(0)
      setPauseTime(0)
      setTimeIdle(0)
      setHrs('00')
      setMins('00')
      setSecs('00')
      setMsecs('00')
    }
  }

  return (
    <div id="stopwatch">
      <div id="timer-container">
        <div id="timer-image" />
        <div id="timer">
          <div id="hrs">{hrs}</div>
          <div className="colons">:</div>
          <div id="mins">{mins}</div>
          <div className="colons">:</div>
          <div id="secs">{secs}</div>
          <div id="msecs">{msecs}</div>
        </div>
      </div>
      <div id="button-container">
        <div
          id="reset-button"
          style={resetOpacity}
          onClick={() => resetTimer()}
        >
          RESET
        </div>
        <div id="start-button" onClick={() => toggleTimer()}>
          {buttonText}
        </div>
      </div>
    </div>
  )
}

export default Timer

// class Timer extends Component {
//   constructor() {
//     super()
//     this.beginTimer = this.beginTimer.bind(this)
//     this.pauseTimer = this.pauseTimer.bind(this)
//     this.toggleTimer = this.toggleTimer.bind(this)
//     this.resetTimer = this.resetTimer.bind(this)
//     this.interval
//     this.state = {
//       toggle: false,
//       buttonText: 'START',
//       start: 0,
//       pauseTime: 0,
//       timeIdle: 0,
//       hrs: '00',
//       mins: '00',
//       secs: '00',
//       msecs: '00'
//     }
//   }

//   beginTimer() {
//     this.interval = setInterval(() => {
//       let delta = Date.now() - this.state.start - this.state.timeIdle
//       let secsToDisplay = this.state.secs
//       let msecsToDisplay = this.state.msecs
//       let minsToDisplay = this.state.mins
//       let hrsToDisplay = this.state.hrs

//       let secsSinceStart = Math.floor((delta / 1000) % 60)
//       if (secsSinceStart < 10) {
//         secsToDisplay = `0${secsSinceStart.toString()}`
//       } else {
//         secsToDisplay = secsSinceStart.toString()
//       }

//       let msecsSinceStart = Math.floor((delta / 10) % 100)
//       if (msecsSinceStart < 10) {
//         msecsToDisplay = `0${msecsSinceStart.toString()}`
//       } else {
//         msecsToDisplay = msecsSinceStart.toString()
//       }
//       // console.log(msecsToDisplay, msecsSinceStart, secsToDisplay)

//       let minsSinceStart = Math.floor(delta / 1000 / 60) % 60
//       if (minsSinceStart < 60) {
//         minsToDisplay = `0${minsSinceStart.toString()}`
//       } else {
//         minsToDisplay = minsSinceStart.toString()
//       }

//       let hrsSinceStart = Math.floor(delta / 1000 / 60 / 60)
//       if (hrsSinceStart < 60) {
//         hrsToDisplay = `0${hrsSinceStart.toString()}`
//       } else {
//         hrsToDisplay = hrsSinceStart.toString()
//       }

//       this.setState({
//         secs: secsToDisplay,
//         msecs: msecsToDisplay,
//         mins: minsToDisplay,
//         hrs: hrsToDisplay
//       })
//     }, 25)
//   }

//   pauseTimer() {
//     this.setState({ pauseTime: Date.now() })
//     clearInterval(this.interval)
//   }

//   toggleTimer() {
//     if (this.state.toggle) {
//       this.setState({
//         toggle: false,
//         buttonText: 'START'
//       })
//       this.pauseTimer()
//     } else {
//       if (this.state.start === 0) {
//         this.setState({
//           start: Date.now(),
//           toggle: true,
//           buttonText: 'PAUSE'
//         })
//       } else {
//         let timeToStart = Date.now()
//         let timeIdle = timeToStart - this.state.pauseTime
//         this.setState({
//           pauseTime: 0,
//           timeIdle: this.state.timeIdle + timeIdle,
//           toggle: true,
//           buttonText: 'PAUSE'
//         })
//       }
//       this.beginTimer()
//     }
//   }

//   resetTimer() {
//     if (!this.state.toggle) {
//       this.setState({
//         start: 0,
//         pauseTime: 0,
//         timeIdle: 0,
//         hrs: '00',
//         mins: '00',
//         secs: '00',
//         msecs: '00'
//       })
//     }
//   }

//   render() {
//     let resetOpacity
//     if (this.state.toggle || this.state.start === 0) {
//       resetOpacity = { opacity: '0.6' }
//     }
//     return (
//       <div id="stopwatch">
//         <div id="timer-container">
//           <div id="timer-image" />
//           <div id="timer">
//             <div id="hrs">{this.state.hrs}</div>
//             <div className="colons">:</div>
//             <div id="mins">{this.state.mins}</div>
//             <div className="colons">:</div>
//             <div id="secs">{this.state.secs}</div>
//             <div id="msecs">{this.state.msecs}</div>
//           </div>
//         </div>
//         <div id="button-container">
//           <div
//             id="reset-button"
//             style={resetOpacity}
//             onClick={() => this.resetTimer()}
//           >
//             RESET
//           </div>
//           <div id="start-button" onClick={() => this.toggleTimer()}>
//             {this.state.buttonText}
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default Timer
