import dbConnect from "../../../../util/DBConnect";
import Coupon from "../../../../model/Coupon";
import User from "../../../../model/User";

export default async function CheckCoupon(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { coupon, account } = req.body

  if(!coupon) {
    return res.status(400).json({
      success: false,
      message: 'No coupon received from client'
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
  
  let foundCoupon 
  
  try {
    foundCoupon = await Coupon.find({couponCode: coupon}).populate({'path': 'couponUsedAccts', model: User})
    foundCoupon = foundCoupon[0]
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at finding coupon from DB'
    })
  }

  

  if(!foundCoupon) {
    return res.status(303).json({
      success: false,
      message: 'We can\'t find your coupon. Please check your coupon again.'
    })
  }

  if(!foundCoupon.isPromo && foundCoupon.isUsed) {
    return res.status(303).json({
      success: false,
      message: 'Entered coupon has already used.'
    })
  }

  if(!foundCoupon.isActive) {
    return res.status(303).json({
      success: false,
      message: 'Entered coupon is invalid.'
    })
  }

  if(foundCoupon.isPromo) {
    let foundUser = foundCoupon.couponUsedAccts.find(user => user._id == account._id)
    if (foundUser) {
      return res.status(303).json({
        success: false,
        message: 'You can\'t use this coupon anymore.'
      })
    }
  }

  
  return res.status(200).json({
    success: true,
    coupon: foundCoupon
  })

}