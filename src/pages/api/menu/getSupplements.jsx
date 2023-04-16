import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function GetSupplements(req, res) {
  if (req.method !== 'GET') {
    return res.status(303).json({ error: 'request is not GET'})
  }

  let allMenu = null
  let returningMenu = []
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  const getAllMenu = async () => {
    try {
      allMenu = await Menu.find()

      if(allMenu) {
        return allMenu
      } 

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at getting all menu from DB'
      })
    }
  }

  const sorting = () => {
    if(allMenu !== null) {
      allMenu.forEach((menu) => {
        if(menu.category === 'Bowl Rice') {
          returningMenu.push(menu)
        }
        if(menu.category === 'Drink') {
          returningMenu.push(menu)
        }
        if(menu.category === 'Sauce') {
          returningMenu.push(menu)
        }
      })
    }
  }

  const run = async () => {
    await getAllMenu()
    await sorting()
    if(returningMenu.length > 0) {
      return res.status(200).json({
        success: true,
        data: returningMenu
      })
    } else {
      return res.status(400).json({
        success: false,
        message: 'Something went wrong at api'
      })
    }
  }
  run()
}