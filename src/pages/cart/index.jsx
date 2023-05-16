import { useSelector } from "react-redux";
import NextLink from 'next/link'
import { MdShoppingCart } from "react-icons/md";
import RdxRemoveFromCartButton from "../../../redux/cart/RemoveCartButton";
import RdxQtyAddButton from "../../../redux/cart/AddQtyButton";
import RdxDecreaseQtyButton from "../../../redux/cart/DecreaseQtyButton";
import { useState } from 'react'
import axios from "axios";
import Supplements from "./supplements";
import CheckOutSection from "./checkOut";
import { useDispatch } from "react-redux";
import { setLoadingOn, setLoadingOff } from "../../../redux/cartSlice";
import { useSession } from 'next-auth/react'
import Router from 'next/router'


const Cart = (props) => {

  const { cartItems } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  const { data: session } = useSession()

  const [ extra, setExtra ] = useState([]);
  const [ isReadyToPay, setIsReadyToPay ] = useState(false)
  const [ isPayAtRestaurant, setIsPayAtRestaurant ] = useState(false)
  const [ couponAmount, setCouponAmount ] = useState(0)
  const [ couponCode, setCouponCode ] = useState('')
  
  const addOnDistributor = (addOn) => {
    if(addOn.brownRice || addOn.crunch || addOn.eelSauce || addOn.soyPaper || addOn.spicyMayo) {
      return <div className="text-xs flex flex-col">
        {addOn.brownRice && <div className="flex flex-row gap-2 ml-2">
            <p>Brown Rice</p>
            <p>$1.00</p>
          </div>
        }
        {addOn.soyPaper && <div className="flex flex-row gap-2 ml-2">
            <p>Soy Paper</p>
            <p>$1.00</p>
          </div>
        }
        {addOn.crunch && <div className="flex flex-row gap-2 ml-2">
            <p>Crunch Topping</p>
            <p>$0.50</p>
          </div>
        }
        {addOn.eelSauce && <div className="flex flex-row gap-2 ml-2">
            <p>Eel Sauce</p>
            <p>$0.50</p>
          </div>
        }
        {addOn.spicyMayo && <div className="flex flex-row gap-2 ml-2">
            <p>Spicy Mayo</p>
            <p>$0.50</p>
          </div>
        }
      </div>
    }
  }

  const selectDistributor = (addOn, name) => {
    if(name === 'Pick 2 Rolls Lunch') {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selections:</p>
        <p>{addOn.lunchPicks.roll1},</p>
        <p>{addOn.lunchPicks.roll2}</p>
      </div>
    }
    if(name === 'Pick 3 Rolls Lunch') {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selections:</p>
        <p>{addOn.lunchPicks.roll1},</p>
        <p>{addOn.lunchPicks.roll2}</p>
        <p>{addOn.lunchPicks.roll3}</p>
      </div>
    }
    if(addOn.porkOrVeg) {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selection:</p>
        <p>{addOn.porkOrVeg}</p>
      </div>
    }
    if(addOn.spicyOrSweet) {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selection:</p>
        <p>{addOn.spicyOrSweet}</p>
      </div>
    }
    if(addOn.spicyTunaOrCali) {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selection:</p>
        <p>{addOn.spicyTunaOrCali}</p>
      </div>
    }
    if(addOn.tunaOrSalmon) {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selection:</p>
        <p>{addOn.tunaOrSalmon}</p>
      </div>
    }
    if(addOn.salGoneWildRainbow) {
      return <div className="flex flex-row gap-2 ml-2 text-xs">
        <p>Selection:</p>
        <p>{addOn.salGoneWildRainbow}</p>
      </div>
    }
  }

  let subTotal = 0
  let addOnTotal = 0
  let extraTotal = 0
  let taxRate = 0.08875
  let taxEstimate = 0
  let onlineProcessing = 0
  let grandTotal = 0
  let grandTotalWithoutOnline = 0

  const subTotalCalc = (array) => {
    let tempSubTotal = subTotal
    if(array.length > 0) {
      array.forEach((item) => {
        
        let itemTotal = (item.product.price) * item.qty
        if(item.product.category === 'Bowl Rice') {
          return extraTotal += itemTotal
        }
        if(item.product.category === 'Drink') {
          return extraTotal += itemTotal
        }
        if(item.product.category === 'Sauce') {
          return extraTotal += itemTotal
        }
        return tempSubTotal += itemTotal
      })
    }

    return subTotal = tempSubTotal
  }

  const AddOnCalc = (array) => {
    if(array.length > 0 ) {
      let itemAddon = 0

      array.forEach((item) => {
        if(item.addOns.brownRice) {
          itemAddon += (1 * item.qty)
        }
        if(item.addOns.crunch) {
          itemAddon += (0.5 * item.qty)
        }
        if(item.addOns.eelSauce) {
          itemAddon += (0.5 * item.qty)
        }
        if(item.addOns.soyPaper) {
          itemAddon += (1 * item.qty)
        }
        if(item.addOns.spicyMayo) {
          itemAddon += (0.5 * item.qty)
        }
      })

      let addedNum = addOnTotal + itemAddon
      return addOnTotal += addedNum
    }
  }

  const taxEstimateCalc = () => {
    if(couponAmount === 0) {
      let beforeTaxRate = subTotal + addOnTotal + extraTotal
      let returnNum = beforeTaxRate * taxRate
      return taxEstimate = returnNum
    }
    if(couponAmount > 0) {
      let beforeTaxRate = (subTotal + addOnTotal + extraTotal ) - couponAmount
      let returnNum = beforeTaxRate * taxRate
      return taxEstimate = returnNum
    }
  }

  const onlineProcessingCalc = () => {
    if(couponAmount === 0) {
      let beforeRate = subTotal + addOnTotal + extraTotal + taxEstimate
      let afterRate = beforeRate * 0.03
      let final = afterRate + 0.3
      return onlineProcessing = final
    }
    if(couponAmount > 0) {
      let beforeRate = (subTotal + addOnTotal + extraTotal) - couponAmount
      let afterRate = beforeRate * 0.03
      let final = afterRate + 0.3
      return onlineProcessing = final
    }
  }

  const grandTotalCalc = () => {
    if(couponAmount === 0) {
      let final = subTotal + addOnTotal + extraTotal + taxEstimate + onlineProcessing
      return grandTotal = final
    }
    if(couponAmount > 0) {
      let final = ((subTotal + addOnTotal + extraTotal) - couponAmount) + taxEstimate + onlineProcessing
      return grandTotal = final
    }
  }

  const grandTotalWithoutOnlineCalc = () => {
    if(couponAmount === 0) {
      let final = subTotal + addOnTotal + extraTotal + taxEstimate
      return grandTotalWithoutOnline = final
    }
    if(couponAmount > 0) {
      let final = ((subTotal + addOnTotal + extraTotal) - couponAmount) + taxEstimate
      return grandTotalWithoutOnline = final
    }
  }


  subTotalCalc(cartItems)
  AddOnCalc(cartItems)
  taxEstimateCalc()
  onlineProcessingCalc()
  grandTotalCalc()
  grandTotalWithoutOnlineCalc()

  const rightSideDistributor = () => {
    if(isReadyToPay) {
      return <CheckOutSection grandTotal={grandTotal} grandTotalWithoutOnline={grandTotalWithoutOnline} addOnTotal={addOnTotal} extraTotal={extraTotal} taxRate={taxRate} subTotal={subTotal} isPayAtRestaurant={isPayAtRestaurant} setIsPayAtRestaurant={setIsPayAtRestaurant} cartItems={cartItems} couponCode={couponCode} setCouponCode={setCouponCode} couponAmount={couponAmount} setCouponAmount={setCouponAmount} />
    } else {
      return <Supplements supplements={props.supplements} />
    }
  }

  const readyToPayHandler = () => {
    dispatch(setLoadingOn())
    if(!session) {
      dispatch(setLoadingOff())
      Router.push('/account/login')
    } else {
      dispatch(setLoadingOff())
      setIsReadyToPay(!isReadyToPay)
    }
  }

  return (
    <section className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]">
      <div className="py-8 border-b border-lime-800 mb-8">
        <p className="font-bold text-2xl md:text-3xl md:text-center">{isReadyToPay ? 'Check Out' : 'Shopping Cart'}</p>
      </div>
      {/* items */}
      <div className="flex flex-col md:flex-row flex-nowrap md:mx-auto md:gap-8">
        <div className="py-2 w-full md:w-[25em]">
          {cartItems.length > 0 ?
            <div className="flex flex-col">
              {cartItems.map((item, i) => {
                return <div
                  key={item.product._id}
                  className='flex flex-row gap-4 text-sm py-4 border-b relative border-lime-800'
                >
                  {/* image */}
                  {item.product.image &&
                    <div 
                      style={{backgroundImage: `url("${item.product.image}")`}}
                      className='w-16 h-16 sm:w-20 sm:h-20 bg-center bg-cover rounded-md'
                    />
                  }
                  <div>
                  {/* description */}

                    <div>
                      <NextLink href={`/products/${item.product._id}`} className='uppercase tracking-wide font-bold hover:text-lime-600'>{item.product.name}</NextLink>
                      {item.product.name === 'Soy Sauce' ? <p className="font-normal italic text-xs">Max number of sauce will be determined at preparing.</p> : <p className="font-bold">${item.product.price.toFixed(2)}</p>}
                    </div>

                    {/* addon */}
                    {addOnDistributor(item.addOns)}
                    {selectDistributor(item.addOns, item.product.name)}
                    {item.addOns.message && <div className="flex flex-row gap-2 ml-2 text-xs">
                        <p>message:</p>
                        <p>{item.addOns.message}</p>
                      </div>
                    }
                    
                    <div className="flex items-center gap-2">
                      <p>Qty:</p>
                      <div className="flex items-center gap-1">
                        <div className='py-1 pr-3 text-lime-800 text-md font-bold'>{item.qty}</div>
                        <RdxDecreaseQtyButton item={item} />
                        <RdxQtyAddButton item={item} />
                      </div>
                    </div>
                  </div>
                  {/* close button */}
                  <div className="absolute top-4 right-2">
                    <RdxRemoveFromCartButton item={item} />
                  </div>
                </div>
              })}
            {cartItems.length > 0 &&
            <div className="w-full bg-white/40 rounded-md p-8 flex flex-col text-sm justify-between my-8">
              <div>
                <p className="text-lg py-2">Order summary</p>
                <div className="flex items-center justify-between py-3 border-b border-lime-800">
                  <p>Subtotal</p>
                  <p className="font-bold">${subTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-lime-800">
                  <p>Add-on total</p>
                  <p className="font-bold">${addOnTotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-lime-800">
                  <p>Supplements total</p>
                  <p className="font-bold">${extraTotal.toFixed(2)}</p>
                </div>
                { couponAmount !== 0 &&
                  <div className="flex items-center justify-between py-3 border-b border-lime-800">
                    <p>Coupon</p>
                    <p className="font-bold">- ${couponAmount.toFixed(2)}</p>
                  </div>
                }
                <div className="flex items-center justify-between py-3 border-b border-lime-800">
                  <p>Tax estimate</p>
                  <p className="font-bold">${taxEstimate.toFixed(2)}</p>
                </div>
                { !isPayAtRestaurant &&
                  <div className="flex items-center justify-between py-3 border-b border-lime-800">
                    <p>Online processing fee</p>
                    <p className="font-bold">${onlineProcessing.toFixed(2)}</p>
                  </div>
                }
                {!isPayAtRestaurant ?
                  <div className="flex items-center justify-between py-3">
                    <p className="text-lg">Grand total</p>
                    <p className="font-bold">${grandTotal.toFixed(2)}</p>
                  </div>
                  :
                  <div className="flex items-center justify-between py-3">
                    <p className="text-lg">Grand total</p>
                    <p className="font-bold">${grandTotalWithoutOnline.toFixed(2)}</p>
                  </div>
                }
              </div>
              <div>
                {isReadyToPay ?
                  <button
                    className='mt-4 w-full py-3 text-lime-800 rounded-md hover:text-lime-600'
                    onClick={(e) => readyToPayHandler(e)}
                  >
                    Modify Supplements
                  </button>
                :
                  <button
                    className='mt-4 w-full py-3 bg-lime-800 text-white rounded-md hover:bg-lime-600'
                    onClick={(e) => readyToPayHandler(e)}
                  >
                    Check Out
                  </button>
                }
              </div>
            </div>
          }
            </div>
          :
            <div className="py-8">
              <p>Oops! No saved items in the cart</p>
              <NextLink 
                href='/products'
                className="flex items-center px-4 py-2 bg-lime-800 max-w-sm text-white rounded-md mt-8 justify-center truncate hover:bg-lime-600"
              >
                <MdShoppingCart className="w-5 h-5 mr-2"/>Go to Shopping
              </NextLink>
            </div>
          }
        </div>
        {/* Rigt side */}
        <div className="w-full sm:mx-auto md:w-[20em] lg:mx-0 md:my-4 lg:w-[25em]">
          {/* suppliments */}
          {props.supplements && rightSideDistributor()
          }
        </div>
      </div>
    </section>
  );
}
export default Cart;

export async function getServerSideProps() {
    
  let data = null

  const request = await axios.get(`${process.env.APP_URL}/api/menu/getSupplements`)
  if(request.data.success) {
    data = request.data.data
  }
  return {props: {supplements: data}}
}
