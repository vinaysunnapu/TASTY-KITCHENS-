import {Component} from 'react'
import './index.css'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {MdSort} from 'react-icons/md'

import RestaurantCard from '../RestaurantCard'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const restApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class PopularRestaurants extends Component {
  state = {
    restData: [],
    restApiStatus: restApiStatusConstants.initial,
    sortByValue: sortByOptions[1].value,
    activePageValue: 1,
    offsetValue: 0,
    limitValue: 9,
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  decreasePage = () => {
    const {activePageValue} = this.state
    if (activePageValue > 1) {
      this.setState(
        prevState => ({
          activePageValue: prevState.activePageValue - 1,
        }),
        this.calculateOffset,
      )
    }
  }

  increasePage = () => {
    const {activePageValue} = this.state
    if (activePageValue < 4) {
      this.setState(
        prevState => ({
          activePageValue: prevState.activePageValue + 1,
        }),
        this.calculateOffset,
      )
    }
  }

  calculateOffset = () => {
    const {activePageValue} = this.state
    const offset = (activePageValue - 1) * 9
    this.setState({offsetValue: offset}, this.callData)
  }

  callData = () => {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {sortByValue, offsetValue, limitValue} = this.state
    this.setState({restApiStatus: restApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offsetValue}&limit=${limitValue}&sort-by-rating=${sortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      const restFormattedData = data.restaurants.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))
      console.log(restFormattedData)
      this.setState({
        restData: restFormattedData,
        restApiStatus: restApiStatusConstants.success,
      })
    } else {
      this.state({restApiStatus: restApiStatusConstants.failure})
    }
  }

  renderRestaurantsLoadingView = () => (
    <div testid="restaurants-list-loader" className="offer-loader-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderRestaurantsFailureView = () => {}

  renderRestaurantsListView = () => {
    const {restData} = this.state

    return (
      <ul className="restaurant-list-container">
        {restData.map(eachRest => (
          <RestaurantCard restCard={eachRest} key={eachRest.id} />
        ))}
      </ul>
    )
  }

  getPopularRestaurantsList = () => {
    const {restApiStatus} = this.state

    switch (restApiStatus) {
      case restApiStatusConstants.success:
        return this.renderRestaurantsListView()
      case restApiStatusConstants.failure:
        return this.renderRestaurantsFailureView()
      case restApiStatusConstants.inProgress:
        return this.renderRestaurantsLoadingView()
      default:
        return null
    }
  }

  onChangeSortBy = event => {
    console.log(event.target.value)
    this.setState({sortByValue: event.target.value}, this.sortByCallback)
  }

  sortByCallback = () => {
    this.getRestaurantsData()
  }

  render() {
    const {sortByValue, activePageValue} = this.state
    return (
      <div className="popular-restaurant-container">
        <h1 className="pop-rest-heading">Popular Restaurants</h1>
        <div className="desktop-sort-by-container">
          <p className="pop-rest-para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-by-container">
            <MdSort />
            <p className="sort-by-para">Sort by</p>
            <select
              name="sortBy"
              className="select-element"
              onChange={this.onChangeSortBy}
              value={sortByValue}
            >
              <option value={sortByOptions[0].value}>
                {sortByOptions[0].displayText}
              </option>
              <option value={sortByOptions[1].value} selected>
                {sortByOptions[1].displayText}
              </option>
            </select>
          </div>
        </div>
        {this.getPopularRestaurantsList()}
        <div className="pagination-container">
          <button
            testid="pagination-left-button"
            type="button"
            className="pagination-button"
            onClick={this.decreasePage}
          >
            <RiArrowDropLeftLine size={50} />
          </button>
          <p className="pagination-para">
            <span testid="active-page-number">{activePageValue}</span> of 4
          </p>
          <button
            testid="pagination-right-button"
            type="button"
            className="pagination-button"
            onClick={this.increasePage}
          >
            <RiArrowDropRightLine size={50} />
          </button>
        </div>
      </div>
    )
  }
}
export default PopularRestaurants
