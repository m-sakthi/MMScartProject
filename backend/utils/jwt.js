const sendToken = (user, statusCode, res) => {
  const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
  //Creating JWT Token
  const token = user.getJwtToken();

  //setting cookies 
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * DAY_IN_MILLISECONDS),
    httpOnly: true,
  };

  return res.status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    });
}

module.exports = sendToken;