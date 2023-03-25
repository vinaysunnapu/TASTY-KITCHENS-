import {Component} from 'react'
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {FaRupeeSign} from 'react-icons/fa'

import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

const restApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class EachRestaurantDetails extends Component {
  state = {restaurantDetails: {}, foodItemsList: []}

  componentDidMount() {
    this.getRestaurantFoodItemDetails()
  }

  getRestaurantFoodItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const restrauntId = id
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${restrauntId}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(data)

    const formattedRestData = {
      costForTwo: data.cost_for_two,
      restId: data.id,
      restImageUrl: data.image_url,
      location: data.location,
      name: data.name,
      rating: data.rating,
      reviewCount: data.reviews_count,
    }
    const formattedFoodItems = data.food_items.map(each => ({
      cost: each.cost,
      foodId: each.id,
      foodImageUrl: each.image_url,
      foodName: each.name,
      foodRating: each.rating,
    }))

    this.setState({
      restaurantDetails: formattedRestData,
      foodItemsList: formattedFoodItems,
    })
  }

  render() {
    const {restaurantDetails, foodItemsList} = this.state
    const {
      costForTwo,
      restId,
      restImageUrl,
      location,
      name,
      rating,
      reviewCount,
    } = restaurantDetails

    return (
      <>
        <Header />
        <div className="rest-main-details-container">
          <img
            src={restImageUrl}
            alt="restaurant"
            className="restaurant-image"
          />
          <div className="rest-details-container">
            <h1 className="rest-heading">{name}</h1>
            <p className="rest-location">{location}</p>
            <div className="rest-sub-details">
              <div className="rating-container">
                <p>
                  <AiFillStar /> {rating}
                </p>
                <p>{reviewCount}+ ratings</p>
              </div>
              <div className="cost-container">
                <p>
                  <FaRupeeSign />
                  {costForTwo}
                </p>
                <p>Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list-container">
          {foodItemsList.map(eachItem => (
            <FoodItemCard foodItemDetails={eachItem} key={eachItem.foodId} />
          ))}
        </ul>

        <Footer />
      </>
    )
  }
}

export default EachRestaurantDetails
