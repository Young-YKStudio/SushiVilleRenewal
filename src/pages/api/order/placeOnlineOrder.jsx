import NewOrder from "../../../../model/Order";
import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import Coupon from "../../../../model/Coupon";
import { sendEmail } from "../../../../util/sendEmail";
import { NewOrderOnlinePaymentEmail, NewOrderOnlinePaymentEmailScheduled } from "./emails";

export default async function PlaceOnlineOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { orderId, isPlaced } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  if(!orderId) {
    return res.status(400).json({
      success: false,
      message: 'No orderId received'
    })
  }

  
  let updatedOrder
  let foundUser
  let foundCoupon
  
  try {
    updatedOrder = await NewOrder.findOne({_id: orderId}).populate({'path': 'customer', model: User})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at finding order from DB'
    })
  }
  
  foundUser = updatedOrder.customer

  if(updatedOrder.isPlaced) {
    return res.status(200).json({
      success: true
    })
  }

  if(updatedOrder.coupon) {
    try {
      foundCoupon = await Coupon.findOne({_id: updatedOrder.coupon})
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding coupon'
      })
    }
  }

  if(updatedOrder.coupon && foundCoupon.isPromo) {
    try {
      foundCoupon.couponUsedAccts.push(foundUser._id)
      await foundCoupon.save()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at updating coupon'
      })
    } 
  }

  if(updatedOrder.coupon && !foundCoupon.isPromo) {
    try {
      foundCoupon.isAcitve = false
      foundCoupon.isUsed = true
      await foundCoupon.save()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at updating coupon'
      })
    } 
  }
  
  try {
    updatedOrder.isPlaced = true
    await updatedOrder.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating order from DB'
    })
  }
  
  try {
    let tempName = foundUser.username ? foundUser.username : foundUser.tempName
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: foundUser.email,
      subject: `Sushiville order confirmation, #${updatedOrder.orderCount}`,
      html: updatedOrder.isScheduled ? NewOrderOnlinePaymentEmailScheduled(tempName, updatedOrder.orderCount, updatedOrder.createdAt, updatedOrder.grandTotal, foundUser.email, updatedOrder.isScheduled) : NewOrderOnlinePaymentEmail(tempName, updatedOrder.orderCount, updatedOrder.createdAt, updatedOrder.grandTotal, foundUser.email)
    }
    await sendEmail(emailOptions)
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at sending out email'
    })
  }

  return res.status(200).json({
    success: true
  })
}