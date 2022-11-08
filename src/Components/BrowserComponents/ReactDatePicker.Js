import React, { useState } from 'react'
import {ReactUTCDatepicker} from 'react-utc-datepicker';
import DatePicker from 'react-datepicker'

  
const ReactUTCDatepicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <ReactUTCDatepicker format="YYYY-MM-DDT00:00:00.000+00:00" selected={startDate} onChange={(date) => setStartDate(date)} />
  )
}



export default ReactUTCDatepicker




