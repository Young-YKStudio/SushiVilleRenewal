import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import Menu from "../../../../model/Menu";

export default async function ModifyFavorteItem(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }

  const { id, isFavorited, product } = req.body

  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'Missing user id'
    })
  }

  if(isFavorited == null) {
    return res.status(400).json({
      success: false,
      message: 'Missing required information'
    })
  }

  if(!product) {
    return res.status(400).json({
      success: false,
      message: 'Missing product information'
    })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error found at connecting to DB'
    })
  }

  let foundUser = null

  try {
    foundUser = await User.findOne({_id: id})
  } catch (error) {
    return res.status(400).json({
      success: false, 
      message: 'Error found at finding User'
    })
  }

  console.log(foundUser)

  const addFavorite = async () => {
    // duplicates?
    foundUser.FavoriteItems.push(product)
    await foundUser.save()
    return res.status(200).json({
      success: true,
      user: foundUser
    })
  }
  let foundProduct = await Menu.findOne({_id: product})
  
  const removeFavorite = async () => {

    foundUser.FavoriteItems.forEach(async (item, index) => {
      if(item = foundProduct._id) {
        foundUser.FavoriteItems.splice(index, 1)
        await foundUser.save()
        return res.status(200).json({
          success: true,
          user: foundUser
        })
      }
    })
  }

  isFavorited ? addFavorite() : removeFavorite()
}