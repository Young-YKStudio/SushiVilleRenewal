import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function UpdateMenu(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id, name, caption, description, price, category, Sub_Category, stock_availability, image } = req.body


  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let updatedMenu = null

  try {
    updatedMenu = await Menu.findByIdAndUpdate({_id: id}, {
      name: name,
      caption: caption,
      description: description,
      price: Number(price),
      category: category,
      Sub_Category: Sub_Category,
      stock_availability: stock_availability,
      image: image
    })
    return res.status(200).json({
      success: true,
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error found when updating Menu from DB'
    })
  }
}