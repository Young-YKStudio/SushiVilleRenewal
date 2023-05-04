import dbConnect from "../../../../util/DBConnect";
import User from "../../../../model/User";
import Menu from "../../../../model/Menu";

export default async function RemoveFavorite(req, res) {
  if (req.method !== 'PUT') {
    return res.status(303).json({ error: 'request is not PUT'})
  }
  
  const { menuId, userId } = req.body
  
  if(!menuId || !userId) {
    return res.status(400).json({
      success: false,
      message: 'Required information is missing'
    })
  }
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error at connecting to DB"
    })
  }
  
  const updateUser = async () => {
    try {
      let foundUser = await User.findById({_id: userId}).populate({"path": 'FavoriteItems', model: Menu})
      let foundmenu = await Menu.findById({_id: menuId})
      if(foundUser && foundmenu) {
        let count = 0
        await foundUser.FavoriteItems.forEach(async (favorite, index) => {
          count += 1
          if(favorite.name == foundmenu.name) {
            foundUser.FavoriteItems.splice(index, 1)
            await foundUser.save()
          }
        })
      }
      
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error at updating user from DB'
      })
    }
  }
  await updateUser()
  return res.status(200).json({
    success: true
  })
}