export const PromoCouponEmail = (couponCode, couponAmount) => {
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
        You have received a Coupon!
      </h1>
      <div
        style='margin: 2em; 0'
      >
        <p style='font-weight: bold; font-size:2.5em; color: darkgreen; '>${couponCode}</p>
      </div>
      <p
        style="
          font-size: 18px;
          font-family: roboto;
          line-height: 1.5em;
          color: rgb(88, 88, 88);
        "
      >
        This coupon is one-time use only.<br />
        This coupon has a value of <span style='font-weight: bold; color: darkgreen;'>$${couponAmount}</span>. <br />
        Please visit <a href='http://www.sushivilleny.com' clicktracking=off> Sushiville</a> to use the coupon online.<br />
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