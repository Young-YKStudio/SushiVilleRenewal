import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import User from "../../../../model/User";
import { sendEmail } from "../../../../util/sendEmail";
import { reservationRequestEmail } from "./emails";
import moment from 'moment-timezone'

export default async function RegisterReservation(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { name, totalParty, comments, email, contact, customer, reserveDate } = req.body

  if(!name || !totalParty || !email || !contact || !customer || !reserveDate) {
    return res.status(400).json({
      success: false,
      message: 'missing required information'
    })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let createdReservation = null
  let foundAccount

  // validate receipian email first
  try {
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: email,
      subject: `Reservation request, ${moment(reserveDate).tz('America/New_York').format('LLL')} EST for ${name}`,
      html: reservationRequestEmail(name, contact, email, reserveDate, totalParty, comments)
    }

    await sendEmail(emailOptions)
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at sending out an email'
    })
  }

  try {
    createdReservation = await Reservation.create({
      name: name,
      totalParty: totalParty,
      comments: comments,
      email: email,
      contact: contact,
      customer: customer,
      reserveDate: reserveDate
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating reservation from DB'
    })
  }
  
  if(createdReservation) {
    try {
      foundAccount = await User.findOne({_id: customer})
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding user from DB'
      })
    }
  }
  
  try {
    foundAccount.Reservations.push(createdReservation)
    await foundAccount.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user from DB'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Registered reservation',
    reservation: createdReservation
  })
}