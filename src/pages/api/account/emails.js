export const ForgotPasswordEmail = (resetUrl) => {
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
        min-width: 400px;
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
        style="max-width: 125px;"
        src="https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png"
      />
    </div>
      <h1
        style="
          font-family: roboto;
          font-weight: bold;
          color: darkgreen;
          margin-bottom: 1em;
          margin-top: 1em;
        "
      >
        Password Reset Request
      </h1>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        You have requested a password reset.<br />
        Please go to this link to reset your password<br />
        <a href=${resetUrl} clicktrackgin=off>Reset Your Password</a>
      </p>

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
        min-width: 400px;
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
        This email was sent to {customer email} to update you about
        resetting password in
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

export const ResetPasswordEmail = (homeURL) => {
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
        min-width: 400px;
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
          style="max-width: 125px;"
          src="https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png"
        />
      </div>
      <h1
        style="
          font-family: roboto;
          font-weight: bold;
          color: darkgreen;
          margin-bottom: 1em;
          margin-top: 1em;
        "
      >
        Password Reset Confirmation
      </h1>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        You have successfully updated your password.<br />
        Please <a href="http:www.sushivilleny.com" style="text-decoration: none; color: #dc5a41;">login</a> and enjoy your sushi adventure!
      </p>

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
        min-width: 400px;
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
        This email was sent to {customer email} to update you about
        resetting password in
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
    </div>
  </div>
</body>
  `
}

export const RegisterEmail = (username, email) => {
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
    <div
      class="mail-container"
      style="
        width: 100%;
        background-color: #fdfdfd;
      "
    >
      <div
        style="
          min-width: 400px;
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
					style="max-width: 125px;"
					src="https://ucarecdn.com/1a966f1f-4eec-487f-9e2d-8b4d38455b41/logo_sushivill.png"
				/>
			</div>
        <h1
          style="
            font-family: roboto;
            font-weight: bold;
            color: darkgreen;
            margin-bottom: 1em;
            margin-top: 1em;
          "
        >
          Welcome to Sushiville <br />
          ${username} !
        </h1>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          Thank you for starting your sushi journey with us.<br />
          We're excited to serve your take-out orders online now.
        </p>
        <p
          style="
            font-size: 18px;
            font-family: roboto;
            line-height: 1.5em;
            color: rgb(88, 88, 88);
          "
        >
          You're almost ready to get started. <br />
          Please
          <a
            style="text-decoration: none; color: #dc5a41;"
            href="http://www.sushivilleny.com"
            >visit our website</a
          >
          to start your journey!
        </p>
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
          min-width: 400px;
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
          This email was sent to ${email} to update you about
          registering account in
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
      </div>
    </div>
  </body>`
}