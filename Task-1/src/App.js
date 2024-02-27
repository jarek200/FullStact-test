import React, { useState } from 'react'

import './App.css'

function App() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const divWidths = [200, 300, 400]
  let divsPerRow = [2, 2, 1]

  const handleScrollerChange = e => {
    const newPosition = (e.target.value / 100) * (800 - window.innerWidth)
    setScrollPosition(newPosition)
  }

  return (
    <>
      <div className='container' style={{ left: `-${scrollPosition}px` }}>
        <div className='ruler'>
          {[...Array(11)].map((_, i) => (
            <span key={i} className='ruler-tick'>
              {i}
            </span>
          ))}
        </div>
        <div className='timeline'></div>
        {divsPerRow.map((numDivs, rowIndex) => (
          <div key={rowIndex} className='flex-container' style={{ backgroundColor: '#3e3e40' }}>
            {[...Array(numDivs)].map((_, divIndex) => (
              <div key={divIndex} className='clips' style={{ width: divWidths[divIndex] }}></div>
            ))}
          </div>
        ))}
      </div>
      <div className='scroller-container'>
        <input
          type='range'
          min='0'
          max='100'
          value={(scrollPosition / (800 - window.innerWidth)) * 100}
          onChange={handleScrollerChange}
          className='scroller'
        />
      </div>
    </>
  )
}

export default App
