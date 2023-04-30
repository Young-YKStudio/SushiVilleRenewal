import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import NewOrder from "../../../../model/Order";
import Reservation from "../../../../model/Reservation";

export default async function DeleteAccount(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    let allOrder = await NewOrder.find({})
    let count = 0
    let foundOrderId = null
    allOrder.forEach(async (order, index) => {
      count += 1
      if(order.customer = id) {
        foundOrderId = order._id
      }
      if(count === allOrder.length) {
        await NewOrder.findByIdAndDelete({_id: foundOrderId})
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found updating order'
    })
  }

  try {
    let allReservation = await Reservation.find({})
    let count = 0
    let foundReservationId = null
    allReservation.forEach(async (reservation, index) => {
      count += 1
      if(reservation.customer = id) {
        foundReservationId = reservation._id
      }
      if(count === allReservation.length) {
        await Reservation.findByIdAndDelete({_id: foundReservationId})
      }
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found updating reservation'
    })
  }

  try {
    await User.findByIdAndDelete({_id: id})
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at deleting account from DB'
    })
  }
}