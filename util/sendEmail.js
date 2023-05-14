export const sendEmail = async (options) => {

  const nodemailer = require('nodemailer')

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'sushivilledev@gmail.com',
      pass: "ugbsyjyeaexjausw"
    }
  })

  const mailOptions ={
    from: 'Sushiville <service@sushivilleny.com>',
    to: options.to,
    subject: options.subject,
    html: options.html
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }

}

