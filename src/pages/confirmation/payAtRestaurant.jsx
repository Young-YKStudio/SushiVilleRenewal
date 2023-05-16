import axios from 'axios'
import NextLink from 'next/link'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice'
import { toast } from 'react-toastify'

const PayAtRestaurantSection = ({orderData}) => {

  console.log(orderData)

  let subtotal = orderData && orderData.order.orderTotal
  let addOnTotal = orderData && orderData.order.addOnTotal
  let taxRate = orderData && orderData.order.taxRate
  let extraTotal = orderData && orderData.order.supplementTotal
  let coupon = orderData.order.coupon ? orderData.order.coupon.amount : 0
  let taxEstimate = (subtotal + addOnTotal + extraTotal - coupon) * taxRate
  let grandTotal = (((subtotal + addOnTotal + extraTotal) - coupon) + (((subtotal + addOnTotal + extraTotal) - coupon) * taxRate))

  const dispatch = useDispatch()

  const confirmButtonHandler = () => {
    let sendingData ={
      id: orderData && orderData.order._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/order/payAtResPlace', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          Router.push(`/order/success/${request.data.order._id}`)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when processing your request. Please try again.')
      }
    }
    requestToAPI()
  }

  const goBackButtonHandler = () => {
    Router.push('/cart')
  }

  return (
    <section
      className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]"
    >
      <div className="py-8 border-b border-lime-800">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Order Confirmation</p>
      </div>

      <div className='mx-auto w-full max-w-3xl'>
        <div className='max-w-3xl my-16'>
          <p className='text-3xl mb-2'>Thank you for placing your order.</p>
          <p className='flex items-center text-lg'>Please confirm your order before we start cooking!</p>
        </div>

        {/* Paper */}
        <div className="bg-white/70 rounded-md shadow-md p-8 max-w-3xl">
          {/* Order Information - TOP */}
          <div>
            <div className="flex items-center justify-between text-normal mb-2">
              <p>Order Number: <span className="font-bold ml-2">{orderData && orderData.order.orderCount}</span></p>
              <p className="text-red-700">Pay at pickup</p>
            </div>
            <div className="flex flex-row flex-wrap items-center text-sm gap-2 border-b border-lime-800 pb-3 mb-4">
              <p className=''>{orderData && orderData.order.customer.username}</p>
              <p className="truncate">{orderData && orderData.order.customer.email}</p>
              <p>{orderData && orderData.order.customer.contact}</p>
            </div>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between'>
            {/* ordered items - LEFT */}
            <div className='text-sm md:w-1/2 pt-4'>
              {orderData && orderData.items.map((item, index) => {
                return <div
                  key={index}
                  className='pb-4'
                >
                  <div
                    className='flex flex-row items-center gap-4'
                  >
                    <NextLink 
                      href={`/products/${item.product[0]._id}`}
                      className='hover:text-lime-600 font-bold'
                    >
                      {item.product[0].name}
                    </NextLink>
                    <p>x {item.qty} </p>
                    <p className='font-bold'>
                      ${item.product[0].price}
                    </p>
                  </div>
                  {/* options */}
                  {/* BrownRice */}
                  {item.addOns.brownRice && 
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Brown Rice:</p>
                      <p>$ 1.00</p>
                    </div>
                  }
                  {/* Crunch */}
                  {item.addOns.crunch && 
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Crunch:</p>
                      <p>$ 0.50</p>
                    </div>
                  }
                  {/* eelSauce */}
                  {item.addOns.eelSauce && 
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Eel Sauce:</p>
                      <p>$ 0.50</p>
                    </div>
                  }
                  {/* SoyPaper */}
                  {item.addOns.soyPaper && 
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Soy Paper:</p>
                      <p>$ 1.00</p>
                    </div>
                  }
                  {/* spicymayo */}
                  {item.addOns.spicyMayo && 
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Spicy Mayo:</p>
                      <p>$ 0.50</p>
                    </div>
                  }

                  {/* lunch Options */}
                  {item.product[0].name === 'Pick 2 Rolls Lunch' && 
                    <div>
                      <div>
                        <p className='flex flex-row text-xs gap-2 ml-2'>Roll1:</p>
                        <p>{item.addOns.lunchPicks.roll1}</p>
                      </div>
                      <div className='flex flex-row text-xs gap-2 ml-2'>
                        <p>Roll2:</p>
                        <p>{item.addOns.lunchPicks.roll2}</p>
                      </div>
                    </div>
                  }
                  {item.product[0].name === 'Pick 3 Rolls Lunch' && 
                    <div>
                      <div className='flex flex-row text-xs gap-2 ml-2'>
                        <p>Roll1:</p>
                        <p>{item.addOns.lunchPicks.roll1}</p>
                      </div>
                      <div className='flex flex-row text-xs gap-2 ml-2'>
                        <p>Roll2:</p>
                        <p>{item.addOns.lunchPicks.roll2}</p>
                      </div>
                      <div className='flex flex-row text-xs gap-2 ml-2'>
                        <p>Roll3:</p>
                        <p>{item.addOns.lunchPicks.roll3}</p>
                      </div>
                    </div>
                  }

                  {/* message */}
                  {item.addOns.message &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Special Instructions:</p>
                      <p>{item.addOns.message}</p>
                    </div>
                  }

                  {/* porkOrVeg */}
                  {item.addOns.porkOrVeg &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Selection:</p>
                      <p>{item.addOns.porkOrVeg}</p>
                    </div>
                  }

                  {/* TODO: check below */}
                  {/* salgonewildRain */}
                  {item.addOns.salGoneWildRainbow &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Selection:</p>
                      <p>{item.addOns.salGoneWildRainbow}</p>
                    </div>
                  }

                  {/* spicysweet */}
                  {item.addOns.spicyOrSweet &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Selection:</p>
                      <p>{item.addOns.spicyOrSweet}</p>
                    </div>
                  }

                  {/* sptunaCali */}
                  {item.addOns.spicyTunaOrCali &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Selection:</p>
                      <p>{item.addOns.spicyTunaOrCali}</p>
                    </div>
                  }

                  {/* tunaSal */}
                  {item.addOns.tunaOrSalmon &&
                    <div className='flex flex-row text-xs gap-2 ml-2'>
                      <p>Selection:</p>
                      <p>{item.addOns.tunaOrSalmon}</p>
                    </div>
                  }
                </div>
              })}
            </div>
            {/* Price Calculation Right */}
            <div className='flex flex-col gap-4 pt-4 md:w-1/2 mb-4'>
              <p className='font-bold'>Order Summary</p>
              <div className='flex items-center justify-between border-y border-lime-800 py-4 text-sm'>
                <p>Subtotal</p>
                <p className='font-bold'>${subtotal.toFixed(2)}</p>
              </div>
              <div className='flex items-center justify-between border-b border-lime-800 pb-4 text-sm'>
                <p>Add-on total</p>
                <p className='font-bold'>${addOnTotal.toFixed(2)}</p>
              </div>
              <div className='flex items-center justify-between border-b border-lime-800 pb-4 text-sm'>
                <p>Supplements total</p>
                <p className='font-bold'>${extraTotal.toFixed(2)}</p>
              </div>
              {
                orderData.order.coupon &&
                <div className='flex items-center justify-between border-b border-lime-800 pb-4 text-sm'>
                  <p>Coupon</p>
                  <p className='font-bold'>- ${coupon.toFixed(2)}</p>
                </div>

              }
              <div className='flex items-center justify-between border-b border-lime-800 pb-4 text-sm'>
                <p>Tax estimate</p>
                <p className='font-bold'>${taxEstimate.toFixed(2)}</p>
              </div>
              <div className='flex items-center justify-between border-b border-lime-800 pb-4'>
                <p className='font-bold'>Grand total</p>
                <p className='font-bold'>${grandTotal.toFixed(2)}</p>
              </div>
            </div>

          </div>
        </div>
        {/* Confirmation Buttons with confirm and go back */}
        <div className='flex flex-row justify-start mt-8'>
          <button className='px-4 py-2 bg-lime-800 text-white hover:bg-lime-600 rounded-md md:px-8 mr-8'
            onClick={confirmButtonHandler}
          >
            Confirm Order
          </button>
          <button className='px-4 py-2 hover:text-lime-600 md:px-8' onClick={goBackButtonHandler}>Go back</button>
        </div>
      </div>
    </section>
  );
}
export default PayAtRestaurantSection;