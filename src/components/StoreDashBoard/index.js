import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiStore} from 'react-icons/bi'

// import VaccinationCoverage from '../VaccinationCoverage'
// import VaccinationByGender from '../VaccinationByGender'
// import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class StoreDashBoard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    last7DaysVaccinationList: [],
    vaccinationByAgeList: [],
    vaccinationByGenderList: [],
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  getFormattedlast7dayData = data => ({
    vaccineDate: data.vaccine_date,
    dose1: data.dose_1,
    dose2: data.dose_2,
  })

  getDataFromApi = async () => {
    const jwtToken = Cookies.get('jwt_token')
    this.setState({apiStatus: apiStatusConstants.loading})
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Access-Control-Allow-Origin': 'no-cors',
      },
    }
    const url = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json'

    const response = await fetch('', options)
    const jsonData = await response.json()

    console.log(jwtToken)

    if (response.ok === true) {
      this.setState({
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }

    // console.table(formattedLast7DaysVaccinationList)
  }

  renderLoaderPage = () => (
    <div data-testid="loader">
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

  renderCowinCoverageSection = () => {
    const {last7DaysVaccinationList} = this.state
    return (
      <>
        <h2>VaccinationCoverage</h2>
        {/* <VaccinationCoverage
          last7DaysVaccinationList={last7DaysVaccinationList}
        /> */}
      </>
    )
  }

  renderVaccinationByGenderSection = () => {
    const {vaccinationByGenderList} = this.state
    return (
      <h2>VaccinationByGender</h2>
      //   <VaccinationByGender vaccinationByGenderList={vaccinationByGenderList} />
    )
  }

  renderVaccinationByAgeSection = () => {
    const {vaccinationByAgeList} = this.state
    return <h2>VaccinationByAge</h2>
    // <VaccinationByAge vaccinationByAgeList={vaccinationByAgeList} />
  }

  //

  renderAllSections = () => (
    <>
      <li className="li-item">{this.renderCowinCoverageSection()}</li>
      <li className="li-item">{this.renderVaccinationByGenderSection()}</li>
      <li className="li-item">{this.renderVaccinationByAgeSection()}</li>
    </>
  )
  //

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

  render() {
    return (
      <div className="app-container">
        <nav className="navbar">
          <div className="logo-heading">
            <BiStore size={30} className="app-logo" />
            <h2 className="app-heading">Store</h2>
          </div>
        </nav>
        <h1 className="store-heading">Categories In Store</h1>
        <div className="responsive">{this.renderResultPage()}</div>
      </div>
    )
  }
}

export default StoreDashBoard
