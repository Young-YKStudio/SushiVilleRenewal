import axios from 'axios'
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../../redux/cartSlice';
import moment from 'moment-timezone'
import { Disclosure } from '@headlessui/react'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'
import { Switch } from '@headlessui/react';

const roles = [
  {role: 'admin'},
  {role: 'employee'},
  {role: 'user'},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const DashboardUserEdit = (props) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)
  const [ submitForm, setSubmitForm ] = useState({
    name: '',
    email: '',
    role: '',
    address: ''
  })
  const [ contact, setContact ] = useState('')
  const dispatch = useDispatch()

  const { name, email, role, address } = submitForm

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
    }
  }

  const getUserName = (userData) => {
    if(userData.name) {
      return `${userData.name}`
    }
    if(userData.username) {
      return `${userData.username}`
    }
  }

  const getAddress = (userData) => {
    if(userData.address1) {
      return `${userData.address1}`
    }
    if(userData.address) {
      return `${userData.address}`
    }
    return ''
  }

  const getRole = (userData) => {
    if(userData.isAdmin) {
      return `${userData.isAdmin}`
    }
    if(userData.role) {
      return `${userData.role}`
    }
  }

  const orderStatusSetter = (isPlaced, isConfirmed, isReady, isFinished) => {
    if(isPlaced && !isConfirmed && !isReady && !isFinished) {
      return 'New'
    }
    if(isPlaced && isConfirmed && !isReady && !isFinished) {
      return 'Confirmed'
    }
    if(isPlaced && isConfirmed && isReady && !isFinished) {
      return 'Ready'
    }
    if(isPlaced && isConfirmed && isReady && !isFinished) {
      return 'Fulfilled'
    }
    if(!isPlaced && !isConfirmed && !isReady && !isFinished) {
      return 'Pending'
    }
  }

  const reservationStatusSetter = (isConfirmed, isDenied, isShowedUp) => {
    if(isDenied) {
      return 'Denied'
    }
    if(!isDenied && !isConfirmed && !isShowedUp) {
      return 'New'
    }
    if(!isDenied && isConfirmed && !isShowedUp) {
      return 'Confirmed'
    }
    if(!isDenied && isConfirmed && isShowedUp) {
      return 'Fulfilled'
    }
  }

  useEffect(() => {
    let isMounted = true

    const setStates = () => {
      if(isMounted && props.user) {
        setSubmitForm({
          name: getUserName(props.user),
          email: props.user.email,
          role: getRole(props.user),
          address: getAddress(props.user)
        })
        setContact(props.user.contact ? props.user.contact : '')
      }
    }
    setStates()
    return () => {
      isMounted = false
    }
  }, [props])

  const changeHandler = (e) => {
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

  const updateAccountHandler = (e) => {
    e.preventDefault()
    let submitData = {
      id: props.user._id,
      name: name,
      email: email,
      role: role,
      address: address,
      contact: contact
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/account/updateAccount', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Successfully updated')
          setTimeout(() => {
            Router.reload()
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error when updating account. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  const deleteAccountHandler = (e) => {
    e.preventDefault()
    let submitData = {
      id: props.user._id,
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/account/deleteAccount', submitData)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success('Successfully deleted')
          setTimeout(() => {
            Router.push('/dashboard')
          }, 1000)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        toast.error('Error when deleting account. Please contact support or try again later.')
      }
    }
    requestToAPI()
  }

  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Account View / Edit</h1>
      </div>
      <form 
        className='grid bg-lime-800/40 p-4 rounded-xl gap-4 max-w-[41.3em] md:grid-cols-2 md:gap-4 text-lime-800 mt-8'
        onSubmit={updateAccountHandler}
      >
        <div
          className='col-span-2'
        >
          <p className='text-2xl font-bold'>Account Information</p>
          <div className='flex flex-row gap-2 items-center'>
            <p className='text-xs'>Total orders</p>
            <p className='font-bold'>{props.user.Orders.length}</p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <p  className='text-xs'>Account Created</p>
            <p className='font-bold text-sm'>{moment(props.user.createdAt).tz('America/New_York').format('LL')}</p>
          </div>
        </div>
        {/* name */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Name</p>
          <input type='text' value={name} name='name' onChange={changeHandler} className='w-full text-sm border-none rounded-md'/>
        </div>
        {/* email */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Email</p>
          <input type='text' value={email} name='email' onChange={changeHandler} className='w-full text-sm border-none rounded-md' />
        </div>
        {/* contact */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Contact</p>
          <input type='text' value={contact} name='contact' onChange={contactChangeHandler} className='w-full text-sm border-none rounded-md' />
        </div>
        {/* address */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Address</p>
          <input type='text' value={address} name='address' onChange={changeHandler} className='w-full text-sm border-none rounded-md' />
        </div>
        {/* role */}
        <div className='flex flex-col flex-nowrap gap-1'>
          <p className='text-xs text-white tracking-wider'>Role</p>
          <select
            className='w-full text-sm border-none rounded-md'
            onChange={changeHandler}
            name='role'
            value={role}
          >
            <option value='' defaultValue='' disabled hidden >Choose role</option>
            {roles && roles.map((item, i) => {
              return <option
                key={i}
                value={item.role}
              >
                {item.role}
              </option>
            })}
          </select>
        </div>
        {/* button */}
        <div className='col-span-2 flex justify-center gap-4 my-4'>
          <button type='submit' className='px-8 py-2 bg-lime-800 hover:bg-yellow-500 text-white rounded-md'>Update Account</button>
          <button onClick={deleteAccountHandler} className='px-8 py-2 text-red-800 hover:text-red-500'>Delete Account</button>
        </div>
      </form>
      {/* orders */}
      <div
        className='bg-lime-800/40 p-4 rounded-xl max-w-[41.3em]  text-lime-800 mt-8'
      >
        <Disclosure as="div" key='orders'>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-2 text-left">
                  <span
                    className={classNames(open ? 'text-lime-600 ' : 'text-lime-800 group-hover:text-lime-600', 'text-2xl font-bold')}
                  >
                    {`Orders (${props.user.Orders.length})`}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MdExpandLess
                        className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdExpandMore
                        className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="w-full my-4 pt-4 border-t border-lime-800">
                <div className="rounded-md flex flex-col text-lime-800 w-full">
                  {props.user.Orders.length > 0 && <div
                      className='grid grid-cols-4 gap-4 py-1 px-4 border-b border-lime-700 mb-2 text-xs'
                    >
                      <p>Status</p>
                      <p>Order Number</p>
                      <p>Total Amount</p>
                      <p>Order Placed</p>
                    </div>}
                  {props.user.Orders.length > 0 ? props.user.Orders.map((order) => {
                    return <div
                      key={order._id}
                      className='grid grid-cols-4 gap-4 w-full py-1 px-4 hover:bg-white/40 hover:cursor-pointer rounded-md text-sm'
                      onClick={(e) => Router.push(`/dashboard/order/${order._id}`)}
                    >
                      {/* order status */}
                      <p>{orderStatusSetter(order.isPlaced, order.isConfirmed, order.isReady, order.isFinished)}</p>
                      {/* order number */}
                      <p>{order.orderCount}</p>
                      {/* orderAmount */}
                      <p>${order.grandTotal.toFixed(2)}</p>
                      {/* createdAt */}
                      <p>{moment(order.createdAt).tz('America/New_York').format('LL')}</p>
                    </div>
                  }) : <p>Account has no orders yet.</p>}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      {/* reservations */}
      <div
        className='bg-lime-800/40 p-4 rounded-xl max-w-[41.3em]  text-lime-800 mt-8'
      >
        <Disclosure as="div" key='orders'>
          {({ open }) => (
            <>
              <h3>
                <Disclosure.Button className="group relative flex w-full items-center justify-between py-2 text-left">
                  <span
                    className={classNames(open ? 'text-lime-600 ' : 'text-lime-800 group-hover:text-lime-600', 'text-2xl font-bold')}
                  >
                    {`Reservations (${props.user.Reservations.length})`}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MdExpandLess
                        className="block h-6 w-6 text-lime-600 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <MdExpandMore
                        className="block h-6 w-6 text-lime-800 group-hover:text-lime-600"
                        aria-hidden="true"
                      />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel as="div" className="w-full my-4 pt-4 border-t border-lime-800">
                <div className="rounded-md flex flex-col text-lime-800 w-full">
                  {props.user.Reservations.length > 0 && <div
                      className='grid grid-cols-4 gap-4 py-1 px-4 border-b border-lime-700 mb-2 text-xs'
                    >
                      <p>Status</p>
                      <p>Reserved Name</p>
                      <p>Total Party</p>
                      <p>Reserved Date</p>
                    </div>}
                  {props.user.Reservations.length > 0 ? props.user.Reservations.map((reservation) => {
                    return <div
                      key={reservation._id}
                      className='grid grid-cols-4 gap-4 w-full py-1 px-4 hover:bg-white/40 hover:cursor-pointer rounded-md text-sm'
                      onClick={(e) => Router.push(`/dashboard/reservation/${reservation._id}`)}
                    >
                      {/* order status */}
                      <p>{reservationStatusSetter(reservation.isConfirmed, reservation.isDenied, reservation.isShowedUp)}</p>
                      {/* reserve name */}
                      <p>{reservation.name}</p>
                      {/* party number */}
                      <p>{reservation.totalParty} ppl</p>
                      {/* reserveDate */}
                      <p>{moment(reservation.reserveDate).tz('America/New_York').format('lll')}</p>
                    </div>
                  }) : <p>Account has no reservations yet.</p>}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>

    </section>
  );
}
export default DashboardUserEdit;

export async function getServerSideProps(context) {
    
  const id = context.params.id[0]
  let data = null

  let requestData = {
    id: id
  }

  // API to get products
  const request = await axios.put(`${process.env.APP_URL}/api/account/getDashboardAccount`, requestData)
  if(request.data.success) {
    data = request.data.account
  }
  if(data) {
    return {props: {id: id, user: data }}
  }
}

