import dbConnect from "../../../../util/DBConnect";
import NewOrder from "../../../../model/Order";
import User from "../../../../model/User";
import Menu from "../../../../model/Menu";
import Coupon from '../../../../model/Coupon'

export default async function GetOneOrder(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  let foundOrder = null
  let tries = 0

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
      foundOrder = await NewOrder.findById({_id: id}).populate({path: 'customer', model: User}).populate({'path': 'coupon', model: Coupon})
      return foundOrder
    } catch (error) {
      return res.status(400).json({
        success: false, 
        message: 'Error found at finding order on DB'
      })
    }
  }

  const getOrderedItems = async () => {

    let tempArry = []
    await foundOrder.orderedItems.map(async (item) => {
      try {
        let foundItem = await Menu.find({_id: item.product})
        if(foundItem) {
          let template = {
            addOns: item.addOns,
            product: foundItem,
            qty: item.qty
          }
          tempArry.push(template)
          tries += 1
          if(foundOrder.orderedItems.length === tries && tempArry.length > 0) {
            return res.status(200).json({
              success: true,
              message: 'success',
              order: foundOrder,
              items: tempArry
            })
          }
        }
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error at finding Menu from DB'
        })
      }
    })
  }
  
  await findOrder()
  await getOrderedItems()
}