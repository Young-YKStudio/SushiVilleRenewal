import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import User from "../../../../model/User";

export default async function DeleteReservation(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { reservationId, userId } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connectin to DB'
    })
  }

  try {
    let foundAccount = await User.findOne({_id: userId})
    if(foundAccount) {
      let count = 0
      let mutatingArry = foundAccount.Reservations
      mutatingArry.forEach(async (reservation, index) => {
        count += 1
        if(reservation._id === reservationId) {
          mutatingArry.splice(index, 1)
        }
        if(count === foundAccount.Rservations.length) {
          foundAccount.Reservations = mutatingArry
          await foundAccount.save()
        }
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating User'
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