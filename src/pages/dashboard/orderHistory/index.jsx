import axios from 'axios'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux';
import Router from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const OrderHistoryDashboard = (props) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[84%] w-full'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[90%] w-full'
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

  const displayType2 = (isFinished, isConfirmed, isPlaced, isReady) => {
    // pending (!isPlaced)
    if(!isFinished && !isConfirmed && !isPlaced && !isReady) {
      return 'Pending...'
    }
    // new order (isPlaced, !isConfirmed)
    if(!isFinished && !isConfirmed && isPlaced && !isReady) {
      return 'New Order'
    }
    // confirmed (isPlaced, isConfirmed)
    if(!isFinished && isConfirmed && isPlaced && !isReady) {
      return 'Confirmed Order'
    }
    // ready (isPlaced, isConfirmed, isReady)
    if(!isFinished && isConfirmed && isPlaced && isReady) {
      return 'Ready Order'
    }    
    // finished (isFinished, isConfirmed, isPlaced, isReady)
    if(isFinished && isConfirmed && isPlaced && isReady) {
      return 'Fulfilled Order'
    }
  }

  const buttonHandler = (e, id) => {
    Router.push(`/dashboard/order/${id}`)
  }

  return (
    <section
      className={styleDistributor(isVerticalMenuNarrow)}
    >
      <div className='border-b border-lime-800 pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Order History</h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 h-[92%] overflow-auto">
        {/* <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-lime-800">Orders</h1>
            <p className="pt-2 text-sm text-gray-700">
              List of all orders, and update.
            </p>
          </div>
        </div> */}
        <div className="pt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Customer Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Order Number
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Payment Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Order Total
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Orderd Date
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Orderd Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Orderd Type
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                    >
                      <span className="sr-only">Button</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.orders && props.orders.map((order, personIdx) => (
                    <tr key={order._id}>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {order.customer.username}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {order.orderCount}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                        )}
                      >
                        {order.isPaid ? 'Paid' : 'Not Paid'}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        ${order.grandTotal.toFixed(2)}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {moment(order.createdAt).tz('America/New_York').format('LLL')}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {displayType(order.isPaidAtRestaurant, order.isScheduled)}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {displayType2(order.isFinished, order.isConfirmed, order.isPlaced, order.isReady)}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.orders.length - 1 ? 'border-b border-gray-200' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                        )}
                      >
                        <button
                          className='text-lime-800 hover:text-yellow-600'
                          onClick={(e) => buttonHandler(e, order._id)}
                        >
                          View / Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default OrderHistoryDashboard;

export async function getServerSideProps() {
  // call API to get products
  let data = null
  const request = await axios.get(`${process.env.APP_URL}/api/dashboard/getAllOrders`)
  if(request.data.success) {
    data = request.data.orders
  }
  if(data) {
    return {props: {orders: data}}
  }
}