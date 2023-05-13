import { PaymentElement, LinkAuthenticationElement, useStripe, useElements, PaymentRequestButtonElement, CardElement } from "@stripe/react-stripe-js";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setLoadingOff, setLoadingOn } from "../../../../redux/cartSlice";
import { toast } from "react-toastify";
import axios from 'axios'

const CheckoutForm = ({clientSecret, orderData}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { isLoading } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  const [ email, setEmail ] = useState('')
  const [ paymentRequest, setPaymentRequest ] = useState(null)

  console.log(orderData)

  useEffect(() => {
    let isMounted = true

    if(!stripe) {
      return 
    }

    if(!clientSecret) {
      return
    }

    setEmail(orderData.order.customer.email)

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case 'succeeded':
          dispatch(setLoadingOff())
          break
        case 'processing':
          dispatch(setLoadingOn())
          break
        case 'requires_payment_method':
          dispatch(setLoadingOff())
          break
        default:
          dispatch(setLoadingOff())
          break
      }
    })

    let receivedTotalPrice = orderData.order.grandTotal
    let TotalWith2Decimal = receivedTotalPrice.toFixed(2)
    let totalBeforeRound = Number(TotalWith2Decimal)*100
    let formattedTotal = Math.round(totalBeforeRound)

    const pr = stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: `Order ${orderData.order.orderCount}`,
        amount: formattedTotal,
      },
      requestPayerName: true,
      requestPayerEmail: true
    })

    pr.canMakePayment().then(result => {
      if(result) {
        setPaymentRequest(pr)
      }
    })

    pr.on('paymentmethod', async (e) => {
      const {clientSecret} = await axios.post('/api/stripe/walletPaymentIntent')
      const {error, paymentIntent} = await stripe.confirmCardPayment(
        clientSecret, {
          payment_method: e.paymentMethod.id
        },  {
          handleActions: false,
        }
      )
      if(error) {
        e.complete('fail')
        return
      }
      e.complete('success')
      if(paymentIntent.status === 'requires_action') {
        stripe.confirmCardPayment(clientSecret)
      }
    })

    return () => {
      isMounted = false
    }
  },[stripe])

  const paymentElementOptions = {
    layout: 'tabs'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    dispatch(setLoadingOn())

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.APP_URL}/order/success/${orderData.order._id}`
      }
    })
    if( error.type ===  'card_error' || error.type === 'validation_error') {
      toast.warn(`Error occurred with the card, ${error.message}`)
    } else {
      toast.warn('An unexpected error occurred.')
    }

    dispatch(setLoadingOff())
  }

  return (
    <form
      id='payment-form'
      onSubmit={handleSubmit}
      className=" px-4 w-full md:w-[25em] flex flex-col justify-center"
    >
      <PaymentElement id='payment-element' options={paymentElementOptions} />
      { !isLoading ? 
        <button 
          disabled={isLoading || !stripe || !elements} 
          id='submit' 
          type='submit'
          className="py-2 bg-lime-800 text-white my-4 rounded-md hover:bg-lime-800/40"
        >
          <span id='button-text'>
            {isLoading ? <div className="spinner" id='spinner'></div> : 'Confirm Payment'}
          </span>
        </button>
        :
        <button
          disabled
          className="py-2 bg-lime-800/40 text-white my-4 rounded-md"
        >
          Loading...
        </button>
      }
    </form>
  );
}
export default CheckoutForm;