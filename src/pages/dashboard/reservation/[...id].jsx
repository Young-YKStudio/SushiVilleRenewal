import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { useState, useEffect } from 'react'
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';
import { toast } from 'react-toastify'
import moment from 'moment-timezone'

const DashboardReservationView = (props) => {

  const [ reservationStatus, setReservationStatus ] = useState(null)
  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    let isMounted = true
    const stateSetter = () => {
      if(isMounted && !props.reservations.isConfirmed && !props.reservations.isDenied && !props.reservations.isShowedUp) {
        setReservationStatus('New Reservation')
      }
      if(isMounted && props.reservations.isConfirmed && !props.reservations.isDenied && !props.reservations.isShowedUp) {
        setReservationStatus('Confirmed Reservation')
      }
      if(isMounted && props.reservations.isConfirmed && !props.reservations.isDenied && props.reservations.isShowedUp) {
        setReservationStatus('Fulfilled Reservation')
      }
      if(isMounted && props.reservations.isDenied) {
        setReservationStatus('Denied Reservation')
      }
    }
    stateSetter()
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

  const confirmReservationHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      reservationId: props.reservations._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/reservation/confirmReservation', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Reservation has been confirmed')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the reservation. Please contact support, or try again later.')
      }
    }
    requestToAPI()
  }

  const finishReservationHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      reservationId: props.reservations._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/reservation/finishReservation', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Reservation has been fulfilled')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the reservation. Please contact support, or try again later.')
      }
    }
    requestToAPI()
  }

  const revertReservationHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      reservationId: props.reservations._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/reservation/revertReservation', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Reservation has been reverted')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the reservation. Please contact support, or try again later.')
      }
    }
    requestToAPI()
  }

  const denyReservationHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      reservationId: props.reservations._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/reservation/denyReservation', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Reservation has been denied')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when modifying the reservation. Please contact support, or try again later.')
      }
    }
    requestToAPI()
  }

  const deletReservationHandler = async (e) => {
    e.preventDefault()
    let sendingData = {
      reservationId: props.reservations._id,
      userId: props.reservations.customer._id
    }
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        let request = await axios.put('/api/reservation/deleteReservation', sendingData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Reservation has been deleted')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found when deleting the reservation. Please contact support, or try again later.')
      }
    }
    requestToAPI()
  }

  const buttonDistributor = (state) => {
    if (state === 'New Reservation') {
      return <div className='w-full grid grid-cols-2 max-w-[40em] mx-auto'>
        <button onClick={confirmReservationHandler} className='bg-lime-800 text-white hover:bg-yellow-500 py-2 rounded-md'>Confirm Reservation</button>
        <button onClick={denyReservationHandler} className='text-red-800 hover:text-lime-800'>Deny Reservation</button>
      </div>
    }
    if (state === 'Confirmed Reservation') {
      return <div className='w-full grid grid-cols-2 max-w-[40em] mx-auto'>
        <button onClick={finishReservationHandler} className='bg-lime-800 text-white hover:bg-yellow-500 py-2 rounded-md'>Customer showed up</button>
        <button onClick={denyReservationHandler} className='text-red-800 hover:text-lime-800'>Deny Reservation</button>
      </div>
    }
    if (state === 'Fulfilled Reservation' || state === 'Denied Reservation') {
      return <div className='w-full grid grid-cols-2 max-w-[40em] mx-auto'>
        <button onClick={revertReservationHandler} className='bg-lime-800 text-white hover:bg-yellow-500 py-2 rounded-md'>Revert to Confimed</button>
        <button onClick={deletReservationHandler} className='text-red-800 hover:text-lime-800'>Delete Reservation</button>
      </div>
    }
  }

  return (  
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Manage Reservation</h1>
      </div>
      
      <div className='border-2 border-lime-800 rounded-md mt-8 p-8 text-lime-800 max-w-[860px] mx-auto'>
        <div className='flex flex-row justify-center mb-4'>
          <p className='font-bold text-lg tracking-wider uppercase'>{reservationStatus}</p>
        </div>

        <div className='text-xl font-bold py-4'>
          <p>Customer Information</p>
        </div>

        <div className='text-sm border-y border-lime-800 py-6 flex flex-col gap-1'>
          <div className='flex flex-row flex-nowrap justify-between'>
            <div>
              <p className='text-xs'>Reservation Name</p>
              <p className='text-xl font-bold tracking-wide truncate'>{props.reservations.name}</p>
            </div>
            <div>
              <p>Name: {props.reservations.customer.username}</p>
              <p className='mb-1'>Total Orders: <span className='font-bold text-lg'>{props.reservations.customer.Orders.length}</span></p>
            </div>
          </div>
          <div className='flex flex-row truncate gap-4'>
            <p>{props.reservations.email}</p>
            <p>{props.reservations.contact}</p>
          </div>
        </div>

        <div className='mt-4'>
          <div className='text-xl font-bold flex flex-row justify-between'>
            <p>Reservation Summary</p>
            <div className='text-xs font-normal'>
              <p>Reservation created:</p>
              <p className='font-bold'>{moment(props.reservations.createdAt).tz('America/New_York').format('LLL')}</p>
            </div>
          </div>

          <div className='py-4'>
            <p className='text-xs'>Reserved Date</p>
            <p className='font-bold'>{moment(props.reservations.reserveDate).tz('America/New_York').format('LLL')}</p>
          </div>

          <div className='py-4'>
            <p className='text-xs'>Number of Party</p>
            <p className='font-bold'>{props.reservations.totalParty} people</p>
          </div>
          {props.reservations.comments && <div className='py-4'>
              <p className='text-xs'>Comments on reservation</p>
              <p className='text-lg'>{props.reservations.comments}</p>
            </div>
          }
          {/* buttons */}
          <div className='mt-4'>
            {buttonDistributor(reservationStatus)}
          </div>
        </div>

      </div>
    </section>
    // Back to list link
  );
}
export default DashboardReservationView

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/reservation/getOneReservation`, requestData)
  if(request.data.success) {
    data = request.data.reservation
  }
  if(data) {
    return {props: {id: id, reservations: data }}
  }
}