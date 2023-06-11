const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
class Middleware {
   Authentication(req, res, next){
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ msg: "Access denied" });

    try {
      console.log("we are testing 213", JWT_SECRET);
      console.log(token)
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("we are testing and our", decoded)
      req.user = decoded;
      next();
    } catch (err) {
      res.status(400).json({ msg: "Token is not valid" });
    }
  }
}  
module.exports = new Middleware();
