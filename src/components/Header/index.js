import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

import Popup from 'reactjs-popup'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  render() {
    return (
      <nav className="desktop-nav-container">
        <ul className="desktop-header-ul-container">
          <li className="desktop-header-list-item1">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcauubpq9/image/upload/v1674875356/Group_7420_tjlrcp.png"
                alt="website logo"
                className="header-logo-image"
              />
            </Link>
            <h1 className="desktop-header-heading">Tasty Kitchens</h1>
          </li>
          <li className="desktop-header-list-item2">
            <Link to="/" className="link">
              <li className="desktop-header-home">Home</li>
            </Link>
            <Link to="/cart" className="link">
              <li className="desktop-header-cart">Cart</li>
            </Link>
            <li>
              <button
                type="button"
                className="desktop-logout-button"
                onClick={this.onClickLogout}
                testid="logout-button"
              >
                Logout
              </button>
            </li>
          </li>
        </ul>
        <div className="mobile-header-container">
          <div className="mobile-logo-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dcauubpq9/image/upload/v1674875356/Group_7420_tjlrcp.png"
                alt="website logo"
                className="mobile-header-logo-image"
              />
            </Link>
            <h1 className="mobile-header-heading">Tasty Kitchens</h1>
          </div>
          <div className="popup-container">
            <Popup
              modal
              trigger={
                <button type="button" className="trigger-button">
                  <GiHamburgerMenu />
                </button>
              }
              // position="top left"
            >
              {close => (
                <div className="nav-list-bg-container">
                  <ul className="mobile-nav-list-container">
                    <Link to="/" className="link-item">
                      <li className="mobile-nav-home">Home</li>
                    </Link>
                    <Link to="/cart" className="link-item">
                      <li className="mobile-nav-cart">Cart</li>
                    </Link>
                    <li>
                      <button
                        type="button"
                        className="mobile-logout-button"
                        onClick={this.onClickLogout}
                        testid="logout-button"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => close()}
                  >
                    <AiFillCloseCircle size="18px" />
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
