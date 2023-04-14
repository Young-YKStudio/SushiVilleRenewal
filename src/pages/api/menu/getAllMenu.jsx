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

  const findAllMenu = async () => {
    try {
      fullMenu = await Menu.find()
      return fullMenu
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at finding Menus'
      })
    }
  }

  const run = async () => {
    await findAllMenu()
    if(fullMenu) {
      return res.status(200).json({
        success: true,
        message: 'sending menu',
        menu: fullMenu
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'something went wrong'
      })
    }
  }

  run()
}