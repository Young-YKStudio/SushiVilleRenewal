import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function GetOneMenu(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }

  let foundMenu = null

  const { id } = req.body

  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'ID is missing'
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

  const findMenu = async () => {
    try {
      foundMenu = await Menu.findById({_id: id})

      if(foundMenu) {
        return foundMenu
      } else {
        return res.status(400).json({
          success: false,
          message: 'Menu does not exsist on DB'
        })
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at finding menu on DB'
      })
    }
  }

  const run = async () => {
    await findMenu()
    if(foundMenu) {
      return res.status(200).json({
        success: true,
        message: 'finding menu successful',
        menu: foundMenu
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong'
      })
    }
  }

  run()
}