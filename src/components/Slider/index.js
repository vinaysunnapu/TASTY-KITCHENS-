import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'
import Slider from 'react-slick'

import Loader from 'react-loader-spinner'

const offersApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const settings = {
  dots: true,
  autoplay: true,
}

class SliderList extends Component {
  state = {offersData: [], offerApiStatus: offersApiStatusConstants.initial}

  componentDidMount() {
    this.getOffersData()
  }

  getOffersData = async () => {
    this.setState({offerApiStatus: offersApiStatusConstants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const offersData = await response.json()
    const formattedOffersData = offersData.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))

    console.log(formattedOffersData)
    this.setState({
      offersData: formattedOffersData,
      offerApiStatus: offersApiStatusConstants.success,
    })
  }

  renderOffersLoadingView = () => (
    <div className="offer-loader-container" testid="restaurants-offers-loader">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderOffersListView = () => {
    const {offersData} = this.state

    return (
      <Slider {...settings}>
        {offersData.map(eachOffer => (
          <div key={eachOffer.id}>
            <img src={eachOffer.imageUrl} alt="offer" className="offer-image" />
          </div>
        ))}
      </Slider>
    )
  }

  renderSliderDetails = () => {
    const {offerApiStatus} = this.state

    switch (offerApiStatus) {
      case offersApiStatusConstants.success:
        return this.renderOffersListView()
      case offersApiStatusConstants.inProgress:
        return this.renderOffersLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="slider-container">{this.renderSliderDetails()}</div>
  }
}

export default SliderList
