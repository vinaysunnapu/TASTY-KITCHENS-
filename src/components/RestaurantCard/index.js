import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const RestaurantCard = props => {
  const {restCard} = props
  const {id, imageUrl, name, rating, totalReviews} = restCard
  console.log(rating)
  return (
    <li testid="restaurant-item" className="rest-list-item">
      <Link to={`/restaurant/${id}`}>
        <img src={imageUrl} alt="restaurant" className="rest-image" />
      </Link>
      <div className="rest-content-container">
        <h1 className="rest-name">{name}</h1>
        <p>Fast Food</p>
        <div className="rest-rating-container">
          <AiFillStar color="#FFCC00" />
          <p className="rest-rating">
            {rating} ({totalReviews} ratings)
          </p>
        </div>
      </div>
    </li>
  )
}
export default RestaurantCard
