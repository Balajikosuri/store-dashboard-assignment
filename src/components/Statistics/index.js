import './index.css'

const Statistics = props => {
  const {statisticsData} = props

  return (
    <div className="Statistics-container">
      <h1 className="card-heading">Statistics</h1>
      <div>
        <p>
          Total Sale Amount: RS
          <span className="span-item">{statisticsData.totalSaleAmount}</span>/-
        </p>
        <p>
          Total Sold Items:
          <span className="span-item sold">
            {statisticsData.totalSoldItems}
          </span>
        </p>
        <p>
          Total Not Sold Items:
          <span className="span-item not-sold">
            {statisticsData.totalNotSoldItems}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Statistics
