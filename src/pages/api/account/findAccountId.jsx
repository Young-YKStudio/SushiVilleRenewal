import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'

export default async function FindAccount(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }
  
  const { id } = req.body

  let foundAccount = null

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error at connecting to DB'
    })
  }

  const findAccount = async () => {
    try {
      foundAccount = await User.findOne({_id: id})
      if(foundAccount) {
        return foundAccount
      } else {
        return res.status(400).json({
          success: false,
          message: 'user not found in DB'
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at finding the account at DB'
      })
    }
  }

  const run = async () => {
    await findAccount()
    if(foundAccount) {
      return res.status(200).json({
        success: true,
        message: 'user found',
        user: foundAccount
      })
    }
  }

  run()
}