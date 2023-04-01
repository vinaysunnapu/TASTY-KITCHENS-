import {Link} from 'react-router-dom'
import './index.css'

const NoCartView = () => {
  const a = 10

  return (
    <div className="no-cart-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1676266397/Layer_2_cs8nm8.png"
        alt="empty cart"
        className="no-cart-image"
      />
      <h1 className="no-cart-heading">No Orders Yet!</h1>
      <p className="no-cart-para">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button type="button" className="no-cart-button">
          Order Now
        </button>
      </Link>
    </div>
  )
}
export default NoCartView
