import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";

export default async function UpdateAccount(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id, name, email, role, address, contact } = req.body

  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing user ID'
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

  let updatedUser

  try {
    updatedUser = await User.findOne({_id: id})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at finding user from DB'
    })
  }

  try {
    updatedUser.name ? updatedUser.name = name : updatedUser.username = name
    updatedUser.email = email
    updatedUser.role = role
    updatedUser.address = address
    updatedUser.contact = contact
    await updatedUser.save()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user from DB'
    })
  }

  return res.status(200).json({
    success: true,
    user: updatedUser
  })
}