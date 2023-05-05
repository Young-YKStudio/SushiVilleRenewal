import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLoadingOff, setLoadingOn } from '../../../../../redux/cartSlice';
import { useState } from 'react'
import { toast } from 'react-toastify';
import NextLink from 'next/link'
import Router from 'next/router'

const PromoCodeDashboard = () => {

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

    if(couponCode ==='' || !couponCode || amount === 0 || !amount) {
      return toast.warn('Please fill all fields')
    }
    if(amount < 0) {
      return toast.warn('Coupon value can\'t be negative.')
    }

    let submitForm = {
      couponCode: couponCode,
      amount: amount
    }

    const requestToAPI = async () => {
      try {
        dispatch(setLoadingOn())
        const request = await axios.put('/api/coupon/generatePromoCoupon', submitForm)
        if(request.data.success) {
          dispatch(setLoadingOff())
          toast.success(`Promo Coupon has been created.`)
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
        <p>Promotional Coupons</p>
      </div>
      <div className='text-lime-800 text-sm mb-4'>
        <h3 className='mb-1'>Promo coupons are for sharing the code with many customers.</h3>
        <p className='mb-4'>For generating account coupons, click <NextLink href='/dashboard/coupons/addCoupon' className='font-bold text-red-700 hover:text-yellow-500'>here</NextLink>.</p>

        <div className='my-4 flex flex-col gap-4 max-w-[46em]'>
          <form onSubmit={submitHandler} className='p-4 py-8 bg-blue-500/40 rounded-xl'>
            <p className='font-bold mb-2 text-lg'>Promo Coupon Entry</p>
            <div className='flex flex-col md:grid md:grid-cols-2 gap-4'>
              <div className='flex flex-col gap-1'>
                <div className='flex flex-row justify-between text-xs'>
                  <p>Promo Code</p>
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
export default PromoCodeDashboard;