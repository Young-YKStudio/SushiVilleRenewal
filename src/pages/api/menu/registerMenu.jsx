import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function RegisterMenu(req, res) {
  if (req.method !== 'POST') {
    return res.status(303).json({ error: 'request is not POST'})
  }

  let registeredMenu = null

  const { name, caption, description, price, category, Sub_Category, stock_availability, image } = req.body

  let numberedPrice = Number(price)

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found at connecting to DB'
    })
  }

  const registerMenu = async () => {
    try {
      registeredMenu = await Menu.create({
        name: name,
        caption: caption,
        description: description,
        price: numberedPrice,
        category: 'test',
        Sub_Category: Sub_Category,
        stock_availability: stock_availability,
        image: image
      })
      return registeredMenu
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error found at registering menu'
      })
    }
  }

  registerMenu()

  return res.status(200).json({
    success: true,
  })
}