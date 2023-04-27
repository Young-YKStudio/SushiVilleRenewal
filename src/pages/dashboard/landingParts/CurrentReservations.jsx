import Router from "next/router"
import { motion } from 'framer-motion'
import moment from 'moment-timezone'

const CurrentReservations = ({reservations}) => {

  let currentReservations

  if(reservations) {
    currentReservations = reservations.filter(reservation => reservation.isConfirmed)
  }

  const linkHandler = (e, id) => {
    e.preventDefault()
    Router.push(`/dashboard/reservation/${id}`)
  }

  return (
    <section
      className="pl-20 pr-6 pt-4"
    >
      <div
        className="pl-6 pb-4 border-b border-lime-800 mb-4 flex flex-row gap-2 items-center text-lime-800 font-bold text-3xl"
      >
        <h1 className="text-lime-800 font-bold text-3xl">Current Reservations</h1>
        {currentReservations ? <p className="">{`(${currentReservations.length})`}</p> : <p>{`(0)`}</p>}
      </div>

      <div
        className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 overflow-x-auto pb-4"
      >
        {currentReservations && currentReservations.map((reservation) => {
          return <motion.div
            key={reservation._id}
            onClick={(e) => linkHandler(e, reservation._id)}
            whileHover={{scale: 1}}
            initial={{ scale: 0.95}}
            className="p-4 border bg-fuchsia-700 rounded-lg text-white hover:cursor-pointer shadow-lg flex flex-col gap-2"
          >
            {/* name */}
            <div>
              <p className="font-bold">{reservation.name}</p>
            </div>
            {/* reserved date */}
            <div className="flex flex-row justify-between">
              <p>{moment(reservation.reserveDate).tz('America/New_York').format('L')}</p>
              <p className="font-bold text-2xl">{moment(reservation.reserveDate).tz('America/New_York').format('LT')}</p>
            </div>
            {/* partyNumber */}
            <div className="flex flex-row gap-1 items-center">
              <p className="font-bold text-xl">{reservation.totalParty}</p>
              <p>ppl</p>
            </div>
          </motion.div>
        })}
      </div>
    </section>
  );
}
export default CurrentReservations;