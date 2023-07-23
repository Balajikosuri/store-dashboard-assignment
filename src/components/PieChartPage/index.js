import './index.css'

import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'

const PieChartPage = props => {
  const {pieChartData} = props

  return (
    <div>
      <div className="bg-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              cx="70%"
              cy="40%"
              data={pieChartData}
              startAngle={0}
              endAngle={360}
              innerRadius="40%"
              outerRadius="70%"
              dataKey="count"
            >
              <Cell name="Electronics" fill="#fecba6" />
              <Cell name="Women's Clothing" fill="#b3d23f" />
              <Cell name="Men's Clothing" fill="#a44c9e" />
            </Pie>
            <Legend
              iconType="circle"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PieChartPage
