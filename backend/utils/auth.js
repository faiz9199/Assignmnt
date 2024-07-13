// utils/auth.js
const jwt = require("jsonwebtoken");

const ensureAuthenticated = (req, res, next) => {
  const authToken = req.cookies.token;
  
  if (!authToken) {
    req.isAuthenticated = false;
    req.user = null;  // Ensuring req.user is null when there's no token
    return next();  // Proceed to next middleware/route handler
  }

  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decoded;
    req.isAuthenticated = true;
    return next();
  } catch (error) {
    req.isAuthenticated = false;
    req.user = null;  // Ensuring req.user is null when token verification fails
    return next();  // Proceed to next middleware/route handler
  }
};

module.exports = {
  ensureAuthenticated,
};
