import Coupon from "../../../../model/Coupon";
import User from "../../../../model/User";
import dbConnect from "../../../../util/DBConnect";

export default async function GetAllCoupons(req, res) {
  if(req.method !== 'GET') {
    return res.status(303).json({ error: 'reqeust is not GET' })
  }

  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }

  let allCoupons
  let promoCoupons = []
  let accountCoupons = []
  try {
    allCoupons = await Coupon.find({}).populate({'path': 'customer', model: User}).populate({'path': 'couponUsedAccts', model: User}).sort({createdAt: -1})
    if(allCoupons) {
      await allCoupons.forEach((coupon) => {
        if(coupon.isPromo) {
          promoCoupons.push(coupon)
        } else {
          accountCoupons.push(coupon)
        }
      })
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating couipon from DB'
    })
  } finally {
    if(allCoupons.length == 0 ) {
      return res.status(200).json({
        success: true,
        message: 'No coupons found',
        promoCoupons: [],
        accountCoupons: []
      })
    }
    if(allCoupons.length > 0) {
      return res.status(200).json({
        success: true,
        promoCoupons: promoCoupons,
        accountCoupons: accountCoupons
      })
    }
  }
}