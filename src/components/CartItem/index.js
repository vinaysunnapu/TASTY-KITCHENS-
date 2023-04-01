import './index.css'
import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/cartContext'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {addQuantity, decreaseQuantity} = value
      const {cartItemDetails} = props

      const {
        cost,
        foodId,
        foodImageUrl,
        foodName,
        foodRating,
        itemQuantity,
      } = cartItemDetails

      const onClickDecreaseQuantity = () => {
        decreaseQuantity(foodId)
      }

      const onClickAddQuantity = () => {
        addQuantity(foodId)
      }

      return (
        <>
          <li testid="cartItem" className="cart-list-item">
            <div className="food-image-container">
              <img
                src={foodImageUrl}
                alt={foodName}
                className="cart-food-image"
              />
              <h1 className="food-name">{foodName}</h1>
            </div>
            <div className="item-quantity-container">
              <button
                testid="decrement-quantity"
                type="button"
                className="quantity-button"
                onClick={onClickDecreaseQuantity}
              >
                <BsDashSquare size={14} />
              </button>
              <p className="item-quantity">{itemQuantity}</p>
              <button
                testid="increment-quantity"
                type="button"
                className="quantity-button"
                onClick={onClickAddQuantity}
              >
                <BsPlusSquare size={14} />
              </button>
            </div>
            <p className="item-cost">
              <BiRupee />
              {cost * itemQuantity}
            </p>
          </li>
          <li className="mobile-list-item">
            <img
              src={foodImageUrl}
              alt={foodName}
              className="cart-food-image"
            />
            <div className="mobile-item-container">
              <h1 className="food-name">{foodName}</h1>
              <div className="item-quantity-container">
                <button
                  type="button"
                  className="quantity-button"
                  onClick={onClickDecreaseQuantity}
                >
                  <BsDashSquare size={14} />
                </button>
                <p className="item-quantity">{itemQuantity}</p>
                <button
                  type="button"
                  className="quantity-button"
                  onClick={onClickAddQuantity}
                >
                  <BsPlusSquare size={14} />
                </button>
              </div>
              <p className="item-cost">
                <BiRupee />
                {cost * itemQuantity}
              </p>
            </div>
          </li>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
