import NewStoreStatus from "../../../../model/Storestatus";
import dbConnect from "../../../../util/DBConnect";

export default async function DeleteOffDate(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const { date } = req.body
  const id = '644e0bec433f7bed65f6e30e'

  try { 
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let tempArry

  try {
    let foundStatus = await NewStoreStatus.findById({_id: id})
    tempArry = foundStatus.offDays.filter(day => day !== date)
    foundStatus.offDays = tempArry
    await foundStatus.save()
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating offdays on DB'
    })
  }
}