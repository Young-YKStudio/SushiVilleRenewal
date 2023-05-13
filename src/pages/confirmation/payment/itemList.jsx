import NextLink from 'next/link'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

const ItemList = ({orderData}) => {

  const { cartItems } = useSelector((state) => state.cart)
  const [ couponAmount, setCouponAmount ] = useState(0)
  const [ isPayAtRestaurant, setIsPayAtRestaurant ] = useState(false)

  useEffect(() => {
    if(orderData) {
      if(orderData.order.isPayAtRestaurant) {
        setIsPayAtRestaurant(orderData.order.isPayAtRestaurant)
      }

      if(orderData.order.coupon) {
        setCouponAmount(orderData.order.coupon.amount)
      }
    }
  }, [orderData])

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

  subTotalCalc(cartItems)
  AddOnCalc(cartItems)
  taxEstimateCalc()
  onlineProcessingCalc()
  grandTotalCalc()

  console.log(orderData)
  return (
    <div className="py-2 w-full md:w-[25em]">
      {orderData.items.length > 0 &&
        <div className="flex flex-col">
          {orderData.items.map((item) => {
            return <div
              key={item._id}
              className='flex flex-row gap-4 text-sm py-4 border-b relative border-lime-800'
            >
              {/* image */}
              {item.product[0].image &&
                <div 
                  style={{backgroundImage: `url("${item.product[0].image}")`}}
                  className='w-12 h-12 bg-center bg-cover rounded-md'
                />
              }

              {/* description */}
              <div>
                <NextLink href={`/products/${item.product[0]._id}`} className='uppercase tracking-wide font-bold hover:text-lime-600'>{item.product[0].name}</NextLink>
                {item.product[0].name === 'Soy Sauce' ? <p className="font-normal italic text-xs">Max number of sauce will be determined at preparing.</p> : <p className="font-bold">${item.product[0].price.toFixed(2)}</p>}
              </div>
              {/* addon */}
              {addOnDistributor(item.addOns)}
              {selectDistributor(item.addOns, item.product[0].name)}
              {item.addOns.message && <div className="flex flex-row gap-2 ml-2 text-xs">
                  <p>message:</p>
                  <p>{item.addOns.message}</p>
                </div>
              }

            </div>
          })}
        </div>
      }

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
            {/* {isReadyToPay ?
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
            } */}
          </div>
        </div>
      }
    </div>
  );
}
export default ItemList;