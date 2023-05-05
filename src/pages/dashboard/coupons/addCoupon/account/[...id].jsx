import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../../../redux/cartSlice'
import { useState } from 'react'
import { toast } from 'react-toastify';
import NextLink from 'next/link'
import Router from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const AddCouponAccountDashboard = (props) => {

  const dispatch = useDispatch()

  const [ couponCode, setCouponCode ] = useState('')
  const [ amount, setAmount ] = useState(0)

  const couponCodeChangeHandler = (e) => {
    setCouponCode(e.target.value)
  }
  const amountChangeHandler = (e) => {
    setAmount(e.target.value)
  }

  const generateRandomCode = (e) => {
    e.preventDefault()

    const result = Math.random().toString(36).substring(2,11);
    let formattedCode = result.toUpperCase()
    return setCouponCode(formattedCode)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    console.log('clicked button')
    // validate
    if(couponCode ==='' || !couponCode || amount === 0 || !amount) {
      return toast.warn('Please fill all fields')
    }
    if(amount < 0) {
      return toast.warn('Coupon value can\'t be negative.')
    }
    // setform
    let submitForm = {
      userId: props.id,
      couponCode: couponCode,
      amount: amount
    }
    // submit to api
    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/coupon/generateAccountCoupon', submitForm)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success(`Coupon has been assigned to ${props.account.username}`)
          setTimeout(() => {
            Router.push('/dashboard/coupons')
          }, 500)
        }
      } catch (error) {
        dispatch(setLoadingOff())
        console.log(error)
        toast.error('Error at generating coupon. Please contact support or try again later.')
      }
    }

    requestToAPI()
  }

  return (
    <section
      className="pl-20 py-8 pr-8 w-full"
    >
      <div className='pl-6 pb-4 border-b border-lime-800 mb-4 text-lime-800 font-bold text-2xl md:text-3xl'>
        <p>Add Coupon to Account</p>
      </div>
      <div className='text-lime-800 text-sm mb-4'>
        <h3 className='mb-1'>All coupons that are assigned to accounts will not be shared with any other acconts.</h3>
        <p className='mb-4'>Shared coupons will be considered as promo coupons, and they can be created <NextLink href='/dashboard/coupons/promoCode' className='font-bold text-red-700 hover:text-yellow-500'>here</NextLink>.</p>
        <div className='my-4 flex flex-col gap-4 max-w-[46em]'>
          <ul className='p-4 py-8 bg-yellow-500/40 rounded-xl'>
            <p className='font-bold mb-2 text-lg'>Account Information</p>
            <div className='flex flex-row gap-4'>
              <div className='flex flex-col gap-1'>
                <li> Name:</li>
                <li> Email:</li>
                <li> Contact:</li>
                <li>Active Coupons:</li>
              </div>
              <div className='font-bold flex flex-col gap-1'>
                <li>{props.account.username}</li>
                <li>{props.account.email}</li>
                <li>{props.account.contact}</li>
                <li>{props.account.Coupons.length} <span className='text-xs'>{'coupon(s).'}</span></li>
              </div>
            </div>
          </ul>
        </div>

        <div className='my-4 flex flex-col gap-4 max-w-[46em]'>
          <form onSubmit={submitHandler} className='p-4 py-8 bg-blue-500/40 rounded-xl'>
            <p className='font-bold mb-2 text-lg'>Coupon Entry</p>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between text-xs'>
                  <p>Coupon Code</p>
                  <button onClick={(e) => generateRandomCode(e)} className='hover:text-lime-800 hover:font-bold'>Generate random code</button>
                </div>
                <input type='text' name='couponCode' value={couponCode} onChange={couponCodeChangeHandler} className='border-none rounded-md focus:ring-0 w-full' />
              </div>
              <div className='flex flex-col gap-1'>
                <p className='text-xs'>Coupon Amount {'(USD)'}</p>
                <input type='number' name='amount' value={amount} onChange={amountChangeHandler} className='border-none rounded-md focus:ring-0 w-full' />
              </div>
              <div className='flex justify-center items-center md:col-span-2'>
                <button type='submit' className='bg-lime-800 text-white w-full py-3 rounded-md text-sm hover:bg-yellow-500'>Create Coupon</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        
      </div>
    </section>
  );
}
export default AddCouponAccountDashboard;

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
    return {props: {id: id, account: data }}
  }
}