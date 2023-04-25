import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import User from '../../../../model/User';

export default async function DashboardGetAllReservations(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  let foundReservations = null

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }

  const findAllReservations = async () => {
    try {
      foundReservations = await Reservation.find().populate({'path': 'customer', model: User}).sort({createdAt: -1})
      return foundReservations
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at getting reservations from DB'
      })
    }
  }

  await findAllReservations()

  res.status(200).json({
    success: true,
    reservations: foundReservations,
  })
}