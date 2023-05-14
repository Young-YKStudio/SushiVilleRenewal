import axios from 'axios'
import GreetingSection from './greeting';
import InfomationSection from './information';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoadingOn, setLoadingOff } from '../../../../redux/cartSlice';
import { toast } from 'react-toastify';

const SuccessPage = (props) => {

  const dispatch = useDispatch()

  const [ isAllSet, setIsAllSet ] = useState(false)

  useEffect(() => {
    let isMounted = true

    const requestToAPI = async () => {
      if(isMounted && !props.order.isPaidAtRestaurant && !props.order.isPlaced) {
        let requestData = {
          orderId: props.order._id,
          isPlaced: true
        }

        try {
          dispatch(setLoadingOn())
          let request = await axios.put('/api/order/placeOnlineOrder', requestData)
          if(request.data.success) {
            dispatch(setLoadingOff())
            setIsAllSet(true)
          }
        } catch (error) {
          dispatch(setLoadingOff())
          toast.error('something went wrong. please contact support')
        }

      }
    }

    if(isMounted && props.order.isPaidAtRestaurant) {
      setIsAllSet(true)
    }

    if(isMounted && !props.order.isPaidAtRestaurant && props.order.isPlaced) {
      setIsAllSet(true)
    }

    if(isMounted && !props.order.isPaidAtRestaurant && !props.order.isPlaced) {
      requestToAPI()
    }

    return () => {
      isMounted = false
    }
  },[props])

  return (
    <div className='flex justify-center bg-yellow-500'>
      {isAllSet ? 
        <section className="pt-20 w-full min-h-[85vh] max-w-[1280px] flex flex-col justify-center md:flex-row px-4 md:px-0">
          <GreetingSection />
          <InfomationSection order={props.order} />
        </section>
      :
        <section className="pt-20 w-full min-h-[85vh] max-w-[1280px] flex flex-col justify-center md:flex-row px-4 md:px-0">
          <div className='w-full h-full flex justify-center items-center text-lime-800'>
            <p className='font-bold text-2xl'>Loading...</p>
          </div>
        </section>
      }
    </div>
  );
}
export default SuccessPage;

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
  if(data) {
    return {props: {id: id, order: data, items: data2 }}
  }
}
