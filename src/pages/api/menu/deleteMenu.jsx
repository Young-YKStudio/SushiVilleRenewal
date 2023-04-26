import dbConnect from "../../../../util/DBConnect";
import Menu from '../../../../model/Menu';

export default async function DeleteMenu(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id } = req.body

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  try {
    await Menu.findByIdAndDelete({_id: id})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at deleting Menu from DB'
    })
  }

  return res.status(200).json({
    success: true
  })
}