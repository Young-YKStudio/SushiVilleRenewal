import NewOrder from "../../../../model/Order";
import dbConnect from "../../../../util/DBConnect";

export default async function PlacePayAtRestaurantOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }
  
  const { id } = req.body
  
  let foundOrder = null
  
  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing required information'
    })
  }
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }
  
  const findOrderAndUpdate = async () => {
    try {
      foundOrder = await NewOrder.findByIdAndUpdate({_id: id}, {isPlaced: true})
      return res.status(200).json({
        success: true,
        order: foundOrder
      })

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at updating order from DB'
      })
    }
  }
  
  await findOrderAndUpdate()
}