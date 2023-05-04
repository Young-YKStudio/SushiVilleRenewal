import axios from 'axios'
import { useState } from 'react'
import moment from 'moment-timezone'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice'
import Router from 'next/router'

const Reservation = () => {

  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    comments: '',
    email: '',
  })
  const [ contact, setContact ] = useState('')
  const [ reserveDate, setReserveDate ] = useState('')
  const [ reserveTime, setReserveTime ] = useState('')
  const [ totalParty, setTotalParty ] = useState(0)

  const dispatch = useDispatch()

  const { name, comments, email } = submitForm

  const changeHander = (e) => {
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

  const numberPartyHandler = (e) => {
    if(e.target.value < 0) {
      return toast.warn('The number can\t be negative')
    } else {
      setTotalParty(e.target.value)
    }
  }

  const dateHandler = (e) => {
    setReserveDate(e.target.value)
  }

  const timeHandler = (e) => {
    setReserveTime(e.target.value)
  }

  const clearTimes = (e) => {
    e.preventDefault()
    setReserveDate('')
    setReserveTime('')
  }

  const submitHandler = (e) => {
    e.preventDefault()

    let combinedDate = null

    
    if(!name) {
      return toast.warn('Please fill out your name')
    }
    
    if(!totalParty || totalParty === 0 || totalParty === '0') {
      return toast.warn('Please enter your number of party')
    }
    
    if(!email) {
      return toast.warn('Please fill out your email')
    }
    
    if(!contact || contact.length < 14) {
      return toast.warn('Please enter your contact number')
    }
    
    if(!reserveDate || reserveDate === '') {
      return toast.warn('Please enter the date you\'re coming')
    }
    
    if(!reserveTime || reserveTime === '') {
      return toast.warn('Please enter the time you\'re coming')
    }

    if(!localStorage.userId) {
      return toast.warn('Please login again to make a reservation')
    }
    
    let preDate = `${reserveDate} ${reserveTime}`
    combinedDate = moment(preDate).toISOString()

    let sendingData = {
      name: name,
      totalParty: Number(totalParty),
      comments: comments,
      email: email,
      contact: contact,
      customer: localStorage.userId,
      reserveDate: combinedDate
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const reservation = await axios.put('/api/reservation/registerReservation', sendingData)
        if(reservation.data.success) {
          dispatch(setLoadingOff())
          Router.push(`/reservation/success/${reservation.data.reservation._id}`)
        }
      } catch (error) {
        dispatch(setLoadingOn())
        console.log(error)
        toast.error('Error found when requesting your reservation. Please try again')
      }
    }
    requestToAPI()
  }

  return (
    <section className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]">
      <div className="py-8 border-b border-lime-800 mb-8">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Reservation</p>
      </div>
      <div
        className='flex justify-center pt-8'
      >
        <form
          className='bg-white/40 rounded-lg p-8 max-w-[40em] grid grid-cols-2 gap-4'
          onSubmit={submitHandler}
        >
          {/* Name */}
          <div>
            <p className='text-xs mb-0.5'>Name</p>
            <input type='text' name='name' value={name} onChange={changeHander} className='w-full rounded-md border-none' required />
          </div>
          {/* Email */}
          <div>
            <p className='text-xs mb-0.5'>Email</p>
            <input type='email' name='email' value={email} onChange={changeHander} className='w-full rounded-md border-none' required />
          </div>
          {/* Contact */}
          <div>
            <p className='text-xs mb-0.5'>Contact</p>
            <input type='text' name='contact' value={contact} onChange={contactChangeHandler} className='w-full rounded-md border-none' required />
          </div>
          {/* Total Party */}
          <div>
            <p className='text-xs mb-0.5'>Total Party</p>
            <input type='number' name='totalParty' value={totalParty} onChange={numberPartyHandler} className='w-full rounded-md border-none' required />
          </div>
          {/* Total Party */}
          <div className='col-span-2 grid grid-cols-3 items-center justify-self-center w-full'>
            <p className='text-xs mb-0.5 col-span-3'>Reserve Date</p>
            <input type='date' className='border-none rounded-l-md focus:ring-0 active:ring-0' value={reserveDate} onChange={dateHandler} />
            <input type='time' className='border-none rounded-r-md focus:ring-0 active:ring-0' value={reserveTime !== '' ? reserveTime : '00:00:00' } onChange={timeHandler} />
            <button onClick={clearTimes} className='hover:text-lime-600'>clear time</button>
          </div>
          {/* comments */}
          <div className='col-span-2'>
            <p className='text-xs mb-0.5'>Comments on reservation</p>
            <textarea type='text' name='comments' rows={4} value={comments} onChange={changeHander} className='w-full rounded-md border-none' />
          </div>
          <div className='col-span-2 flex justify-center'>
            <button type='submit' className='px-4 py-2 bg-lime-800 text-white hover:bg-lime-600 rounded-md'>Make reservation</button>
          </div>
        </form>
      </div>
    </section>
  );
}
export default Reservation;

// Validate if logged in (from header)
// set up forms
// set up buttons
// set up date modules