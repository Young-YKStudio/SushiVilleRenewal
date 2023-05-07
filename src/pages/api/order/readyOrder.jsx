import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from "../../../../model/User";
import { sendEmail } from "../../../../util/sendEmail";
import { ReadyOrderEmail } from "./emails";

export default async function ReadyOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { orderId } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let updatingOrder
  let foundUser

  try {
    updatingOrder = await NewOrder.findOne({_id: orderId}).populate({'path': 'customer', model: User})
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error at finding order from DB'
    })
  }

  foundUser = updatingOrder.customer

  try {
    await NewOrder.findByIdAndUpdate({_id: orderId}, {isReady: true})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating order from DB'
    })
  }

  try {
    let tempName = foundUser.username ? foundUser.username : foundUser.name
    let emailOptions = {
      from: 'service@sushivilleny.com',
      to: foundUser.email,
      subject: `Sushiville order, Your order is Ready, #${updatingOrder.orderCount}`,
      html: ReadyOrderEmail(tempName, updatingOrder.orderCount, updatingOrder.createdAt, updatingOrder.updatedAt, updatingOrder.grandTotal, foundUser.email)
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