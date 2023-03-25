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
  }

  componentDidMount() {
    this.getRestaurantsData()
  }

  getRestaurantsData = async () => {
    const {sortByValue} = this.state
    this.setState({restApiStatus: restApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?offset=0&limit=9&sort-by-rating=${sortByValue}`
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
    <div className="offer-loader-container" testid="restaurants-list-loader">
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
    const {sortByValue} = this.state
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
            type="button"
            className="pagination-button"
            testid="pagination-left-button"
          >
            <RiArrowDropLeftLine size={50} />
          </button>
          <p className="pagination-para">
            <span testid="active-page-number">1</span> of 4
          </p>
          <button
            type="button"
            className="pagination-button"
            testid="pagination-right-button"
          >
            <RiArrowDropRightLine size={50} />
          </button>
        </div>
      </div>
    )
  }
}
export default PopularRestaurants
