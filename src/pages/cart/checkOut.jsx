import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice'
import { toast } from 'react-toastify'
import { Disclosure, Switch } from '@headlessui/react'

const CheckOutSection = ({grandTotal, isPayAtRestaurant, setIsPayAtRestaurant}) => {

  console.log(localStorage, grandTotal, 'from checkout section')

  const dispatch = useDispatch()
  const [ receivedUser, setReceivedUser ] = useState(null)
  const [ isContactPresent, setIsContactPresent ] = useState(false)
  const [ callUseEffect, setCallUseEffect ] = useState(false)
  const [ contactSubmit, setContactSubmit ] = useState()

  useEffect(() => {

    // console.log(localStorage.userId)
    let isMounted = true
    const getUser = async () => {
      if(isMounted && localStorage.userId) {
        let sendingData = {
          id: localStorage.userId
        }
        try {
          dispatch(setLoadingOn())
          const foundUser = await axios.put(`/api/account/findAccountId`, sendingData)
          if(foundUser.data.success) {
            console.log(foundUser.data, 'at app')
            await setReceivedUser(foundUser.data.user)
            if(foundUser.data.user.contact) {
              setIsContactPresent(true)
            }
            if(foundUser.data.user.contact === '') {
              setIsContactPresent(false)
            }
            dispatch(setLoadingOff())
          }
        } catch (error) {
          dispatch(setLoadingOff())
          toast.error('Error found receiving user information. Please try again.')
        }
      }
    }
    getUser()
    return () => {
      isMounted = false
    }
  },[localStorage, callUseEffect])

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
    setContactSubmit(formattedPhoneNumber)
  }

  const contactSubmitHandler = async (e) => {
    e.preventDefault()
    let submitForm = {
      id: receivedUser._id,
      contact: contactSubmit
    }

    const updateContact = async () => {
      if(submitForm.id && submitForm.contact) {
        try {
          dispatch(setLoadingOn())
          let request = await axios.put('/api/account/updateContact', submitForm)
          if(request.data.success) {
            setCallUseEffect(!callUseEffect)
            dispatch(setLoadingOff())
          }
        } catch (error) {
          dispatch(setLoadingOff())
          console.log(error)
          if(error.response) {
            toast.error(error.response.data.message)
          } else {
            toast.error('Error found at updating contact. Please contact service.')
          }
        }
      } else {
        toast.warn('Please fill out contact form')
      }
    }

    updateContact()
    // console.log(submitForm, 'button clicked')
  }

  return (
    <section className='my-auto w-full bg-white/40 p-8 rounded-md'>
      {isContactPresent ? 'yes' : 'no'}
      <p className='text-lg py-2'>Account Information</p>
      {receivedUser && <div
          className='flex flex-col gap-4'
        >
          <div>
            <p className='text-xs'>name</p>
            <p className='font-bold truncate'>{receivedUser.username}</p>
          </div>
          <div>
            <p className='text-xs'>contact email</p>
            <p className='font-bold truncate'>{receivedUser.email}</p>
          </div>
          {/* When contact is missing */}
          {!isContactPresent ? <form
            onSubmit={contactSubmitHandler}
            className='flex flex-col gap-2'
          >
            <p>Please provide your contact number.</p>
            <input type='text' name='contact' value={contactSubmit} onChange={contactChangeHandler}
              className='w-full bg-white rounded-md border-none'
            />
            <button type='submit' className='px-4 py-1.5 bg-lime-800 text-white hover:bg-lime-600 rounded-md mt-2'>Update Contact</button>
          </form>
          :
          <div>
            {/* when contact is present */}
            <p className='text-xs'>contact</p>
            <p className='font-bold truncate'>{receivedUser.contact}</p>
          </div>
          }
        </div>
      }
    </section>
  );
}
export default CheckOutSection;


// validate if user has contact number 
// if contact number, show all info in text
// not, show a button to edit information and below order informations


// CREATE ORDER ONLY!!! payment comes next with order id from DB (api should send order._id back to app with response)

// Order information -{orderedItem:Array, orderComments, isDelivery, customer, isConfirmed, isReady, isFinished, isPaid, isPaidAtRestaurant, grandTotal, isScheduled, OrderNumber}

// display order
// isDelivery = not using currently
// isScheduled
// payment option
// customer information
// grandTotal agreement
// term of condition agreement
// Place order button