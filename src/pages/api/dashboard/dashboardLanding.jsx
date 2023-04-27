import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import Reservation from "../../../../model/Reservation";
import User from "../../../../model/User";



export default async function DashboardLanding(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }
  
  let foundOrder = null
  let foundReservation = null
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }
  
  const findAllOrders = async () => {
    try {
      foundOrder = await NewOrder.find().populate({'path': 'customer', model: User}).sort({createdAt: -1})
      return foundOrder
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at getting orders from DB'
      })
    }
  }

  const findAllReservations = async () => {
    try {
      foundReservation = await Reservation.find().populate({'path': 'customer', model: User}).sort({createdAt: -1})
      return foundReservation
    } catch (error) {
      return res.status(400).json({
        success: false, 
        message: 'Error at getting reservations from DB'
      })
    }
  }

  await findAllOrders()
  await findAllReservations()

  const filterdOrder = (foundOrder) => {
    if(foundOrder.length > 0) {
      let filteredOrders = foundOrder.filter(orders => orders.isPlaced && !orders.isFinished)
      return filteredOrders
    } else {
      return []
    }
  }

  const filteredReservation = (foundReservation) => {
    if(foundReservation.length > 0) {
      let filteredReservations = foundReservation.filter(reservation => !reservation.isShowedUp && !reservation.isDenied)
      return filteredReservations
    } else {
      return []
    }
  }

  res.status(200).json({
    success: true,
    orders: filterdOrder(foundOrder),
    reservations: filteredReservation(foundReservation)
  })
}