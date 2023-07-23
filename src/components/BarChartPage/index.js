import './index.css'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const DataFormatter = number => {
  if (number > 1000) {
    return `${(number / 1000).toString()}k`
  }
  return number.toString()
}
const BarChartPage = props => {
  const {barChartData} = props

  return (
    <div>
      <div className="bg-container">
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={barChartData}
            margin={{
              top: 5,
            }}
          >
            <XAxis
              dataKey="range"
              tick={{
                stroke: 'white',
                strokeWidth: 1,
              }}
            />
            <YAxis
              tickFormatter={DataFormatter}
              tick={{
                stroke: 'gray',
                strokeWidth: 0,
              }}
            />
            <Legend
              wrapperStyle={{
                padding: 30,
              }}
            />
            <Bar dataKey="count" name="count" fill="#1f77b4" barSize="20%" />
            {/* <Bar dataKey="girls" name="Girls" fill="#fd7f0e" barSize="20%" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BarChartPage
