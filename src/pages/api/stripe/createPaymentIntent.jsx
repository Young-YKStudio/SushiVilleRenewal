import dbConnect from '../../../../util/DBConnect'
import NewOrder from '../../../../model/Order'
import User from '../../../../model/User'

const stripe = require('stripe')(process.env.APP_STRIPE_API_SEC)

export default async function CreatePaymentIntent(req, res) {
  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }
  
  const { orderId } = req.body
  
  try {
    await dbConnect()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at connecting to DB'
    })
  }
  
  let foundOrder
  
  try {
    foundOrder = await NewOrder.findOne({_id: orderId }).populate({'path': 'customer', model: User})
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at getting order from DB'
    })
  }
  
  let receivedTotalPrice = foundOrder.grandTotal
  let TotalWith2Decimal = receivedTotalPrice.toFixed(2)
  let totalBeforeRound = Number(TotalWith2Decimal) * 100
  let formattedTotal = Math.round(totalBeforeRound)
  
  let paymentIntent = await stripe.paymentIntents.create({
    amount: formattedTotal,
    currency: 'usd',
    description: foundOrder.orderCount,
    customer: foundOrder.customer
  })

  if(!paymentIntent) {
    return res.status(400).json({
      success: false,
      message: 'No payment intent'
    })
  }

  return res.status(200).json({
    success: true,
    clientSecret: paymentIntent.client_secret
  })
}