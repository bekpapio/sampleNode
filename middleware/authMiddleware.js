const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const tokenInHeader = req.headers.Authorization || req.headers.authorization;
  if (!tokenInHeader)
    res.status(403).send({
      error: "unAuthorized",
    });
  const token = tokenInHeader.split(" ")[1];
  jwt.verify(token, process.env.privateKey, (error, decoded) => {
    if (error) {
      return res.status(403).send({
        message: "unAuthorized",
      });
    }

    (req.user = decoded.userId), next();
  });
};

module.exports =validateToken
