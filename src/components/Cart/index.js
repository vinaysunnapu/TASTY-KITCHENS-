import CartContext from '../../context/cartContext'
import './index.css'
import Header from '../Header'
import NoCartView from '../NoCartView'
import Footer from '../Footer'
import CartItemsListView from '../CartItemsListView'
import CartTotalView from '../cartTotalView'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const showEmptyCartView = cartList.length === 0

      return (
        <>
          <Header />
          <div className="main-cart-container">
            {showEmptyCartView ? (
              <NoCartView />
            ) : (
              <div testid="cartItem" className="sub-cart-container">
                <div className="cart-header-container">
                  <p className="header-item">Item</p>
                  <p className="header-item">Quantity</p>
                  <p className="header-item">Price</p>
                </div>
              </div>
            )}
            <CartItemsListView />
            <hr className="h-line" />
            <CartTotalView />
          </div>
          <Footer />
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
