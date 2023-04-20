import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import User from "../../../../model/User";

export default async function GetOneRervation(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { id } = req.body

  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'No ID was entered'
    })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connectin to DB'
    })
  }

  let foundReservation = null

  const findReservation = async () => {
    try {
      foundReservation = await Reservation.findOne({_id: id}).populate({'path': 'customer', model: User})
      return res.status(200).json({
        success: true,
        reservation: foundReservation
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at finding reservation from DB'
      })
    }
  }

  findReservation()
}