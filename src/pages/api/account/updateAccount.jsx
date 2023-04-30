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

  try {
    let updatedUser = await User.findByIdAndUpdate({_id: id}, {
      username: name,
      email: email,
      role: role,
      address: address,
      contact: contact
    })
    return res.status(200).json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at updating user from DB'
    })
  }
}