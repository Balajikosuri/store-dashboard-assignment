import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Statistics from '../Statistics'

import './index.css'

import Filter from '../Filter'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const MonthsArray = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

class StatsOfIndividual extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    selectedMonth: 1,

    jsData: {},
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  onChangeMonth = value => {
    this.setState({selectedMonth: value}, this.getDataFromApi)
  }

  getDataFromApi = async () => {
    const {selectedMonth} = this.state

    this.setState({apiStatus: apiStatusConstants.loading})

    const ApiUrl = `http://localhost:8000/api/statistics/${selectedMonth}`

    const response = await fetch(ApiUrl)
    const jsonData = await response.json()

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        jsData: jsonData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoaderPage = () => (
    <div>
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <li>
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="error-msg">Something went wrong</h1>
    </li>
  )

  //

  renderAllSections = () => {
    const {jsData, selectedMonth} = this.state
    console.log(jsData, new Date().toLocaleTimeString())

    return (
      <>
        <li className="li-item">
          <h2 className="heading-each-section">
            Statistics -
            <span className="in-the-month">
              {' '}
              In the month of {MonthsArray[selectedMonth - 1]}
            </span>
          </h2>
          <div className="filter-div-sub"> {this.renderFilterSection()}</div>
          <Statistics statisticsData={jsData} />
        </li>
      </>
    )
  }

  renderResultPage = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderAllSections()

      case apiStatusConstants.loading:
        return this.renderLoaderPage()

      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderFilterSection = () => {
    const {selectedMonth} = this.state
    return <Filter month={selectedMonth} onChangeMonth={this.onChangeMonth} />
  }

  render() {
    return <div className="individual-div">{this.renderResultPage()}</div>
  }
}

export default StatsOfIndividual
