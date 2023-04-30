import NewStoreStatus from "../../../../model/Storestatus"
import dbConnect from "../../../../util/DBConnect"

export default async function UpdateStoreOpenClose(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }
  
  const { status } = req.body
  
  const id = '644e0bec433f7bed65f6e30e'

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    let updatedStatus = await NewStoreStatus.findByIdAndUpdate({_id: id}, {
      isOpenStoreAuto: status
    })
    return res.status(200).json({
      success: true,
      status: updatedStatus
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating status from DB'
    })
  }
}