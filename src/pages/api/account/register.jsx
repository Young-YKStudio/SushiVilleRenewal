import dbConnect from "../../../../util/DBConnect";
import User from '../../../../model/User'
import bcrypt from 'bcrypt'
import { RegisterEmail } from "./emails";
import { sendEmail } from "../../../../util/sendEmail";

const validateForm = async (username, email, password, passwordConfirm) => {
  if (password !== passwordConfirm) {
    return {
      error: 'Passwords do no match',
      message: 'Paswords do not match. Please check your password again'
    }
  }

  await dbConnect();

  const emailUser = await User.findOne({ email: email })

  if(emailUser) {
    return {
      error: 'Email already exist',
      message: 'Entered email already exists. Please try with different email address'
    }
  }

  if(password.length < 5) {
    return {
      error: 'Password too short',
      message: 'Password must have 5 or more characters'
    }
  }

  return null
}

export default async function registerAccount(req, res) {

  if(req.method !== 'POST') {
    return res.status(303).json({ error: 'reqeust is not POST' })
  }

  const { name, email, password, passwordConfirm } = req.body

  const errorMessage = await validateForm(name, email, password, passwordConfirm)

  if (!!errorMessage) {
    return res.status(400).json({
      success: false,
      error: errorMessage.error,
      message: errorMessage.message
    })
  }

  const hashedPasword = await bcrypt.hash(password, 12)

  let emailOptions = {
    from: 'service@sushivilleny.com',
    to: email,
    subject: 'Thank you for registering with Sushiville',
    html: RegisterEmail(name, email)
  }

  try {
    const userRegister = await User.create({
      username: name,
      email: email,
      password: hashedPasword
    })

    try {
      await sendEmail(emailOptions)
    } catch (error) {
      return res.status(503).json({
        success: false,
        message: 'Error found at sending email out.'
      })
    }

    res.status(200).json({
      success: true,
      message: 'User has been registered',
      user: userRegister
    })

  } catch (e) {
    console.log(e)
    res.status(400).json({
      success: false,
      message: 'Error at registering account'
    })
  }
}