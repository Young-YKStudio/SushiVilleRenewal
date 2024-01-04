import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
// test

export default async function CustomerUpdateAccount(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id, username, email, address, contact } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let foundAccont

  try {
    foundAccont = await User.findById({_id: id})

    if(foundAccont) {
      try {
        await User.findByIdAndUpdate({_id: id}, {
          username: username,
          email: email,
          address: address,
          contact: contact,
        })
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: 'Error at updating account from DB'
        })
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at finding account from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}