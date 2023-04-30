import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";

export default async function GetAllAccount(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let accounts = null
  try {
    accounts = await User.find().sort({createdAt: -1})
    return res.status(200).json({
      success: true,
      accounts: accounts
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at getting users from DB'
    })
  }
}

