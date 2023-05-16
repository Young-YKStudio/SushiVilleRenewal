import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { useState, useEffect } from 'react'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';
import { toast } from 'react-toastify'

const DashboardOrderView = (props) => {

  const [ orderStatus, setOrderStatus ] = useState(null)
  const [ paymentType, setPaymentType ] = useState(null)
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true
    const orderStatusSetter = () => {
      if(isMounted && !props.order.isConfirmed && !props.order.isFinished && props.order.isPlaced && !props.order.isReady) {
        setOrderStatus('New Order')
      }
      if(isMounted && !props.order.isConfirmed && !props.order.isFinished && !props.order.isPlaced && !props.order.isReady) {
        setOrderStatus('Pending Order')
      }
      if(isMounted && props.order.isConfirmed && !props.order.isFinished && props.order.isPlaced && props.order.isReady) {
        setOrderStatus('Order Ready')
      }
      if(isMounted && props.order.isConfirmed && !props.order.isFinished && props.order.isPlaced && !props.order.isReady) {
        setOrderStatus('Confirmed Order')
      }
      if(isMounted && props.order.isConfirmed && props.order.isFinished && props.order.isPlaced && props.order.isReady) {
        setOrderStatus('Fulfilled Order')
      }
    }

    const paymentTypeSetter = () => {
      if(isMounted && !!props.order.isScheduled) {
        setPaymentType('Scheduled order')
      }
      if(isMounted && props.order.isPaidAtRestaurant) {
        setPaymentType('Pay at pickup')
      }
      if(isMounted && !props.order.isPaidAtRestaurant && !props.order.isScheduled ) {
        setPaymentType('Online payment')
      }
    }

    orderStatusSetter()
    paymentTypeSetter()

    return () => {
      isMounted = false
    }
  },[props])

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[75vw] md:max-w-[80%] lg:max-w-[86%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[80%] lg:max-w-[90%] w-full'
    }
  }

  const deleteOrderHandler = () => {
    let submitData = {
      orderId: props.order._id,
      userId: props.order.customer._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/order/deleteOrder', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Order has been deleted')
          setTimeout(() => {
            Router.push('/dashboard/orderHistory')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when deleting order. Please contact support or try again.')
      }
    }

    requestToAPI()
  }

  const confirmOrderHandler = () => {
    let submitData = {
      orderId: props.order._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/order/confirmOrder', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Order has been Confirmed')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when confirming the order. Pleast contact support or try again.')
      }
    }

    requestToAPI()
  }

  const readyOrderHandler = async () => {
    let submitData = {
      orderId: props.order._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/order/readyOrder', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Order has been set to Ready.')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the order. Pleast contact support or try again.')
      }
    }

    requestToAPI()
  }

  const finishOrderHandler = async () => {
    let submitData = {
      orderId: props.order._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/order/finishOrder', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Order has been set to fulfilled.')
          setTimeout(() => {
            Router.reload()
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the order. Pleast contact support or try again.')
      }
    }

    requestToAPI()
  }

  const revertOrderHandler = async () => {
    let submitData = {
      orderId: props.order._id
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/order/revertOrder', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Order has been reverted to confirmed.')
          setTimeout(() => {
            Router.reload()
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the order. Pleast contact support or try again.')
      }
    }

    requestToAPI()
  }

  const buttonDistributor = (status) => {
    if(status === 'New Order') {
      if(paymentType === 'Scheduled order') {
        return <button 
            className='w-full bg-white py-2 rounded-lg text-red-800 hover:bg-white/80'
            onClick={confirmOrderHandler}
          >
            Confirm Order
          </button>
      }
      if(paymentType === 'Pay at pickup') {
        return <button onClick={confirmOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Confirm Order</button>
      }
      if(paymentType === 'Online payment') {
        return <button onClick={confirmOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Confirm Order</button>
      }
    }
    if(status === 'Pending Order') {
      return null
    }
    if(status === 'Order Ready') {
      if(paymentType === 'Scheduled order') {
        return <button onClick={finishOrderHandler} className='w-full bg-white py-2 rounded-lg text-red-800 hover:bg-white/80'>Finish Order</button>
      }
      if(paymentType === 'Pay at pickup') {
        return <button onClick={finishOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Finish Order</button>
      }
      if(paymentType === 'Online payment') {
        return <button onClick={finishOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Finish Order</button>
      }
    }
    if(status === 'Confirmed Order') {
      if(paymentType === 'Scheduled order') {
        return <button onClick={readyOrderHandler} className='w-full bg-white py-2 rounded-lg text-red-800 hover:bg-white/80'>Order is Ready</button>
      }
      if(paymentType === 'Pay at pickup') {
        return <button onClick={readyOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Order is Ready</button>
      }
      if(paymentType === 'Online payment') {
        return <button onClick={readyOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Order is Ready</button>
      }
    }
    if(status === 'Fulfilled Order') {
      if(paymentType === 'Scheduled order') {
        return <button onClick={revertOrderHandler} className='w-full bg-white py-2 rounded-lg text-red-800 hover:bg-white/80'>Revert to Confirm</button>
      }
      if(paymentType === 'Pay at pickup') {
        return <button onClick={revertOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Revert to Confirm</button>
      }
      if(paymentType === 'Online payment') {
        return <button onClick={revertOrderHandler} className='w-full bg-white py-2 rounded-lg text-lime-800 hover:bg-white/80'>Revert to Confirm</button>
      }
    }
  }

  const cardStyle = (status) => {
    if(status === 'Scheduled order') {
      return 'bg-red-800 rounded-md mt-8 p-8 text-white max-w-[860px] mx-auto'
    }
    if(status === 'Pay at pickup') {
      return 'bg-yellow-500 rounded-md mt-8 p-8 text-lime-800 max-w-[860px] mx-auto'
    }
    if(status === 'Online payment') {
      return 'bg-lime-800 rounded-md mt-8 p-8 text-white max-w-[860px] mx-auto'
    }
  }

  return (  
    <section
      className={styleDistributor(isVerticalMenuNarrow)}
    >
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Manage Order</h1>
      </div>

      <div className={cardStyle(paymentType)}>
        {/* Order info and customer info */}
        <div className='flex flex-row justify-center mb-4'>
          <p className='font-bold text-lg tracking-wider uppercase'>{paymentType}</p>
        </div>
        <div className='flex flex-row justify-between py-4 items-center'>
          <p className='text-xs'>Order Number: <span className='text-lg font-bold tracking-wider ml-2'>{props.order.orderCount}</span></p>
          <p className='font-bold px-4 py-1 border-2 border-white rounded-full tracking-wider text-white'>{orderStatus}</p>
        </div>
        <div className='text-xl font-bold py-4'>
          <p>Customer Information</p>
        </div>
        <div className='text-sm border-y border-white py-6 flex flex-col gap-1'>
          <div className='flex flex-row flex-nowrap justify-between'>
            <p className='text-xl tracking-wide truncate'>{props.order.customer.username}</p>
            <p className='mb-1'>Total Orders: <span className='font-bold text-lg'>{props.order.customer.Orders.length}</span></p>
          </div>
          <div className='flex flex-row truncate gap-4'>
            <p>{props.order.customer.email}</p>
            <p>{props.order.customer.contact}</p>
          </div>
        </div>
        <div className='flex flex-row justify-end mt-4'>
          <p className='text-sm'>Order Total: <span className='font-bold text-xl tracking-wider'>${props.order.grandTotal.toFixed(2)}</span></p>
        </div>
        {/* order details */}
        <div className='mt-4'>
          <div className='text-xl font-bold'>
            <p>Order Summary</p>
          </div>
          <div>
            {props.items.map((item, i) => {
              return <div
                key={i}
                className={ i === 0 ? 'mt-4 p-4 border-y border-white' : 'p-4 border-b border-white'}
              >
                <div className='flex flex-row justify-between'>
                  <div className='flex flex-row gap-2 items-center'>
                    <p className='font-bold'>{item.product[0].name}</p>
                    <p>x {item.qty}</p>
                  </div>
                  <div className='tracking-wider'>
                    <p className='font-bold'>${item.product[0].price.toFixed(2)}</p>
                  </div>
                </div>
                <div>
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
              </div>
            })}
          </div>
          {props.order.coupon &&
            <div className='flex flex-row justify-end gap-4 text-xs p-4'>
              <p>Coupon Used:</p>
              <div className='flex flex-row gap-2 items-center'>
                <p className='text-xs'>{props.order.coupon.couponCode}</p>
                <p className='text-xs font-bold'>- ${props.order.coupon.amount.toFixed(2)}</p>
              </div>
            </div>
          }
          <div className='grid md:grid-cols-2 gap-2 text-lg font-bold py-8'>
            {/* Buttons */}
            {buttonDistributor(orderStatus)}
            <button 
              className={orderStatus === 'Pending Order' ? 'w-full text-center hover:text-white/70 col-span-2' : 'w-full text-center hover:text-white/70'}
              onClick={deleteOrderHandler}
            >
              delete order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
export default DashboardOrderView

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null
  let data2 = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/order/getOneOrder`, requestData)
  if(request.data.success) {
    data = request.data.order
    data2 = request.data.items
  }
  return {props: {id: id, order: data, items: data2 }}
}