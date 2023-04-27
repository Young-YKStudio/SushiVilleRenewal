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

  
  const findUserAndUpdate = async () => {
    let foundUser = null
    let loopCount = 0
    try {
      foundUser = await User.findById({_id: userId})
      foundUser && foundUser.Orders.forEach((order, i) => {
        if(order = orderId) {
          foundUser.Orders.splice(i, 1)
          loopCount += 1
          if(loopCount === i) {
            foundUser.save()
          }
        }
      })
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