import Router from "next/router"
import { motion } from 'framer-motion'
import moment from 'moment-timezone'
import { MdRefresh } from 'react-icons/md'
import { useEffect } from 'react'

const NewOrders = ({orders, callServer, now}) => {
  
  let newOrders
  let audio
  let interval
  
  
  if(orders) {
    newOrders = orders.filter(order => !order.isFinished && !order.isConfirmed && !order.isReady)
  }
  
  const linkHandler = (e, id) => {
    e.preventDefault()
    Router.push(`/dashboard/order/${id}`)
  }

  const musicPlay = () => {
    if(newOrders.length > 0) {
      interval = setInterval(() => {
        audio.src = '/sound/orderSound.mp3'
        audio.play()
      }, 5000)
    } else {
      audio.pause()
      clearInterval(interval)
    }
  }

  useEffect(() => {
    if(newOrders) {
      audio = new Audio()
      audio.autoplay = true
      if(newOrders.length > 0) {
        musicPlay()
      } else {
        audio.pause()
        clearInterval(interval)
      }
    }

    return () => {
      clearInterval(interval)
    }
  }, [newOrders])

  const itemStyles = (state, condition) => {
    if(state && !condition) {
      return 'p-4 border bg-yellow-500 rounded-lg text-white hover:cursor-pointer shadow-lg flex flex-col gap-2'
    } else if (!state && condition) {
      return 'p-4 border bg-red-800 rounded-lg text-white hover:cursor-pointer shadow-lg flex flex-col gap-2'
    } else {
      return 'p-4 border bg-lime-800 rounded-lg text-white hover:cursor-pointer shadow-lg flex flex-col gap-2'
    }
  }

  const displayType = (state, condition) => {
    if(state && !condition) {
      return 'Pay at pickup'
    } else if (!state && condition) {
      return 'Scheduled order'
    } else {
      return 'Online payment'
    }
  }

  return (
    <section
      className="pl-20 pr-6"
    >
      <div
        className="pl-6 pb-4 border-b border-lime-800 mb-4 flex flex-row gap-2 justify-between text-lime-800 font-bold text-3xl"
      >
        <div className="flex flex-row gap-2">
          <h1 className="text-lime-800 font-bold text-3xl">New Orders</h1>
          {newOrders ? <p className="">{`(${newOrders.length})`}</p> : <p>{`(0)`}</p>}
        </div>
        <div className="flex flex-row gap-2 text-xs items-center">
          <p>{moment(now).tz('America/New_York').format('LLL')}</p>
          <button onClick={() => callServer()} className="flex flex-row gap-2 items-center px-2 py-1 bg-slate-400/40 rounded-md hover:bg-yellow-500"><MdRefresh className="w-5 h-5"/> refresh</button>
        </div>
      </div>
      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto pb-4"
      >
        {newOrders ? newOrders.map((order) => {
          return <motion.div
              key={order._id}
              className={itemStyles(order.isPaidAtRestaurant, order.isScheduled)}
              onClick={(e) => linkHandler(e, order._id)}
              whileHover={{scale: 1}}
              initial={{ scale: 0.95}}
            >
              <div
                className="flex flex-row justify-between text-sm"
              >
                <p>#{order.orderCount}</p>
                <p>{displayType(order.isPaidAtRestaurant, order.isScheduled)}</p>
              </div>
              <div>
                <p className="text-xl font-bold truncate">{order.customer.username}</p>
                <p className="text-xs">{order.customer.email}</p>
              </div>
              <div
                className="flex flex-row justify-between items-center"
              >
                <p className="text-xl font-bold">${order.orderTotal.toFixed(2)}</p>
                <p>{order.orderedItems.length} items</p>
              </div>
          </motion.div>
        })
        : 
          null
        }
      </div>
    </section>
  );
}
export default NewOrders;

// new orders - !Finished, !confirmed, 