import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {BiStore} from 'react-icons/bi'

import Statistics from '../Statistics'
import StatsOfIndividual from '../StatsOfIndividual'

import BarChartPage from '../BarChartPage'
import BargraphIndividual from '../BargraphIndividual'

import PieChartPage from '../PieChartPage'
import PieChartIndividual from '../PieChartIndividual'

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

class StoreDashBoard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    selectedMonth: 1,

    isChecked: false,

    combinedData: [],
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  onCheckBox = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeMonth = value => {
    this.setState({selectedMonth: value}, this.getDataFromApi)
  }

  getDataFromApi = async () => {
    const {selectedMonth} = this.state

    this.setState({apiStatus: apiStatusConstants.loading})

    const ApiUrl = `http://localhost:8000/api/combinedData/${selectedMonth}`

    const response = await fetch(ApiUrl)
    const jsonData = await response.json()

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
        combinedData: jsonData,
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
    const {combinedData, selectedMonth} = this.state
    console.log(combinedData, new Date().toLocaleTimeString())

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
          <Statistics statisticsData={combinedData.statistics} />
        </li>
        <li className="li-item">
          <h2 className="heading-each-section">
            {' '}
            Bar Chart -
            <span className="in-the-month">
              {' '}
              In the month of {MonthsArray[selectedMonth - 1]}
            </span>
          </h2>
          <BarChartPage barChartData={combinedData.barChartData} />
        </li>
        <li className="li-item">
          <h2 className="heading-each-section">
            {' '}
            Pie Chart -
            <span className="in-the-month">
              {' '}
              In the month of {MonthsArray[selectedMonth - 1]}
            </span>
          </h2>
          <PieChartPage pieChartData={combinedData.pieChartData} />
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

  renderIndividualPage = () => {
    const {isChecked} = this.state
    const activeClassName = isChecked && 'active-btn'
    return (
      <>
        <div className="Track-Individually-container">
          <button
            type="button"
            className={`Individually-btn ${activeClassName}`}
            onClick={this.onCheckBox}
          >
            Track Individually
          </button>
        </div>
        {isChecked && (
          <div className="responsive">
            <StatsOfIndividual />

            <BargraphIndividual />

            <PieChartIndividual />
          </div>
        )}
        {isChecked && <hr className="h-line" />}
      </>
    )
  }

  render() {
    const {selectedMonth, isChecked} = this.state

    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="logo-heading">
            <BiStore size={30} className="app-logo" />
            <h2 className="app-heading">Store</h2>
          </div>
        </nav>

        <h2 className="sub-heading">Store Dashboard</h2>

        {this.renderIndividualPage()}

        {!isChecked && (
          <>
            <Filter month={selectedMonth} onChangeMonth={this.onChangeMonth} />
            <div className="responsive">
              <> {this.renderResultPage()}</>
            </div>
            <hr className="h-line" />
          </>
        )}
      </div>
    )
  }
}

export default StoreDashBoard
