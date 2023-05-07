import moment from 'moment-timezone'

export const NewOrderPayAtResEmail = (username, orderNumber, orderDate, orderTotal, email) => {
  return `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
      <div
        style="
          min-width: 250px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
        <div style="margin-top: 1em;">
          <img
            style="max-width: 150px;"
            src="https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png"
          />
        </div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: #dc5a41;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Thank you for your order, ${username}!
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          We've received you order and are working on to process it.<br />
          Please allow us preperation time around 20-30 minutes. <br />
          <span style="color: gray; font-style: italic; font-size: 0.85em;"
            >(longer time expected on busy hours)</span
          ><br /><br />
          When your order is ready to be picked up, we will send you an email to
          let you know it is ready.<br />
          <br />
          It is always appreciated to let us know your name, or to show us confirmation email
          at pick-up counter.
        </p>
        <h2
          style="
            font-family: Roboto;
            color: darkgreen;
            display: inline-block;
            width: 90%;
            border-bottom: 1px solid #dc5a41;
          "
        >
          Your Order
        </h2>
        <table
          style="
            border-spacing: 5px;
            margin: 15px 0;
            font-family: roboto;
            color: gray;
          "
        >
          <tr>
            <td>Pick-up Name:</td>
            <td>
              <span
                style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                >${username}</span
              >
            </td>
          </tr>
          <tr>
            <td>Order Number:</td>
            <td>
              <span
                style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                >${orderNumber}</span
              >
            </td>
          </tr>
          <tr>
            <td>Order Placed:</td>
            <td><span style="padding-left: 15px; color: gray;">${moment(orderDate).tz('America/New_York').format('LLL')} EST</span></td>
          </tr>
          <tr>
            <td>Order Total:</td>
            <td>
              <span
                style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                >$${orderTotal.toFixed(2)}</span
              >
            </td>
          </tr>
        </table>
        <div
          style="
            padding-left: 5px;
            border-bottom: 1px solid #dc5a41;
            width: 90%;
            margin-bottom: 2.5em;
          "
        >
          <p style="font-family: roboto; color: gray; padding-bottom: 20px;">            <span style="line-height: 2em; color: #dc5a41; font-weight: bold;"
          >Your order is not paid yet. Please prepare to pay at pick-up counter.</span
        ><br />
            67 Orange Turnpike, Sloatsburg, NY 10974
            <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
          </p>
        </div>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Sushiville</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 250px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
          margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          &#169; Sushiville, 67 Orange Turnpike, Sloatsburg, NY 10974, (845) 712
          - 5006<br /><br />
          This email was sent to ${email} to update you about ordering
          in
          <a
            href="http://www.sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >sushivilleny.com.</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: service@sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >service@sushivilleny.com</a
          >
        </p>
        <p></p>
      </div>
    </div>
  </body>
  `
}

export const ReadyOrderEmail = (username, orderNumber, orderDate, updateDate, orderTotal, email) => {
  return `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fredericka+the+Great&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:wght@300;400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div class="mail-container" style="width: 100%; background-color: #fdfdfd;">
      <div
        style="
          min-width: 250px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          border: 1px solid lightgray;
          background-color: white;
          margin: 2em auto;
          padding: 1em 3em;
          border-radius: 5px;
        "
      >
        <div style="margin-top: 1em;">
          <img
            style="max-width: 150px;"
            src="https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png"
          />
        </div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: #dc5a41;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Your order is ready to be picked up!
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          We've prepared your order. Please come to the pick-up counter.<br />
          It is always appreciated letting us know your name, or showing us email
          at pick-up counter.<br /><br />
          <span style="font-size: 1.25em; color: darkgreen; font-weight: bold;"
            >Thank you for choosing Sushiville, and enjoy your food!</span
          >
        </p>
        <h2
          style="
            font-family: Roboto;
            color: darkgreen;
            display: inline-block;
            width: 90%;
            border-bottom: 1px solid #dc5a41;
          "
        >
          Your Order
        </h2>
        <table
          style="
            border-spacing: 5px;
            margin: 15px 0;
            font-family: roboto;
            color: gray;
          "
        >
          <tr>
            <td>Pick-up Name:</td>
            <td>
              <span
                style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                >${username}</span
              >
            </td>
          </tr>
          <tr>
            <td>Order Number:</td>
            <td>
              <span
                style="padding-left: 15px; color: darkgreen; font-weight: bold;"
                >${orderNumber}</span
              >
            </td>
          </tr>
          <tr>
            <td>Order Placed:</td>
            <td><span style="padding-left: 15px; color: gray;">${moment(orderDate).tz('America/New_York').format('LLL')}</span></td>
          </tr>
          <tr>
            <td>Order is ready at:</td>
            <td><span style="padding-left: 15px; color: gray;">${moment(updateDate).tz('America/New_York').format('LLL')}</span></td>
          </tr>
          <tr>
            <td>Order Total:</td>
            <td>
              <span
                style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
                >$${orderTotal.toFixed(2)}</span
              >
            </td>
          </tr>
        </table>
        <div
          style="
            padding-left: 5px;
            border-bottom: 1px solid #dc5a41;
            width: 90%;
            margin-bottom: 2.5em;
          "
        >
          <p style="font-family: roboto; color: gray; padding-bottom: 20px;">
            67 Orange Turnpike, Sloatsburg, NY 10974
            <br /><span style="line-height: 2em;">(845) 712 - 5006</span>
          </p>
        </div>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you, <br />
          <span style="color: darkgreen; font-weight: bold; line-height: 3em;"
            >Sushiville</span
          >
        </p>
      </div>
      <div
        style="
          min-width: 250px;
          max-width: 900px;
          border-top: 1px solid #dc5a41;
          margin: 0em 2em;
          padding: 1em 2em;
          text-align: center;
          font-family: roboto;
          margin: 0 auto;
        "
      >
        <p style="font-size: 0.75em; color: gray;">
          &#169; Sushiville, 67 Orange Turnpike, Sloatsburg, NY 10974, (845) 712
          - 5006<br /><br />
          This email was sent to ${email} to update you about ordering
          in
          <a
            href="http://www.sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >sushivilleny.com.</a
          >
          <br />
          Qeustions, comments, and support for Sushiville are available to
          <a
            href="mailto: service@sushivilleny.com"
            style="text-decoration: none; color: #dc5a41;"
            >service@sushivilleny.com</a
          >
        </p>
        <p></p>
      </div>
    </div>
  </body>
  `
}