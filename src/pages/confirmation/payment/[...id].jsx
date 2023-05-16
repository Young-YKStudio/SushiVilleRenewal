import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';
import { toast } from 'react-toastify';
import CheckoutForm from '../../../components/confirmation/payment/checkOutForm';
import ItemList from '../../../components/confirmation/payment/itemList';

const stripePromise = loadStripe(process.env.APP_STRIPE_PUB_KEY)

const OrderPaymentOnline = (props) => {

  const [ clientSecret, setClientSecret ] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    let isMounted = true
    const requestToAPI = async () => {
      
      let sendingData = {
        orderId: props.id
      }
      
      if(isMounted) {
        try {
          dispatch(setLoadingOn())
          let request = await axios.post('/api/stripe/createPaymentIntent', sendingData)
          if(request.data.success) {
            dispatch(setLoadingOff())
            setClientSecret(request.data.clientSecret)
          }
        } catch (error) {
          dispatch(setLoadingOff())
          toast.error('Something went wrong. Please contact support or try again later.')
        }
      }
    }
    
    requestToAPI()
    return () => {
      isMounted = false
    } 
  }, [props])

  const appearance = {
    theme: 'stripe'
  }

  const options = {
    clientSecret,
    appearance
  }
  
  return (
    <section className="pt-20 flex flex-col px-8 pb-8 text-lime-800 bg-yellow-500 min-h-[85vh]">
      <div className="py-8 border-b border-lime-800 mb-8">
        <p className="font-bold text-2xl md:text-3xl md:text-center">Payment</p>
      </div>
      <div className="flex flex-col md:flex-row flex-nowrap md:mx-auto md:gap-8">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <ItemList orderData={props} />
            <CheckoutForm clientSecret={clientSecret} orderData={props} />
          </Elements>
        )}
      </div>
    </section>
  );
}
export default OrderPaymentOnline;

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
  return {props: {id: id, order: data, items: data2 }}
}