import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import ReactDatePicker from 'react-datepicker'


const ReactDatePicker= () => {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <ReactDatePicker selected={startdate} onChange={(date) => setStartDate(date)} />
  )
}

export default ReactDatePicker
