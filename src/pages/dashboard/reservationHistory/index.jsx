import axios from 'axios'
import moment from 'moment-timezone'
import { useSelector } from 'react-redux';
import Router from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ReservationHistoryDashboard = (props) => {

  const { isVerticalMenuNarrow } = useSelector((state) => state.cart)

  const styleDistributor = (state) => {
    if(!state) {
      return 'p-8 pl-20 max-w-[65vw] md:max-w-[80%] lg:max-w-[86%]'
    } else {
      return 'p-8 pl-20 max-w-[85vw] md:max-w-[80%] lg:max-w-[90%]'
    }
  }

  const displayType = (isConfirmed, isDenied, isShowedUp) => {
    if(isDenied) {
      return 'Denied'
    }
    if(!isDenied && isConfirmed && !isShowedUp) {
      return 'Confirmed'
    }
    if(!isDenied && isConfirmed && isShowedUp) {
      return 'Fulfilled'
    }
    if(!isDenied && !isConfirmed && !isShowedUp) {
      return 'New'
    }
  }

  const buttonHandler = (e, id) => {
    Router.push(`/dashboard/reservation/${id}`)
  }

  return (
    <section className={styleDistributor(isVerticalMenuNarrow)}>
      <div className='border-b border-lime-800 w-full pb-4 text-lime-800'>
        <h1 className='font-bold text-3xl pl-6'>Reservation History</h1>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 h-[92%] overflow-auto">
      <div className="pt-8 flow-root">
          <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle">
              <table className="min-w-full border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Reserved Name
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Party#
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Reserved Date
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter sm:table-cell"
                    >
                      Contact Email
                    </th>
                    <th
                      scope="col"
                      className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter lg:table-cell"
                    >
                      Account Name
                    </th>

                    <th
                      scope="col"
                      className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-lime-800 backdrop-blur backdrop-filter"
                    >
                      Comments
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
                  {props.reservations && props.reservations.map((reservation, personIdx) => (
                    <tr key={reservation._id}>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {/* isConfirmed, isDenied, isShowedUp */}
                        {displayType(reservation.isConfirmed, reservation.isDenied, reservation.isShowedUp)}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {reservation.name}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {reservation.totalParty}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {moment(reservation.reservedDate).tz('America/New_York').format('LLL')}
                      </td>

                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell'
                        )}
                      >
                        {reservation.contact}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                        )}
                      >
                        {reservation.email}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {reservation.customer.username}
                      </td>

                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'whitespace-nowrap px-3 py-4 text-sm text-gray-500'
                        )}
                      >
                        {reservation.comments === '' ? 'No Comment' : 'Commented'}
                      </td>
                      <td
                        className={classNames(
                          personIdx !== props.reservations.length - 1 ? 'border-b border-gray-200' : '',
                          'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                        )}
                      >
                        <button
                          className='text-lime-800 hover:text-yellow-600'
                          onClick={(e) => buttonHandler(e, reservation._id)}
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
export default ReservationHistoryDashboard;

export async function getServerSideProps() {
  // call API to get products
  let data = null
  const request = await axios.get(`${process.env.APP_URL}/api/dashboard/getAllReservations`)
  if(request.data.success) {
    data = request.data.reservations
  }
  if(data) {
    return {props: {reservations: data}}
  }
}

// reserved name, contact, email, customer
// reserve Date/Time
// reservation status
// total Party
// comments