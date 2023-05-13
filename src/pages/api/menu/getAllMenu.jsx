import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function GetAllMenu(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  let fullMenu

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }

  try {
    fullMenu = await Menu.find()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at finding Menus'
    })
  }
  
  return res.status(200).json({
    success: true,
    message: 'sending menu',
    menu: fullMenu
  })
}