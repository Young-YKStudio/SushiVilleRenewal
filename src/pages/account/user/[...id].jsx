import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import { MdRefresh, MdDelete } from 'react-icons/md'
import Router from 'next/router'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice'
import { toast } from 'react-toastify'

const UserInformation = (props) => {

  const [ currentSection, setCurrentSection ] = useState('Orders')
  const [ submitForm, setSubmitForm ] = useState({
    username: '',
    email: '',
    address: '',
  })
  const [ contact, setContact ] = useState('')
  const [ currentOrder, setCurrentOrder ] = useState([])
  const [ pastOrder, setPastOrder ] = useState([])
  const [ currentReservation, setCurrentReservation ] = useState([])
  const [ pastReservation, setPastReservation ] = useState([])
  const dispatch = useDispatch()

  const { username, email, address } = submitForm

  const submitChangeHandler = (e) => {
    setSubmitForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  function formatPhoneNumber(telNum) {
    if (!telNum) return telNum;
  
    const telPhoneNum = telNum.replace(/[^\d]/g, "");
    const phoneNumberLength = telPhoneNum.length;
    if (phoneNumberLength < 4) return telPhoneNum;
    if (phoneNumberLength < 7) {
      return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(3)}`;
    }
    return `(${telPhoneNum.slice(0, 3)}) ${telPhoneNum.slice(
      3,
      6
    )}-${telPhoneNum.slice(6, 10)}`;
  }

  const contactChangeHandler = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value)
    setContact(formattedPhoneNumber)
  }

  useEffect(() => {
    let isMounted = true

    const setStates = async () => {
      if(isMounted && props) {
        // submitform
        await setSubmitForm({
          username: props.user.username,
          email: props.user.email,
          address: props.user.address ? props.user.address : ''
        })
        // contact
        await setContact(props.user.contact ? props.user.contact: '')
        // orders
        if(props.user.Orders.length > 0) {
          let orders = props.user.Orders
          let CurrentOrders = []
          let PastOrders = []
          await orders.forEach((order) => {
            //neworder
            if(order.isPlaced && !order.isFinished) {
              CurrentOrders.push(order)
            }
            if(order.isPlaced && order.isFinished) {
              PastOrders.push(order)
            }
          })
          await setCurrentOrder(CurrentOrders)
          await setPastOrder(PastOrders)
        }
        // reservations
        if(props.user.Reservations.length > 0) {
          let reservations = props.user.Reservations
          let CurrentReservations = []
          let PastReservations = []
          await reservations.forEach((reservation) => {
            // new
            if(!reservation.isDenied && !reservation.isShowedUp) {
              CurrentReservations.push(reservation)
            }
            if(reservation.isDenied || reservation.isShowedUp) {
              PastReservations.push(reservation)
            }
          })
          await setCurrentReservation(CurrentReservations)
          await setPastReservation(PastReservations)
        }
      }
    }

    const setCoupons = 
    setStates()
    return () => {
      isMounted = false
    }

  }, [props])

  const orderStatusDistributor = (isPlaced, isConfirmed, isReady, isFinished) => {
    if(isPlaced && !isConfirmed && !isReady && !isFinished) {
      return <p className='font-bold text-red-700'>New</p>
    }
    if(isPlaced && isConfirmed && !isReady && !isFinished) {
      return <p className='font-bold text-blue-700'>Cooking...</p>
    }
    if(isPlaced && isConfirmed && isReady && !isFinished) {
      return <p  className='font-bold text-lime-800'>Ready</p>
    }
    if(isFinished) {
      return <p className='font-bold'>Fulfilled</p>
    }
  }

  const reservationStatusDistributor = (isConfirmed, isDenied, isShowedUp) => {
    if(isConfirmed && !isDenied && !isShowedUp) {
      return <p className='font-bold text-lime-800'>Confirmed</p>
    }
    if(!isConfirmed && !isDenied && !isShowedUp) {
      return <p className='font-bold text-red-700'>New</p>
    }
    if(isDenied) {
      return <p className='font-bold text-slate-400'>Denied</p>
    }
    if(isShowedUp) {
      return <p className='font-bold'>Fulfilled</p>
    }
  }

  const couponStatusDistributor = (isActive, isPromo, isUsed) => {
    if(!isPromo && isActive && !isUsed) {
      return <p className='font-bold text-lime-800'>Active</p>
    }
    if(!isPromo && !isActive && !isUsed) {
      return <p className='font-bold text-slate-800'>Canceled</p>
    }
    if(!isPromo && !isActive && isUsed) {
      return <p className='font-bold text-red-700'>Used</p>
    }
    if(isPromo) {
      return <p className='font-bold text-red-700'>Used</p>
    }
  }

  const updateInfoHandler = (e) => {
    e.preventDefault()

    let addressValidate = () => {
      if(props.user.address == undefined && address !== '') {
        return true
      }
      if(props.user.address !== undefined && props.user.address !== address) {
        return true
      }
      return false
    }

    if(username !== props.user.username || email !== props.user.email || address !== '' || contact !== props.user.contact ) {
      if(addressValidate) {
        let submitData = {
          id: props.id, 
          username: username,
          email: email,
          address: address,
          contact: contact
        }
    
        const requestToAPI = async () => {
          try {
            dispatch(setLoadingOn())
            let request = await axios.put('/api/account/customerUpdateAccount', submitData)
            if(request.data.success) {
              dispatch(setLoadingOff())
              toast.success('Updated your information')
              setTimeout(() => {
                Router.reload()
              }, 500)
            }
          } catch (error) {
            dispatch(setLoadingOff())
            toast.error('Error found when trying to update. Please contact support or try again later.')
          }
        }
        return requestToAPI()
      } else {
        return
      }
    } else {
      return
    }
  }

  const resetPasswordHandler = () => {
    Router.push('/account/forgotpassword')
  }

  const favoriteRemovehandler = (e, menuId) => {
    
    let submitData = {
      menuId: menuId,
      userId: props.id
    }

    const requestToAPI =  async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/account/removeFavorite', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Selected favorite item has been removed.')
          setTimeout(() => {
            Router.reload()
          }, 500)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when removing favorite. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  return (
    <section className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]">
      <div className="py-8 border-b border-lime-800 mb-4">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Account - {currentSection}</p>
      </div>

      <div className='mx-auto'>

        <div className='rounded-lg w-full sm:w-[40em] max-w-[40em] flex flex-row flex-wrap sm:flex-nowrap justify-start sm:justify-evenly sm:gap-2 mb-8 text-xs sm:text-base'>
          <button onClick={() => setCurrentSection('Orders')} className={currentSection === 'Orders' ? 'px-4 py-1 bg-lime-800 rounded-md text-white' : 'px-4 py-1 hover:bg-lime-800 rounded-md hover:text-white' }>Orders</button>
          <button onClick={() => setCurrentSection('Reservations')}  className={currentSection === 'Reservations' ? 'px-4 py-1 bg-lime-800 rounded-md text-white' : 'px-4 py-1 hover:bg-lime-800 rounded-md hover:text-white' }>Reservations</button>
          <button onClick={() => setCurrentSection('Favorites')}  className={currentSection === 'Favorites' ? 'px-4 py-1 bg-lime-800 rounded-md text-white' : 'px-4 py-1 hover:bg-lime-800 rounded-md hover:text-white' }>Favorites</button>
          <button onClick={() => setCurrentSection('Coupons')}  className={currentSection === 'Coupons' ? 'px-4 py-1 bg-lime-800 rounded-md text-white' : 'px-4 py-1 hover:bg-lime-800 rounded-md hover:text-white' }>Coupons</button>
          <button onClick={() => setCurrentSection('Settings')}  className={currentSection === 'Settings' ? 'px-4 py-1 bg-lime-800 rounded-md text-white' : 'px-4 py-1 hover:bg-lime-800 rounded-md hover:text-white' }>Settings</button>
        </div>

        { currentSection === 'Orders' && <div>
            <div className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col gap-2 mb-8'>
              {/* New order */}
              {currentOrder.length > 0 ? <div
              >
                <div className='flex justify-between items-center pb-2'>
                  <p className='font-bold'>Orders</p>
                  <button onClick={() => Router.reload()} className='flex gap-1 items-center px-4 py-2 hover:bg-yellow-500 text-lime-800 text-sm rounded-md'><MdRefresh className='w-5 h-5'/>Refresh</button>
                </div>
                <div
                  className='grid grid-cols-3 sm:grid-cols-5 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md'
                >
                  <p>Status</p>
                  <p className='hidden sm:flex'>Number</p>
                  <p>Total</p>
                  <p className='hidden sm:flex'>Ordered</p>
                  <p>Placed</p>
                </div>
                {currentOrder.map((order, index) => {
                  return <div
                    key={order._id}
                    className={index !== currentOrder.length -1 ? 'bg-white/80 px-4 py-2 text-sm grid grid-cols-3 sm:grid-cols-5' : 'bg-white/80 px-4 py-2 text-sm rounded-b-md grid grid-cols-3 sm:grid-cols-5'}
                  >
                    {/* order status */}
                    {orderStatusDistributor(order.isPlaced, order.isConfirmed, order.isReady, order.isFinished)}
                    {/* order number */}
                    <p className='hidden sm:block'>{order.orderCount}</p>
                    {/* order grandTotal */}
                    <p className='font-bold'>${order.grandTotal.toFixed(2)}</p>
                    {/* ordered items */}
                    <p className='hidden sm:flex sm:flex-row'>{order.orderedItems.length} items</p>
                    {/* order createdAt */}
                    <p className='text-xs flex items-center truncate'>{moment(order.createdAt).tz('America/New_York').format('MM/DD LT')}</p>
                  </div>
                })} 

              </div>
              :
              <div className='flex justify-center'>
                <p className='text-xs'>No orders yet.</p>
              </div>
              }
            </div>

            <div className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col gap-2 mb-8'>
              {/* New order */}
              {pastOrder.length > 0 ? <div
              >
                <div className='flex justify-between items-center pb-2'>
                  <p className='font-bold'>Past Orders</p>
                </div>
                <div
                  className='grid grid-cols-3 sm:grid-cols-5 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md'
                >
                  <p>Status</p>
                  <p className='hidden sm:flex'>Number</p>
                  <p>Total</p>
                  <p className='hidden sm:flex'>Ordered</p>
                  <p>Placed</p>
                </div>
                {pastOrder.map((order, index) => {
                  return <div
                    key={order._id}
                    className={index !== pastOrder.length -1 ? 'bg-white/80 px-4 py-2 text-sm grid grid-cols-3 sm:grid-cols-5' : 'bg-white/80 px-4 py-2 text-sm rounded-b-md grid grid-cols-3 sm:grid-cols-5'}
                  >
                    {/* order status */}
                    {orderStatusDistributor(order.isPlaced, order.isConfirmed, order.isReady, order.isFinished)}
                    {/* order number */}
                    <p className='hidden sm:block'>{order.orderCount}</p>
                    {/* order grandTotal */}
                    <p className='font-bold'>${order.grandTotal.toFixed(2)}</p>
                    {/* ordered items */}
                    <p className='hidden sm:flex sm:flex-row'>{order.orderedItems.length} items</p>
                    {/* order createdAt */}
                    <p className='text-xs flex items-center truncate'>{moment(order.createdAt).tz('America/New_York').format('MM/DD LT')}</p>
                  </div>
                })} 

              </div>
              :
              <div className='flex flex-col'>
                <div className='flex justify-between items-center pb-2'>
                  <p className='font-bold'>Past Orders</p>
                </div>
                <p className='text-xs'>No past orders yet.</p>
              </div>
              }
            </div>

          </div>
        }

        { currentSection === 'Reservations' && <div>
            <div className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col gap-2 mb-8'>
              {currentReservation.length > 0 ? <div
                >
                  <div className='flex justify-between items-center pb-2'>
                    <p className='font-bold'>Reservations</p>
                    <button onClick={() => Router.reload()} className='flex gap-1 items-center px-4 py-2 hover:bg-yellow-500 text-lime-800 text-sm rounded-md'><MdRefresh className='w-5 h-5'/>Refresh</button>
                  </div>
                  <div
                    className='grid grid-cols-2 sm:grid-cols-5 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md gap-2'
                  >
                    <p>Status</p>
                    <p className='hidden sm:flex'>Reserve Name</p>
                    <p>Reserve Date</p>
                    <p className='hidden sm:flex'>Party</p>
                    <p className='hidden sm:flex'>Placed</p>
                  </div>
                  {currentReservation.map((reservation, index) => {
                    return <div
                      key={reservation._id}
                      className={index !== currentReservation.length -1 ? 'bg-white/80 px-4 py-2 text-sm grid grid-cols-2 sm:grid-cols-5 gap-2' : 'bg-white/80 px-4 py-2 text-sm rounded-b-md grid grid-cols-2 sm:grid-cols-5 gap-2'}
                    >
                      {couponStatusDistributor(reservation.isConfirmed, reservation.isDenied, reservation.isShowedUp)}
                      <p className='hidden text-xs truncate sm:flex sm:items-center'>{reservation.name}</p>
                      <p className='text-xs flex items-center'>{moment(reservation.reserveDate).tz('America/New_York').format('MM/DD LT')}</p>
                      <p className='hidden sm:flex'>{reservation.totalParty} ppl</p>
                      <p className='hidden text-xs sm:flex sm:items-center'>{moment(reservation.createdAt).tz('America/New_York').format('MM/DD LT')}</p>
                    </div>
                  })} 

                </div>
                :
                <div className='flex justify-center'>
                  <p className='text-xs'>No reservations yet.</p>
                </div>
              }
            </div>

            <div className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col gap-2 mb-8'>
              {pastReservation.length > 0 ? <div
                >
                <div className='flex justify-between items-center pb-2'>
                  <p className='font-bold'>Past Reservations</p>
                </div>
                <div
                  className='grid grid-cols-2 sm:grid-cols-5 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md gap-2'
                >
                  <p>Status</p>
                  <p className='hidden sm:flex'>Reserve Name</p>
                  <p>Reserve Date</p>
                  <p className='hidden sm:flex'>Party</p>
                  <p className='hidden sm:flex'>Placed</p>
                </div>
                {pastReservation.map((reservation, index) => {
                  return <div
                    key={reservation._id}
                    className={index !== pastReservation.length -1 ? 'bg-white/80 px-4 py-2 text-sm grid grid-cols-2 sm:grid-cols-5 gap-2' : 'bg-white/80 px-4 py-2 text-sm rounded-b-md grid grid-cols-2 sm:grid-cols-5 gap-2'}
                  >
                    {reservationStatusDistributor(reservation.isConfirmed, reservation.isDenied, reservation.isShowedUp)}
                    <p className='hidden text-xs truncate sm:flex sm:items-center'>{reservation.name}</p>
                    <p className='text-xs flex items-center'>{moment(reservation.reserveDate).tz('America/New_York').format('MM/DD LT')}</p>
                    <p className='hidden sm:flex'>{reservation.totalParty} ppl</p>
                    <p className='hidden text-xs sm:flex sm:items-center'>{moment(reservation.createdAt).tz('America/New_York').format('MM/DD LT')}</p>
                  </div>
                })} 

              </div>
              :
              <div className='flex flex-col'>
                <div className='flex justify-between items-center pb-2'>
                  <p className='font-bold'>Past Reservations</p>
                </div>
                <p className='text-xs'>No past reservations yet.</p>
              </div>
              }
            </div>
          </div>
        }

        { currentSection === 'Favorites' && <div
          className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col'
        >
            <div className='flex pb-4'>
              <p className='font-bold'>Favorite Items</p>
            </div>
            {props.user.FavoriteItems.length > 0 ? <div>
              <div className='grid grid-cols-2 sm:grid-cols-3 sm:gap-4 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md'>
                <p>Item</p>
                <p className='hidden md:flex sm:pl-4'>Category</p>
                <p className='hidden'>button</p>
              </div>
              {props.user.FavoriteItems.map((item, index) => {
                return <div
                  className={index !== props.user.FavoriteItems.length -1 ? 'text-sm flex flex-row sm:grid sm:grid-cols-3 sm:gap-4 flex-nowrap justify-between bg-white/80 px-4 py-4 ' : 'text-sm flex flex-row sm:grid sm:grid-cols-3 sm:gap-4  flex-nowrap justify-between bg-white/80 px-4 py-4  rounded-b-md'}
                  key={item._id}
                >
                  <p className='font-bold'>{item.name}</p>
                  <p className='hidden sm:flex sm:pl-4'>{item.category}</p>
                  <button onClick={(e) => favoriteRemovehandler(e, item._id)} className='flex flex-row justify-end gap-1 items-center text-xs hover:text-yellow-500'><MdDelete className='w-5 h-5'/>Remove</button>
                </div>
              })}
            </div>
            :
            <div className='flex flex-col'>
              <p className='text-xs'>No favorite items yet.</p>
            </div>
            }
          </div>
        }

        { currentSection === 'Coupons' && <div>
            <div className='bg-white/40 rounded-lg p-8 max-w-[40em] flex flex-col gap-2 mb-8'>
              {props.user.Coupons.length > 0 ? <div
                >
                  <div className='flex justify-between items-center pb-2'>
                    <p className='font-bold'>Coupons</p>
                  </div>
                  <div
                    className='grid grid-cols-3 sm:grid-cols-4 text-xs bg-white px-4 py-2 border-b border-lime-800 rounded-t-md gap-2'
                  >
                    <p>Status</p>
                    <p>Coupon Code</p>
                    <p>Amount</p>
                    <p className='hidden sm:flex'>Created</p>
                  </div>
                  {props.user.Coupons.map((coupon, index) => {
                    return <div
                      key={coupon._id}
                      className={index !== props.user.Coupons.length -1 ? 'bg-white/80 px-4 py-2 text-sm grid grid-cols-3 sm:grid-cols-4 gap-2' : 'bg-white/80 px-4 py-2 text-sm rounded-b-md grid grid-cols-3 sm:grid-cols-4 gap-2'}
                    >
                      {couponStatusDistributor(coupon.isActive, coupon.isPromo, coupon.isUsed)}
                      <p className='text-xs truncate flex items-center'>{coupon.couponCode}</p>
                      <p className='text-xs flex items-center'>${coupon.amount.toFixed(2)}</p>
                      <p className='text-xs hidden sm:flex items-center'>{moment(coupon.createdAt).tz('America/New_York').format('MM/DD LT')}</p>
                    </div>
                  })} 

                </div>
                :
                <div className='flex justify-center'>
                  <p className='text-xs'>No coupons yet.</p>
                </div>
              }
            </div>
          </div>
        }

        { currentSection === 'Settings' && <div>
            <div>
              <form
                className='bg-white/40 rounded-lg p-8 max-w-[40em] sm:grid sm:grid-cols-2 gap-4 mb-8 flex flex-col'
                >
                <div className='flex justify-between items-center pb-2  sm:col-span-2'>
                  <p className='font-bold'>View / Update Information</p>
                </div>
                {/* Name */}
                <div>
                  <p className='text-xs mb-0.5'>Name</p>
                  <input type='text' name='username' value={username} onChange={submitChangeHandler} className='w-full rounded-md border-none' required />
                </div>
                {/* email */}
                <div>
                  <p className='text-xs mb-0.5'>Email</p>
                  <input type='text' name='email' value={email} onChange={submitChangeHandler} className='w-full rounded-md border-none' required={false} />
                </div>
                {/* Contact */}
                <div>
                  <p className='text-xs mb-0.5'>Contact</p>
                  <input type='text' name='contact' value={contact} onChange={contactChangeHandler} className='w-full rounded-md border-none' required />
                </div>
                {/* address */}
                <div>
                  <p className='text-xs mb-0.5'>Address</p>
                  <input type='text' name='address' value={address} onChange={submitChangeHandler} className='w-full rounded-md border-none' required />
                </div>
                <div className='flex gap-4 col-span-2 mt-4'>
                  <button onClick={updateInfoHandler} className='px-4 py-2 bg-lime-800 hover:bg-yellow-500 text-white rounded-md'>Update Information</button>
                  <button onClick={resetPasswordHandler} className='px-4 py-2 hover:bg-yellow-500 text-lime-800 rounded-md'>Password Reset</button>
                </div>
              </form>
            </div>
          </div>
        }
      </div>

    </section>
  );
}
export default UserInformation;


export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/account/findAccountId`, requestData)
  if(request.data.success) {
    data = request.data.user
  }
  if(data) {
    return {props: {id: id, user: data }}
  }
}
