import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import NewOrder from "../../../../model/Order";
import Reservation from "../../../../model/Reservation";
import Menu from "../../../../model/Menu";
import Coupon from "../../../../model/Coupon";

export default async function FindAccount(req, res) {
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

  const findAccount = async () => {
    try {
      foundAccount = await User.findOne({_id: id}).populate({"path": 'Orders', model: NewOrder}).populate({'path': 'Reservations', model: Reservation}).populate({'path': 'FavoriteItems', model: Menu}).populate({'path': 'Coupons', model: Coupon})
      if(foundAccount) {
        return res.status(200).json({
          success: true,
          message: 'user found',
          user: foundAccount
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'user not found in DB'
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding the account at DB'
      })
    }
  }

  await findAccount()
}