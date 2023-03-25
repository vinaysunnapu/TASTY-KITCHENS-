import './index.css'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../context/cartContext'

const CartTotalView = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let allItemsOrderCost = 0

      cartList.forEach(eachItem => {
        allItemsOrderCost += eachItem.itemQuantity * eachItem.cost
      })

      return (
        <div className="cart-total-container">
          <div className="order-total-container">
            <h1 className="order-total-heading">Order Total :</h1>
            <div>
              <p className="amount-para" testid="total-price">
                <BiRupee /> {allItemsOrderCost}
              </p>
              <Link to="/payment">
                <button type="button" className="place-order-button">
                  Place Order
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartTotalView
