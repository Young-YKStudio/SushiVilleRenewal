import dbConnect from "../../../../util/DBConnect";
import Coupon from "../../../../model/Coupon";

export default async function ToggleIsActive(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { coupon, status } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at Connecting to DB'
    })
  }


  try {
    await Coupon.findByIdAndUpdate({_id: coupon}, {
      isActive: !status
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating coupon from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}
