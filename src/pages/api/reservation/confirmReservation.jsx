import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import moment from 'moment-timezone'
import { reservationConfirmEmail } from "./emails";
import { sendEmail } from "../../../../util/sendEmail";

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

  let foundReservation

  try {
    foundReservation = await Reservation.findOne({_id: reservationId})
  } catch (error) {
    return res.status(400).json({
      succss: false,
      message: 'Error at finding reservation from DB'
    })
  }

  try {
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: foundReservation.email,
      subject: `Reservation confirmation, ${moment(foundReservation.reserveDate).tz('America/New_York').format('LLL')} EST for ${foundReservation.name}`,
      html: reservationConfirmEmail(foundReservation.name, foundReservation.contact, foundReservation.email, foundReservation.reserveDate, foundReservation.totalParty, foundReservation.comments)
    }
    await sendEmail(emailOptions)
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at sending out an email'
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

  return res.status(200).json({
    success: true
  })
}