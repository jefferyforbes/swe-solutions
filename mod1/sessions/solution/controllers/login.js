module.exports = (req, res) => {
  if (!req.session.userId) {
    req.session.userId = `${req.auth.user}123!`;
  }

  res.send(`You're logged in, ${req.auth.user}! Now call other API routes.`);
};
