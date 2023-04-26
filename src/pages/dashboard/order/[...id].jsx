import axios from 'axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { MdOutlineAdd } from 'react-icons/md'
import { useState, useEffect } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardOrderView = (props) => {
  console.log(props, 'at order id page')

  const [ orderStatus, setOrderStatus ] = useState(null)
  const [ paymentType, setPaymentType ] = useState(null)
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)

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

  // const orderTypeSetterText = (isConfirmed, isFinished, isPlaced, isReady) => {
  //   if(!isConfirmed && !isFinished && isPlaced && !isReady ) {
  //     return 'New Order'
  //   }
  //   if(isPlaced && isConfirmed && !isFinished && !isReady) {
  //     return 'Confirmed Order'
  //   }
  //   if(isPlaced && isConfirmed && isReady && !isFinished) {
  //     return 'Order is ready'
  //   }
  //   if(isPlaced && isConfirmed && isReady && isFinished) {
  //     return 'Fulfilled Order'
  //   }
  // }

  const cardStyle = (status) => {
    if(status === 'Scheduled order') {
      return 'bg-red-800 rounded-md mt-8 p-8 text-white'
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
          <p className='font-bold'>{paymentType}</p>
        </div>
        <div className='flex flex-row justify-between py-4'>
          <p>Order Number: <span className='font-bold tracking-wider'>{props.order.orderCount}</span></p>
          <p className='font-bold'>{orderStatus}</p>
        </div>
        <div className='text-sm'>
          <div>
            <p>{props.order.customer.username}</p>
          </div>
          <div className='flex flex-row truncate gap-4'>
            <p>{props.order.customer.email}</p>
            <p>{props.order.customer.contact}</p>
          </div>
          <p>customer ordered: {props.order.customer.Orders.length}</p>
        </div>
        <div>
          <p>Order Total: ${props.order.grandTotal.toFixed(2)}</p>
        </div>
        {/* order details */}
        <div>

        </div>
      </div>
    </section>
    // Back to list link
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
  if(data) {
    return {props: {id: id, order: data, items: data2 }}
  }
}