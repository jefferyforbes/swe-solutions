module.exports = (req, res) => {
  res.render("index", { loggedIn: req.oidc.isAuthenticated() });
};
