// middlewares/roleMiddleware.js
export const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user)
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });

  console.log(req.user);
  if (!roles.includes(req.user.role))
    return res.status(403).json({ message: 'Access denied.' });

  next();
};
