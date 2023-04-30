import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import NewOrder from "../../../../model/Order";
import Reservation from "../../../../model/Reservation";

export default async function GetDashboardAccount(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id } = req.body

  let foundAccount = null

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error at connecting to DB'
    })
  }

  try {
    foundAccount = await User.findOne({_id: id}).populate({'path': 'Orders', role: NewOrder}).populate({'path': 'Reservations', role: Reservation})
    return res.status(200).json({
      success: true,
      account: foundAccount
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at getting account from DB'
    })
  }
}