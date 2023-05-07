import Coupon from "../../../../model/Coupon";
import User from "../../../../model/User";
import dbConnect from "../../../../util/DBConnect";
import moment from 'moment-timezone'
import { PromoCouponEmail } from "./emails";
import { sendEmail } from "../../../../util/sendEmail";

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
  let updatingAccount

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
    updatingAccount = await User.findById({_id: userId})
    if(CreatedCoupon && updatingAccount) {
      updatingAccount.Coupons.push(CreatedCoupon)
      await updatingAccount.save()
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user from DB'
    })
  }

  try {
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: updatingAccount.email,
      subject: 'You have received a coupon from Sushiville.',
      html: PromoCouponEmail(CreatedCoupon.couponCode, CreatedCoupon.amount)
    }

    await sendEmail(emailOptions)
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at sending out an email'
    })
  }
  
  return res.status(200).json({
    success: true,
  })
}