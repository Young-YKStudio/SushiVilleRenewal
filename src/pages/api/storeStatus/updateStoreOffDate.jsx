import NewStoreStatus from "../../../../model/Storestatus";
import dbConnect from "../../../../util/DBConnect";

export default async function UpdateStoreOffDate(req, res) {
  if(req.method !== 'PUT') {
    return res.status(303).json({ error: 'reqeust is not PUT' })
  }

  const id = '644e0bec433f7bed65f6e30e'
  const { date } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    let foundStatus = await NewStoreStatus.findById({_id: id})
    if (foundStatus.offDays) {
      console.log('yay', foundStatus.offDays)
      foundStatus.offDays.push(date)
      await foundStatus.save()
    } else {
      await NewStoreStatus.findByIdAndUpdate({_id: id}, {
        offDays: [
          date
        ]
      })
    }
    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found when updating off date from DB'
    })
  }
}