import Coupon from "../../../../model/Coupon";
import User from "../../../../model/User";
import dbConnect from "../../../../util/DBConnect";
import moment from 'moment-timezone'

export default async function GenerateAccountCoupon(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { userId, couponCode, amount } = req.body

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

  let CreatedCoupon
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
    return res.staus(400).json({
      success: false,
      message: 'Error at finding duplicate'
    })
  }

  try {
    CreatedCoupon = await Coupon.create({
      couponNumber: numberedCouponNumber,
      customer: userId,
      couponCode: couponCode,
      amount: amount,
      isActive: true
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating coupon from DB'
    })
  }

  try {
    let updatingAccount = await User.findById({_id: userId})
    if(CreatedCoupon && updatingAccount) {
      updatingAccount.Coupons.push(CreatedCoupon)
      await updatingAccount.save()

      // TODO: send email to customer

      return res.status(200).json({
        success: true,
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user from DB'
    })
  }
}