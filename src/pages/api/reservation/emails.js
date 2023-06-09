import moment from 'moment-timezone'

export const reservationRequestEmail = (name, contact, email, reserveTime, party, comments) => {
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
        Thank you for submitting your reservation request!
      </h1>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        We've received your reservation request.<br />
        We will send you another email when we confirm your reservation.<br />
        Thank you for your consideration!<br />
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
        Your Reservation Request
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
          <td>Reserve Name:</td>
          <td>
            <span
              style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
              >${name}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Number:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${contact}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Email:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${email}</span
            >
          </td>
        </tr>
        <tr>
          <td>Reserve Time:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${moment(reserveTime).tz('America/New_York').format('LLL')} EST</span
            >
          </td>
        </tr>
        <tr>
          <td># of Party:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${party}</span
            >
          </td>
        </tr>
        <tr>
          <td>Comments:</td>
          <td><span style="padding-left: 15px; color: gray;">${comments ? comments : ''}</span></td>
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
        This email was sent to ${email} to update you about making a
        reservation in
        <a
          href="http://www.sushivilleny.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny.com.</a
        >
        <br />
        Qeustions, comments, and support for Sushiville are available to
        <a
          href="mailto: sushivilleny@gmail.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny@gmail.com</a
        >
      </p>
      <p></p>
    </div>
  </div>
</body>
`
}

export const reservationConfirmEmail = (name, contact, email, reserveTime, party, comments) => {
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
        Your reservation has been confirmed!
      </h1>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        We've confirmed your request.<br />
        Plese let us know if there is any updates on your reservation, and
        we'll look forward to see you and serve you on ${moment(reserveTime).tz('America/New_York').format('LLL')} EST.<br />
        Thank you for choosing Sushiville.
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
        Your confirmed reservation
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
          <td>Reserve Name:</td>
          <td>
            <span
              style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
              >${name}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Number:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${contact}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Email:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${email}</span
            >
          </td>
        </tr>
        <tr>
          <td>Reserve Time:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${moment(reserveTime).tz('America/New_York').format('LLL')} EST</span
            >
          </td>
        </tr>
        <tr>
          <td># of Party:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${party}</span
            >
          </td>
        </tr>
        <tr>
          <td>Comments:</td>
          <td><span style="padding-left: 15px; color: gray;">${comments ? comments : ''}</span></td>
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
        This email was sent to ${email} to update you about making a
        reservation in
        <a
          href="http://www.sushivilleny.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny.com.</a
        >
        <br />
        Qeustions, comments, and support for Sushiville are available to
        <a
          href="mailto: sushivilleny@gmail.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny@gmail.com</a
        >
      </p>
      <p></p>
    </div>
  </div>
</body>
  `
}

export const reservationDenyEmail = (name, contact, email, reserveTime, party, comments, reason) => {
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
        Your reservation request has been denied.
      </h1>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        We've considered your reservations request, but we are unable to
        fulfill the request. <br />
        Please request again
        <a
          style="text-decoration: none; color: #dc5a41;"
          href="http://www.sushivilleny.com"
          >here</a
        >, or contact us directly, (845) 712 - 5006.<br />
        Thank you for your consideration.<br />
      </p>
      <div
        style="
          font-family: Roboto;
          color: gray;
          margin: 2em 0;
        "
      >
        <p>Reason for denial:</p>
        <p style="color: darkgreen; font-size: 1.25em;">${reason}</p>
      </div>
      <h2
        style="
          font-family: Roboto;
          color: darkgreen;
          display: inline-block;
          width: 90%;
          border-bottom: 1px solid #dc5a41;
        "
      >
        Your Reservation Request
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
          <td>Reserve Name:</td>
          <td>
            <span
              style="padding-left: 15px; color: #dc5a41; font-weight: bold;"
              >${name}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Number:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${contact}</span
            >
          </td>
        </tr>
        <tr>
          <td>Contact Email:</td>
          <td>
            <span style="padding-left: 15px; color: gray; font-weight: bold;"
              >${email}</span
            >
          </td>
        </tr>
        <tr>
          <td>Reserve Time:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${moment(reserveTime).tz('America/New_York').format('LLL')} EST</span
            >
          </td>
        </tr>
        <tr>
          <td># of Party:</td>
          <td>
            <span
              style="padding-left: 15px; color: darkgreen; font-weight: bold;"
              >${party}</span
            >
          </td>
        </tr>
        <tr>
          <td>Comments:</td>
          <td><span style="padding-left: 15px; color: gray;">${comments ? comments : ''}</span></td>
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
        This email was sent to ${email} to update you about making a
        reservation in
        <a
          href="http://www.sushivilleny.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny.com.</a
        >
        <br />
        Qeustions, comments, and support for Sushiville are available to
        <a
          href="mailto: sushivilleny@gmail.com"
          style="text-decoration: none; color: #dc5a41;"
          >sushivilleny@gmail.com</a
        >
      </p>
      <p></p>
    </div>
  </div>
</body>
  `
}