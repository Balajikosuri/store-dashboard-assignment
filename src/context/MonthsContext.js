import React from 'react'

const MonthsContext = React.createContext({
  month: 1,
  onChangeMonth: () => {},
  callApiOnSelect: () => {},
})

export default MonthsContext
