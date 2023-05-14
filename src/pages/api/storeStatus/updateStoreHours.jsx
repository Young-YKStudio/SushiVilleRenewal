import NewStoreStatus from "../../../../model/Storestatus"
import dbConnect from "../../../../util/DBConnect"

export default async function UpdateStoreHours(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }
  
  const id = '644e0bec433f7bed65f6e30e'
  
  const { 
    monOpen,
    monClose,
    tueOpen,
    tueClose,
    wedOpen,
    wedClose,
    thuOpen,
    thuClose,
    friOpen,
    friClose,
    satOpen,
    satClose,
    sunOpen,
    sunClose,
  } = req.body
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    await NewStoreStatus.findByIdAndUpdate({_id: id}, {
      storeHours: {
        monOpen: monOpen,
        monClose: monClose,
        tueOpen: tueOpen,
        tueClose: tueClose,
        wedOpen: wedOpen,
        wedClose: wedClose,
        thuOpen: thuOpen,
        thuClose: thuClose,
        friOpen: friOpen,
        friClose: friClose,
        satOpen: satOpen,
        satClose: satClose,
        sunOpen: sunOpen,
        sunClose: sunClose,
      }
    })
    return res.status(200).json({
      success: true
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating store hours on DB'
    })
  }
}