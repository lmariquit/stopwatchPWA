import React, { useState, useEffect } from 'react'

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
        pauseTimer()
      }
      return () => clearInterval(timeInterval)
    },
    [toggle]
  )

  function beginTimer() {
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
