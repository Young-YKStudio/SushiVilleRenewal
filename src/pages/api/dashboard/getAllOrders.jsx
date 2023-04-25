import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from '../../../../model/User';

export default async function DashboardGetAllOrders(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  let foundOrder = null

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }

  const findAllOrders = async () => {
    try {
      foundOrder = await NewOrder.find().populate({'path': 'customer', model: User}).sort({createdAt: -1})
      return foundOrder
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at getting orders from DB'
      })
    }
  }

  await findAllOrders()

  res.status(200).json({
    success: true,
    orders: foundOrder,
  })
}