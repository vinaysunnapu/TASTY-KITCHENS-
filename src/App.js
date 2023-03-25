import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import './App.css'

import LoginForm from './components/LoginForm'

import Home from './components/Home'
import EachRestaurantDetails from './components/EachRestaurantDetails'
import CartContext from './context/cartContext'
import Cart from './components/Cart'
import Payment from './components/payment'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFoundRoute'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const getCartDataFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return []
  }

  return parsedCartList
}

class App extends Component {
  state = {cartList: getCartDataFromLocalStorage()}

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodItemObject = cartList.find(
      eachCartItem => eachCartItem.foodId === foodItem.foodId,
    )
    if (foodItemObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodItemObject.foodId === eachCartItem.foodId) {
            const updatedQuantity = foodItem.itemQuantity

            return {...eachCartItem, itemQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  deleteCartItem = id => {
    console.log(id)
  }

  addQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.foodId) {
          const updatedQuantity = eachCartItem.itemQuantity + 1
          return {...eachCartItem, itemQuantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  decreaseQuantity = id => {
    const {cartList} = this.state
    const productItemObject = cartList.find(
      eachCartItem => eachCartItem.foodId === id,
    )
    if (productItemObject.itemQuantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.foodId) {
            const updatedQuantity = eachCartItem.itemQuantity - 1
            return {...eachCartItem, itemQuantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          deleteCartItem: this.deleteCartItem,
          addQuantity: this.addQuantity,
          decreaseQuantity: this.decreaseQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <Route
            exact
            path="/restaurant/:id"
            component={EachRestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/payment" component={Payment} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
