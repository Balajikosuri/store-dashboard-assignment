import './index.css'

const Filter = props => {
  const {month, onChangeMonth} = props
  return (
    <div className="header-container">
      <select
        className="select-month"
        value={month}
        onChange={event => onChangeMonth(event.target.value)}
      >
        <option value={1}>January</option>
        <option value={2}>February</option>
        <option value={3}>March</option>
        <option value={4}>April</option>
        <option value={5}>May</option>
        <option value={6}>June</option>
        <option value={7}>July</option>
        <option value={8}>August</option>
        <option value={9}>September</option>
        <option value={10}>October</option>
        <option value={11}>November</option>
        <option value={12}>December</option>
      </select>
      <p className="note">
        *Please select Month for statistics ,Bar-graph,Pie-chart
      </p>
    </div>
  )
}

export default Filter
