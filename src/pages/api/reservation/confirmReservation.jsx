import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";

export default async function ConfirmReservation(req, res) {
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
    await Reservation.findByIdAndUpdate({_id: reservationId}, {isConfirmed: true })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating reservation from DB'
    })
  }

  // send email

  return res.status(200).json({
    success: true
  })
}