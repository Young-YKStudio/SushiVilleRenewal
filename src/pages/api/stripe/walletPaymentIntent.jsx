const stripe = require('stripe')(process.env.APP_STRIPE_API_SEC)

export default async function WalletPaymentIntent(req, res) {
  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  let paymentIntent
  try {
    paymentIntent = await stripe.paymentIntent.create({
      paymentMethodType: 'card',
      currency: 'usd'
    })
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Error at creating paymentIntent from stripe'
    })
  }

  return res.status(200).json({
    success: true,
    clientSecret: paymentIntent
  })
}