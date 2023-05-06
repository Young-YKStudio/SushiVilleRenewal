import Coupon from "../../../../model/Coupon";
import dbConnect from "../../../../util/DBConnect";
import moment from 'moment-timezone'

export default async function GeneratePromoCoupon(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { couponCode, amount } = req.body

  let date = new Date()
  let formattedDate = moment(date).format('MMDDYYYY')
  let combinedDateWith = formattedDate + String(amount)
  let numberedCouponNumber = Number(combinedDateWith)

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let duplicateCoupon

  try {
    let allCoupon = await Coupon.find({})
    duplicateCoupon = allCoupon.find(coupon => coupon.couponCode == couponCode)
    if(duplicateCoupon) {
      return res.status(300).json({
        success: false,
        message: 'Coupon Code already exist'
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at finding duplicate'
    })
  }

  try {
    let createdCoupon = await Coupon.create({
      couponNumber: numberedCouponNumber,
      couponCode: couponCode,
      amount: amount,
      isPromo: true,
      isActive: true
    })
    return res.status(200).json({
      success: true,
      coupon: createdCoupon
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at generating coupon from DB'
    })
  }

}