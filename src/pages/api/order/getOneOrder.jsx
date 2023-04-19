import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";

export default async function GetOneOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  console.log(req.body)

  let foundOrder = null

  const { id } = req.body

  if(!id) {
    return res.status(400).json({
      success: false, 
      message: 'ID is missing'
    })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error at connectin to DB'
    })
  }

  const findOrder = async () => {
    try {
      foundOrder = await NewOrder.findById({_id: id})
      return foundOrder
    } catch (error) {
      return res.status(400).json({
        success: false, 
        message: 'Error found at finding order on DB'
      })
    }
  }

  await findOrder()

  return res.status(200).json({
    success: true,
    message: 'success',
    order: foundOrder
  })
}