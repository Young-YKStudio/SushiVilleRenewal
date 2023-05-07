import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from "../../../../model/User";
import Menu from "../../../../model/Menu";
import Coupon from "../../../../model/Coupon";
import { sendEmail } from "../../../../util/sendEmail";
import { NewOrderPayAtResEmail } from "./emails";

export default async function RegisterOrder(req, res) {
  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { orderedItems, customer, comments, isAgreed, isScheduled, isPayAtRestaurant, grandTotal, addOnTotal, supplementTotal, taxRate, orderTotal, coupon } = req.body

  let foundUser = null
  let createdOrder = null
  let lastOrderCount = null
  let foundCoupon = null

  try {
    dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  const Validation = async (orderedItems, customer, isAgreed, isScheduled, isPayAtRestaurant, grandTotal, addOnTotal, supplementTotal, taxRate, orderTotal) => {
    // orderedItems
    if(!orderedItems) {
      return { 
        error: 'Ordered Item is missing',
        message: 'Ordered items are missing, please check/try again.'
      }
    }

    // customer
    foundUser = await User.findOne({_id: customer._id}).populate({'path': 'Coupons', model: Coupon})

    if(!foundUser) {
      return {
        error: 'User not found',
        message: 'User not found in DB'
      }
    }

    if(!isAgreed) {
      return {
        error: 'order is not agreed to TOC',
        message: 'Request is not agreed to the terms of conditions'
      }
    }

    if(!grandTotal && !addOnTotal && !supplementTotal && !taxRate && !orderTotal) {
      return {
        error: 'order values are missing',
        message: 'Order values are missing in the request. Please try again'
      }
    }

    if(isScheduled || isPayAtRestaurant) {
      if(isScheduled && isPayAtRestaurant) {
        return {
          error: 'Scheduled order only pay online',
          message: 'Scheduled orders are not allowed for pay on pickups'
        }
      }
    }
    return null
  }

  const errorMessage = await Validation(orderedItems, customer, isAgreed, isScheduled, isPayAtRestaurant, grandTotal, addOnTotal, supplementTotal, taxRate, orderTotal)

  if(!!errorMessage) {
    return res.status(400).json({
      success: false,
      error: errorMessage.error,
      message: errorMessage.message
    })
  }

  if(coupon.couponCode !== '') {
    try {
      foundCoupon = await Coupon.find({couponCode: coupon.couponCode})
      foundCoupon = foundCoupon[0]
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding coupon'
      })
    }
  }

  if(coupon.couponCode !== '' && foundCoupon) {
    if(foundCoupon.isPromo) {
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
    if(!foundCoupon.isPromo) {
      try {
        foundCoupon.isActive = false
        foundCoupon.isUsed = true
        await foundCoupon.save()
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error at updating coupon'
        })
      }
    }
  }

  const findLastOrder = async () => {
    try {
      let lastOrder = await NewOrder.find().sort({createdAt: -1}).limit(1)
      if(lastOrder) {
        return lastOrderCount = lastOrder[0].orderCount
      } else {
        return res.status(400).json({
          success: false,
          message: 'Error at finding last order number from DB'
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding last order number from DB'
      })
    }
  }

  await findLastOrder()

  try {
    createdOrder = await NewOrder.create({
      orderedItems: orderedItems,
      customer: customer._id,
      comments: comments,
      isAgreed: isAgreed,
      isScheduled: isScheduled,
      isPaidAtRestaurant: isPayAtRestaurant,
      grandTotal: grandTotal,
      addOnTotal: addOnTotal,
      supplementTotal: supplementTotal,
      taxRate: taxRate,
      orderTotal: orderTotal,
      orderCount: lastOrderCount + 1,
      coupon: foundCoupon ? foundCoupon._id : null
    })

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating order on DB'
    })
  }
  
  try {
    await foundUser.Orders.push(createdOrder._id)
    await foundUser.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user date on DB'
    })
  }

  if(createdOrder) {
    createdOrder.orderedItems.map(async (orderItem) => {
      try {
        let foundMenu = await Menu.find({_id: orderItem.product})
        if(foundMenu) {
          foundMenu[0].ordered += 1
          foundMenu[0].save()
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error at updating menu counts'
        })
      }
    })
  }

  // send Email

  try {
    let tempName = foundUser.username ? foundUser.username : foundUser.name
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: foundUser.email,
      subject: `Sushiville order confirmation, #${createdOrder.orderCount}`,
      html: NewOrderPayAtResEmail(tempName, createdOrder.orderCount, createdOrder.createdAt, createdOrder.grandTotal, foundUser.email)
    }
    await sendEmail(emailOptions)
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error at sending out email'
    })
  }

  return res.status(200).json({
    success: true,
    message: 'Reqeusted order successfully registered',
    order: createdOrder
  })
}