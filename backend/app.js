const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const cors = require('cors')

const app = express()
const PORT = 3002 // You can use any available port here

// Sample seed data (initialize as an empty array)
let database = []

// Middleware
app.use(cors())

app.use(bodyParser.json())

// API to fetch data from the third-party API and initialize the database with seed data

app.get('/api/initializeDatabase', async (req, res) => {
  try {
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json',
    )
    database = response.data
    // console.log(database)

    res.json({
      message: 'Database initialized with data from the third-party API.',
    })
  } catch (error) {
    console.error('Error initializing database:', error)
    res.status(500).json({error: 'Failed to initialize database.'})
  }
})

async function fetchDataAndInitializeDatabase() {
  try {
    const response = await axios.get(
      'https://s3.amazonaws.com/roxiler.com/product_transaction.json',
    )
    database = response.data
    console.log('Database initialized with data from the third-party API.')
  } catch (error) {
    console.error(
      'Error fetching data from the third-party API:',
      error.message,
    )
  }
}

// Call the helper function to initialize the database on server startup
fetchDataAndInitializeDatabase()

// Helper function to filter data based on the provided month
function filterDataByMonth(month) {
  return database.filter(item => {
    const itemMonth = new Date(item.dateOfSale).getMonth() + 1 // Month starts from 0, so we add 1 to get the correct month number
    return itemMonth === month
  })
}

// API for statistics
app.get('/api/statistics/:month', (req, res) => {
  const month = parseInt(req.params.month)
  const dataForMonth = filterDataByMonth(month)

  const totalSaleAmount = dataForMonth.reduce(
    (total, item) => total + item.price,
    0,
  )
  const totalSoldItems = dataForMonth.filter(item => item.sold).length
  const totalNotSoldItems = dataForMonth.filter(item => !item.sold).length

  res.json({
    totalSaleAmount,
    totalSoldItems,
    totalNotSoldItems,
  })
})

// API for bar chart
app.get('/api/barChart/:month', (req, res) => {
  const month = parseInt(req.params.month)
  const dataForMonth = filterDataByMonth(month)

  const priceRanges = [
    {range: '0 - 100', count: 0},
    {range: '101 - 200', count: 0},
    {range: '201 - 300', count: 0},
    {range: '301 - 400', count: 0},
    {range: '401 - 500', count: 0},
    {range: '501 - 600', count: 0},
    {range: '601 - 700', count: 0},
    {range: '701 - 800', count: 0},
    {range: '801 - 900', count: 0},
    {range: '901 - Above', count: 0},
  ]

  dataForMonth.forEach(item => {
    if (item.price >= 0 && item.price <= 100) {
      priceRanges[0].count++
    } else if (item.price <= 200) {
      priceRanges[1].count++
    } else if (item.price <= 300) {
      priceRanges[2].count++
    } else if (item.price <= 400) {
      priceRanges[3].count++
    } else if (item.price <= 500) {
      priceRanges[4].count++
    } else if (item.price <= 600) {
      priceRanges[5].count++
    } else if (item.price <= 700) {
      priceRanges[6].count++
    } else if (item.price <= 800) {
      priceRanges[7].count++
    } else if (item.price <= 900) {
      priceRanges[8].count++
    } else {
      priceRanges[9].count++
    }
  })

  res.json(priceRanges)
})

// API for pie chart
app.get('/api/pieChart/:month', (req, res) => {
  const month = parseInt(req.params.month)
  const dataForMonth = filterDataByMonth(month)

  const categoryCount = {}
  dataForMonth.forEach(item => {
    const {category} = item
    categoryCount[category] = (categoryCount[category] || 0) + 1
  })

  const pieChartData = Object.entries(categoryCount).map(
    ([category, count]) => ({
      category,
      count,
    }),
  )

  res.json(pieChartData)
})

// API to fetch data from all the 3 APIs and combine the response
app.get('/api/combinedData/:month', async (req, res) => {
  const {month} = req.params
  await axios.get(`http://localhost:${PORT}/api/initializeDatabase`)
  const statistics = await axios.get(
    `http://localhost:${PORT}/api/statistics/${month}`,
  )
  const barChartData = await axios.get(
    `http://localhost:${PORT}/api/barChart/${month}`,
  )
  const pieChartData = await axios.get(
    `http://localhost:${PORT}/api/pieChart/${month}`,
  )

  // Combine the responses and send the final combined JSON
  const combinedData = {
    statistics: statistics.data,
    barChartData: barChartData.data,
    pieChartData: pieChartData.data,
  }

  res.json(combinedData)
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
