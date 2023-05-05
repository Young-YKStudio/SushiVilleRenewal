import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import Coupon from "../../../../model/Coupon";

export default async function DeleteAccountCoupon(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { coupon, user } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let foundAccount
  let foundCoupon

  try {
    foundAccount = await User.findById({_id: user}).populate({'path': 'Coupons', model: Coupon})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at find account from DB'
    })
  }

  try {
    foundCoupon = await Coupon.findById({_id: coupon})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at find coupon from DB'
    })
  }

  try {
    let filteredCoupon = foundAccount.Coupons.filter(coupon =>  coupon.couponCode !== foundCoupon.couponCode)
    foundAccount.Coupons = filteredCoupon
    await foundAccount.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user on DB'
    })
  }

  try {
    await Coupon.findByIdAndDelete({_id: coupon})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at deleting coupon on DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}