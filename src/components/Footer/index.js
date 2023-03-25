import './index.css'
import {
  FaPinterestSquare,
  FaTwitter,
  FaInstagram,
  FaFacebookSquare,
} from 'react-icons/fa'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1675139156/Group_7420_mhgait.png"
        alt="website-footer-logo"
        className="footer-logo-image"
      />
      <h1 className="Footer-heading">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div className="social-icons-container">
      <FaPinterestSquare color="#ffffff" testid="pintrest-social-icon" />
      <FaInstagram color="#ffffff" testid="instagram-social-icon" />
      <FaTwitter color="#ffffff" testid="twitter-social-icon" />
      <FaFacebookSquare color="#ffffff" testid="facebook-social-icon" />
    </div>
  </div>
)
export default Footer
