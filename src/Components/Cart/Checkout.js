import React from 'react'
import { useSelector } from 'react-redux'
import  {selectCartTotal} from "../../features/cart/cartSlice"

const Checkout = () => {
    const total= useSelector(selectCartTotal)
    console.log(total)
  return (
    <>
    {total}
    </>
  )
}

export default Checkout