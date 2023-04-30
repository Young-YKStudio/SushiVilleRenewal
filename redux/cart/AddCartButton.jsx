import { MdAddShoppingCart } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { addToCart, setLoadingOn, setLoadingOff } from '../cartSlice'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment-timezone'
import { timeStringFormat2, determineDay } from '@/components/util/StoreSetting'

const RdxAddToCartButton = ({item, qty, addOn}) => {

  const [ isItemAvailable, setIsItemAvailable ] = useState('available');
  
  const dispatch = useDispatch()
  useEffect(() => {
    let isMounted = true
    const requestToAPI = async () => {
      if(isMounted) {
        dispatch(setLoadingOn())
        let request = await axios.get('/api/storeStatus/getStoreStatus')
        if(request.data.success) {
          dispatch(setLoadingOff())
          let store = request.data.store
          let now = timeStringFormat2(moment(Date.now()).format('HHmm'))
          if(store.isOpenStoreAuto) {
            if(store.offDays.length >= 1) {
              let today = moment(Date.now()).format('YYYY-MM-DD')
              let matchingDate = store.offDays.find(date => date === today)
              if(matchingDate) {
                setIsItemAvailable('closed')
              } else {
                let checkDay = determineDay(today)
                if(checkDay === 'closed') {
                  setIsItemAvailable('closed')
                }
                if(checkDay === 'regular hours') {
                  if(now < 720) {
                    setIsItemAvailable('closed')
                  }
                  if(now > 720 && now < 1260 && item.category !== 'Lunch Special') {
                    setIsItemAvailable('available')
                  }
                  if(now > 720 && now < 900 && item.category === 'Lunch Special') {
                    setIsItemAvailable('available')
                  }
                  if(now > 900 && now < 1260 && item.category === 'Lunch Special') {
                    setIsItemAvailable('not lunch')
                  }
                  if(now > 1260) {
                    setIsItemAvailable('closed')
                  }
                }
                if(checkDay === 'longer hours') {
                  if(now < 720) {
                    setIsItemAvailable('closed')
                  }
                  if(now > 720 && now < 1290 && item.category !== 'Lunch Special') {
                    setIsItemAvailable('available')
                  }
                  if(now > 720 && now < 900 && item.category === 'Lunch Special') {
                    setIsItemAvailable('available')
                  }
                  if(now > 900 && now < 1290 && item.category === 'Lunch Special') {
                    setIsItemAvailable('not lunch')
                  }
                  if(now > 1290) {
                    setIsItemAvailable('closed')
                  }
                }
              }
            }
            if(store.offDays.length === 0) {
              let today = moment(Date.now()).format('YYYY-MM-DD')
              let checkDay = determineDay(today)
              if(checkDay === 'closed') {
                setIsItemAvailable('closed')
              }
              if(checkDay === 'regular hours') {
                if(now < 720) {
                  setIsItemAvailable('closed')
                }
                if(now > 720 && now < 1260 && item.category !== 'Lunch Special') {
                  setIsItemAvailable('available')
                }
                if(now > 720 && now < 900 && item.category === 'Lunch Special') {
                  setIsItemAvailable('available')
                }
                if(now > 900 && now < 1260 && item.category === 'Lunch Special') {
                  setIsItemAvailable('not lunch')
                }
                if(now > 1260) {
                  setIsItemAvailable('closed')
                }
              }
              if(checkDay === 'longer hours') {
                if(now < 720) {
                  setIsItemAvailable('closed')
                }
                if(now > 720 && now < 1290 && item.category !== 'Lunch Special') {
                  setIsItemAvailable('available')
                }
                if(now > 720 && now < 900 && item.category === 'Lunch Special') {
                  setIsItemAvailable('available')
                }
                if(now > 900 && now < 1290 && item.category === 'Lunch Special') {
                  setIsItemAvailable('not lunch')
                }
                if(now > 1290) {
                  setIsItemAvailable('closed')
                }
              }
            }
          }
          if(!store.isOpenStoreAuto) {
            if(store.isStoreOpen) {
              setIsItemAvailable('available')
            }
            if(!store.isStoreOpen) {
              setIsItemAvailable('closed')
            }
          }
        }
      }
    }
    requestToAPI()
    return () => {
      isMounted = false
    }
  },[])
  
  const ATCbutton = (item, qty) => {
                    
    const productObj = {
      qty: qty,
      product: item,
      addOns: addOn
    }

    dispatch(addToCart(productObj))
    toast.success(`${productObj.product.name} has been added.`)
  }

  const buttonDistributor = (string) => {
    if(string === 'available') {
      return <button
      onClick={() => ATCbutton(item, qty)}
      className="px-4 py-2 bg-lime-800 rounded-md text-white hover:bg-lime-600 flex items-center justify-center truncate"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Add to cart
    </button>
    }

    if(string === 'closed') {
      return <button
      disabled
      className="px-4 py-2 bg-slate-400 rounded-md text-white flex items-center justify-center truncate"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Closed
    </button>
    }

    if(string === 'not lunch') {
      return <button
      disabled
      className="px-4 py-2 bg-slate-400 rounded-md text-white flex items-center justify-center truncate"
    >
      <MdAddShoppingCart className='w-5 h-5 mr-2'/> Not Lunch Hour
    </button>
    }
  }

  return (
    <>
      {buttonDistributor(isItemAvailable)}
    </>
  );
}
export default RdxAddToCartButton;