import dbConnect from "../../../../util/DBConnect";
import Coupon from "../../../../model/Coupon";

export default async function ToggleAccountStatus(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { coupon, status, user } = req.body

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
    foundCoupon = await Coupon.findByIdAndUpdate({_id: coupon}, {
      isActive: !status,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at find coupon from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}