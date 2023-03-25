import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const Payment = () => (
  <>
    <Header />
    <div className="payment-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1679628771/Vector_1_udg1gu.png"
        alt="success"
        className="ticked-image"
      />
      <h1 className="Payment-Successful-heading">Payment Successful</h1>
      <p className="Payment-Successful-para">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button type="button" className="goto-home-button">
          Go To Home Page
        </button>
      </Link>
    </div>
  </>
)
export default Payment
