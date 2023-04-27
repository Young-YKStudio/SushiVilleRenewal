import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";

export default async function ConfirmOrder(req, res) {
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

  try {
    updatingOrder = await NewOrder.findByIdAndUpdate({_id: orderId}, {isConfirmed: true})
    return res.status(200).json({
      success: true,
      order: updatingOrder
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating order from DB'
    })
  }
}