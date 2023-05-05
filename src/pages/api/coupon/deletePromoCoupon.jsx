import dbConnect from "../../../../util/DBConnect";
import Coupon from "../../../../model/Coupon";

export default async function DeletePromoCoupon(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { coupon } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    await Coupon.findByIdAndDelete({_id: coupon})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at deleting coupon from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}