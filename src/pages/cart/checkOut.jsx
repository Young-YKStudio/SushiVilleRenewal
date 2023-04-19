import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setLoadingOn, setLoadingOff } from '../../../redux/cartSlice'
import { toast } from 'react-toastify'
import { Disclosure, Switch } from '@headlessui/react'
import NextLink from 'next/link'
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md'
import moment from 'moment-timezone'
import Router from 'next/router'

const CheckOutSection = ({grandTotal, addOnTotal, extraTotal, taxRate, subTotal, isPayAtRestaurant, setIsPayAtRestaurant, cartItems}) => {

  console.log(localStorage, grandTotal, 'from checkout section')

  const dispatch = useDispatch()
  const [ receivedUser, setReceivedUser ] = useState(null)
  const [ isContactPresent, setIsContactPresent ] = useState(false)
  const [ callUseEffect, setCallUseEffect ] = useState(false)
  const [ contactSubmit, setContactSubmit ] = useState()
  const [ isDelivery, setIsDelivery ] = useState(false)
  const [ isAgreed, setIsAgreed ] = useState(false)
  const [ orderDate, setOrderDate ] = useState('')
  const [ orderTime, setOrderTime ] = useState('')
  const [ orderComments, setOrderComments ] = useState('')

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


  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const dateHandler = (e) => {
    setOrderDate(e.target.value)
  }

  const timeHandler = (e) => {
    setOrderTime(e.target.value)
  }

  const agreedHandler = (e) => {
    setIsAgreed(!isAgreed)
  }

  const clearTimes = () => {
    setOrderDate('')
    setOrderTime('')
  }

  const orderPlaceHandler = async () => {

    let combinedDate = null

    if(!isAgreed) {
      return toast.warn('All orders are subject to be agreed with the Terms of Conditions.')
    }
    if(!receivedUser) {
      return toast.warn('User is not found. Please logout and try again.')
    }
    if(!cartItems) {
      return toast.warn('Looks like your cart is empty. Please try again.')
    }
    if(orderDate !== '' || orderTime !== '') {
      if(isPayAtRestaurant) {
        return toast.warn('You can\'t set to pay at pickup for scheduled orders')
      }
      let preDate = `${orderDate} ${orderTime}`
      combinedDate = moment(preDate).toISOString()
    }
    
    let submitForm = {
      orderedItems: cartItems,
      customer: receivedUser,
      comments: orderComments,
      isAgreed: isAgreed,
      isScheduled: combinedDate,
      isPayAtRestaurant: isPayAtRestaurant,
      grandTotal: grandTotal,
      addOnTotal: addOnTotal,
      supplementTotal: extraTotal,
      taxRate: taxRate,
      orderTotal: subTotal,
    }

    const requestToCreateOrder = async () => {
      try {
        dispatch(setLoadingOn())
        const orderRequest = await axios.post('/api/order/createOrder', submitForm)
        if(orderRequest.data.success) {
          dispatch(setLoadingOff())
          Router.push(`/confirmation/${orderRequest.data.order._id}`)
        }
        console.log(orderRequest)
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error found on placing your order. Please try again.')
      }
    }
    requestToCreateOrder()
  }

  return (
    <section className='my-auto w-full bg-white/40 p-8 rounded-md'>
      <p className='text-lg py-2'>Account Information</p>
      {receivedUser && <div
          className='flex flex-col gap-2'
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
            <div className='mb-4'>
              <p className='text-xs'>contact</p>
              <p className='font-bold truncate'>{receivedUser.contact}</p>
              <div className='text-xs flex gap-4 italic mt-2'>
                <p>Need to update your information?</p>
                <NextLink href='#' className='hover:text-lime-600'>Update</NextLink>
              </div>
            </div>
            {/* Options */}

            {/* Delivery Option (customer not using) */}
            {/* <div className="divide-y divide-lime-800 border-y border-lime-800">
              <Disclosure as="div" key='options'>
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                        >
                          Delivery Option
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MdOutlineRemove
                              className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <MdOutlineAdd
                              className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm">
                      <div className="bg-white/40 rounded-md p-8 flex flex-col gap-1 text-lime-800 mb-8">
                        <div className='grid grid-cols-3 items-center justify-self-center text-center'>
                          <p className={!isDelivery ? 'text-lime-800 font-bold' : 'text-slate-400'}>Not Delivery</p>
                          <div className='flex justify-center'>
                            <Switch
                              checked={isDelivery}
                              onChange={setIsDelivery}
                              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

                            >
                              <span className="sr-only">delivery?</span>
                              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  isDelivery ? 'bg-lime-800' : 'bg-yellow-500',
                                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                                )}
                              /> 
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  isDelivery ? 'translate-x-5' : 'translate-x-0',
                                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                                )}
                              />
                            </Switch>
                          </div>
                          <p className={isDelivery ? 'text-lime-800 font-bold' : 'text-slate-400'}>Delivery</p>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div> */}

            {/* isScheduled */}
            <div className="divide-y divide-lime-800 border-t border-lime-800">
              <Disclosure as="div" key='options'>
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                        >
                          Schedule Order
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MdOutlineRemove
                              className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <MdOutlineAdd
                              className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm">
                      <div className="bg-white/40 rounded-md px-8 py-6 flex flex-col text-lime-800 mb-8">
                        <div className='grid grid-cols-2 items-center justify-self-center'>
                          <input type='date' className='border-none rounded-l-md focus:ring-0 active:ring-0' value={orderDate} onChange={dateHandler} />
                          <input type='time' className='border-none rounded-r-md focus:ring-0 active:ring-0' value={orderTime !== '' ? orderTime : '00:00:00' } onChange={timeHandler} />
                          <button onClick={clearTimes} className='hover:text-lime-600 col-span-2 mt-2'>clear time</button>
                        </div>
                        {/* payAtRestaurant */}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            {/* Delivery Option (customer not using) */}
            <div className="divide-y divide-lime-800 border-y border-lime-800">
              <Disclosure as="div" key='options'>
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                        >
                          Payment Option
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MdOutlineRemove
                              className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <MdOutlineAdd
                              className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm">
                      <div className="bg-white/40 rounded-md px-8 py-4 flex flex-col gap-1 text-lime-800 mb-8">
                        <div className='grid grid-cols-3 items-center justify-self-center text-center'>
                          <p className={!isPayAtRestaurant ? 'text-lime-800 font-bold text-xs' : 'text-slate-400 text-xs'}>Pay Online</p>
                          <div className='flex justify-center'>
                            <Switch
                              checked={isPayAtRestaurant}
                              onChange={orderTime !== '' ? null:  setIsPayAtRestaurant}
                              className="group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full outline-none ring-2 ring-lime-600 ring-offset-2"

                            >
                              <span className="sr-only">delivery?</span>
                              <span aria-hidden="true" className="pointer-events-none absolute h-full w-full rounded-md bg-white" />
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  isPayAtRestaurant ? 'bg-lime-800' : 'bg-yellow-500',
                                  'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
                                )}
                              /> 
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  isPayAtRestaurant ? 'translate-x-5' : 'translate-x-0',
                                  'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-yellow-500 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
                                )}
                              />
                            </Switch>
                          </div>
                          <p className={isPayAtRestaurant ? 'text-lime-800 font-bold truncate text-xs' : 'text-slate-400 text-xs'}>Pay at Pickup</p>
                          <p className='text-xs col-span-3'>Pay at pickup is not available for sheduled orders.</p>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            {/* Comments */}
            <div className="divide-y divide-lime-800 border-b border-lime-800">
              <Disclosure as="div" key='options'>
                {({ open }) => (
                  <>
                    <h3>
                      <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                        <span
                          className={classNames(open ? 'text-lime-600' : 'text-lime-800 group-hover:text-lime-600', 'text-sm font-medium')}
                        >
                          Comments
                        </span>
                        <span className="ml-6 flex items-center">
                          {open ? (
                            <MdOutlineRemove
                              className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          ) : (
                            <MdOutlineAdd
                              className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                              aria-hidden="true"
                            />
                          )}
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel as="div" className="prose prose-sm">
                      <div className="rounded-md flex flex-col text-lime-800 mb-8">
                        <div>
                          <textarea rows={3} value={orderComments} onChange={(e) => setOrderComments(e.target.value)} className='w-full rounded-md border-none'/>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>

            {/* Agreement */}
            <div className='flex flex-col gap-4 text-sm my-4'>
              <div className='flex justify-start items-center gap-4'>
                <input type='checkbox' name='agreement' value={isAgreed} onChange={agreedHandler}
                  className='h-4 w-4 rounded border-gray-300 text-lime-800 focus:ring-lime-800'
                />
                <div className='flex items-center text-xs gap-1'>
                  <p>I agree with the</p>
                  <NextLink href='/policy' className='text-lime-800 hover:text-lime-600 text-xs text-center font-bold'>Terms of Conditions</NextLink>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              className='bg-lime-800 hover:bg-lime-600 w-full text-white py-2 my-2 rounded-md'
              onClick={orderPlaceHandler}
            >
              Place order
            </button>
          </div>
          }
        </div>
      }
    </section>
  );
}
export default CheckOutSection;

// CREATE ORDER ONLY!!! payment comes next with order id from DB (api should send order._id back to app with response)
