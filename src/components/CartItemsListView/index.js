import './index.css'

import CartItem from '../CartItem'

const CartItemsListView = () => {
  const parsedCartList = JSON.parse(localStorage.getItem('cartData'))
  console.log(parsedCartList)

  return (
    <ul className="cart-list-container">
      {parsedCartList.map(eachItem => (
        <CartItem cartItemDetails={eachItem} key={eachItem.foodId} />
      ))}
    </ul>
  )
}

export default CartItemsListView
