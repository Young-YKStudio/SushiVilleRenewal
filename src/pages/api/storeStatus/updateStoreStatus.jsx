import NewStoreStatus from "../../../../model/Storestatus"
import dbConnect from "../../../../util/DBConnect"

export default async function UpdateStoreStatus(req, res) {
  if(req.method === 'GET' || req.method === 'DELETE') {
    return res.status(303).json({ error: 'reqeust is not PUT or POST' })
  }

  if(req.method === 'PUT') {
    try {
      await dbConnect()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at connecting to DB'
      })
    }
  }

  if(req.method === 'POST') {
    try {
      await dbConnect()
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at connecting to DB'
      })
    }

    try {
      let initialStore = await NewStoreStatus.create({
        isStoreOpen: false,
        isOpenStoreAuto: false,
      })
      return res.status(200).json({
        success: true,
        store: initialStore
      })
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error when creating store status from DB'
      })
    }
  }
}