import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
    const cartData= useSelector(state=>state.cart.items)
    console.log(cartData)
  return (
    cartData && cartData.map((elem)=> elem.name)
  )
}

export default Cart