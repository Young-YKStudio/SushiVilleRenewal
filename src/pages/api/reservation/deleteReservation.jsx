import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";

export default async function DeleteReservation(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { reservationId } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connectin to DB'
    })
  }

  try {
    await Reservation.findByIdAndDelete({_id: reservationId})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at deleting reservation from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}