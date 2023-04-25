import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from "../../../../model/User";
import Menu from "../../../../model/Menu";

export default async function RegisterOrder(req, res) {
  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { orderedItems, customer, comments, isAgreed, isScheduled, isPayAtRestaurant, grandTotal, addOnTotal, supplementTotal, taxRate, orderTotal } = req.body

  let foundUser = null
  let createdOrder = null
  let lastOrderCount = null

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
    foundUser = await User.findOne({_id: customer._id})

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

  const createOrder = async () => {
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
        orderCount: lastOrderCount + 1
      })

      return createdOrder
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at creating order on DB'
      })
    }
  }

  const addOrderToUser = async () => {
    try {
      await foundUser.Orders.push(createdOrder._id)
      await foundUser.save()
      return foundUser
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at updating user date on DB'
      })
    }
  }

  const addNumberOnMenu = async () => {
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

  await findLastOrder()
  await createOrder()
  await addOrderToUser()
  await addNumberOnMenu()

  return res.status(200).json({
    success: true,
    message: 'Reqeusted order successfully registered',
    order: createdOrder
  })
}