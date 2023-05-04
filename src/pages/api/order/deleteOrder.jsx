import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from "../../../../model/User";

export default async function DeleteOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { orderId, userId } = req.body

  try {
    dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  // ????
  const findUserAndUpdate = async () => {
    let foundUser = null
    let loopCount = 0
    try {
      foundUser = await User.findById({_id: userId}).populate({'path': 'Orders', model: NewOrder})
      let foundOrder = await NewOrder.findById({_id: orderId})
      if(foundUser && foundOrder) {
        await foundUser.Orders.forEach( async (order, index) => {
          loopCount += 1
          if(order.orderCount == foundOrder.orderCount) {
            foundUser.Orders.splice(index, 1)
            await foundUser.save()
          }
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Error at updating user from DB"
      })
    }
  }
  
  const findOrderAndDelete = async () => {
    try {
      await NewOrder.findByIdAndDelete({_id: orderId}) 
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at deleting order from DB'
      })
    }
  }

  await findUserAndUpdate()
  await findOrderAndDelete()

  return res.status(200).json({
    success: true,
  })
}