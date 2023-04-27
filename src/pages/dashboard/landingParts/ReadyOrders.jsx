import Router from "next/router"
import { motion } from 'framer-motion'

const ReadyOrders = ({orders}) => {

  let readyOrders

  if(orders) {
    readyOrders = orders.filter(order => !order.isFinished && order.isConfirmed && order.isReady)
  }

  const linkHandler = (e, id) => {
    e.preventDefault()
    Router.push(`/dashboard/order/${id}`)
  }

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
      className="pl-20 pr-6 pt-4"
    >
      <div
        className="pl-6 pb-4 border-b border-lime-800 mb-4 flex flex-row gap-2 items-center text-lime-800 font-bold text-3xl"
      >
        <h1 className="text-lime-800 font-bold text-3xl">Ready Orders</h1>
        {readyOrders ? <p className="">{`(${readyOrders.length})`}</p> : <p>{`(0)`}</p>}
      </div>
      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto pb-4"
      >
        {readyOrders ? readyOrders.map((order) => {
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
export default ReadyOrders;