module.exports = (req, res) => {
  req.session.destroy(() => {
    res.status(200).send("You've been logged out!");
  });
};
