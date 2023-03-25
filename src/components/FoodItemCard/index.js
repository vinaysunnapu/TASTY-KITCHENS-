import {Component} from 'react'
import './index.css'
import {FaRupeeSign} from 'react-icons/fa'
import {AiFillStar} from 'react-icons/ai'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'

import CartContext from '../../context/cartContext'

class FoodItemCard extends Component {
  state = {itemQuantity: 0}

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            addCartItem,
            deleteCartItem,
            addQuantity,
            decreaseQuantity,
          } = value

          const {itemQuantity} = this.state
          const {foodItemDetails} = this.props

          const {
            cost,
            foodId,
            foodImageUrl,
            foodName,
            foodRating,
          } = foodItemDetails

          const onClickAddedToCart = () => {
            this.setState(
              prevState => ({
                itemQuantity: prevState.itemQuantity + 1,
              }),
              addCartItem({...foodItemDetails, itemQuantity: 1}),
            )
          }

          const onClickDecreaseQuantity = () => {
            this.setState(prevState => ({
              itemQuantity: prevState.itemQuantity - 1,
            }))
            decreaseQuantity(foodId)
          }

          const onClickIncreaseQuantity = () => {
            this.setState(prevState => ({
              itemQuantity: prevState.itemQuantity + 1,
            }))
            addQuantity(foodId)
          }

          return (
            <li className="list-item-container" testid="foodItem">
              <img
                src={foodImageUrl}
                alt="food-item"
                className="food-item-image"
              />
              <div className="food-item-details">
                <h1 className="food-name-heading">{foodName}</h1>
                <div className="food-cost-container">
                  <FaRupeeSign />
                  <p className="food-cost">{cost}</p>
                </div>
                <div className="food-rating-container">
                  <AiFillStar color="#FFCC00" />
                  <p className="food-rating">{foodRating}</p>
                </div>
                {itemQuantity === 0 ? (
                  <button
                    type="button"
                    className="add-button"
                    onClick={onClickAddedToCart}
                  >
                    ADD
                  </button>
                ) : (
                  <div className="item-quantity-container">
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={onClickDecreaseQuantity}
                      testid="decrement-count"
                    >
                      <BsDashSquare size={14} />
                    </button>
                    <p className="item-quantity" testid="active-count">
                      {itemQuantity}
                    </p>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={onClickIncreaseQuantity}
                      testid="increment-count"
                    >
                      <BsPlusSquare size={14} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          )
        }}
      </CartContext.Consumer>
    )
  }
}
export default FoodItemCard
