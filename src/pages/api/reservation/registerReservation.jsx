import dbConnect from "../../../../util/DBConnect";
import Reservation from "../../../../model/Reservation";
import User from "../../../../model/User";

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

  const registerReservation = async () => {
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

      if(createdReservation) {
        try {
          let foundAccount = await User.findOne({_id: customer})
          foundAccount.Reservations.push(createdReservation)
          await foundAccount.save()
        } catch (error) {
          return res.status(400).json({
            success: false,
            message: 'Error found at updating user'
          })
        }
        return res.status(200).json({
          success: true,
          message: 'Registered reservation',
          reservation: createdReservation
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at registering reservation on DB'
      })
    }
  }

  registerReservation()
}