import './index.css'
import {Link} from 'react-router-dom'
import Header from '../Header'

const NotFound = () => (
  <>
    <Header />
    <div className="notfound-container">
      <img
        src="https://res.cloudinary.com/dcauubpq9/image/upload/v1676350343/Group_1_lentsn.png"
        alt="not found"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-para">
        We are sorry, the page you requested could not be found. Please go back
        to the homepage
      </p>
      <Link to="/">
        <button type="button" className="not-home-page-button">
          Home Page
        </button>
      </Link>
    </div>
  </>
)

export default NotFound
