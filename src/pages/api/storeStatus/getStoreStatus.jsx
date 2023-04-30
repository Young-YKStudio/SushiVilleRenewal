import NewStoreStatus from "../../../../model/Storestatus"
import dbConnect from "../../../../util/DBConnect"

export default async function GetStoreStatus(req, res) {
  if(req.method !== 'GET') {
    return res.status(303).json({ error: 'reqeust is not PUT or POST' })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let foundStatus = null

  try {
    foundStatus = await NewStoreStatus.find({})
    return res.status(200).json({
      success: true,
      store: foundStatus[0]
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at getting store status from DB'
    })
  }
}