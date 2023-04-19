import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";

export default async function UpdateContact(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id, contact } = req.body

  if (!id || !contact || id=== '' || contact === '') {
    return res.status(400).json({
      success: false,
      message: 'Required information missing'
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

  const updateAccount = async () => {
    try {
      let updatedAccount = await User.findByIdAndUpdate({_id: id}, {contact: contact})
      if (updatedAccount) {
        return res.status(200).json({
          success: true,
          message: 'Accout Updated'
        })
      } else {
        return res.status(400).json({
          success: false,
          message: 'Error at updating account at DB'
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at find or updating account at DB'
      })
    }
  }

  updateAccount()
}