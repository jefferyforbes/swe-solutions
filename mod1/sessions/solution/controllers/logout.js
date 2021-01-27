module.exports = (req, res) => {
  req.session.destroy(() => {
    res.send("You've been logged out!");
  });
};
