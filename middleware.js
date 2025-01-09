require('dotenv').config();

const checkToken = (req, res, next) => {
    const accessToken = process.env.ACCESS_TOKEN;

    if (accessToken.length == 0) {
        return next();
    }
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(401).json({ success: false, message: "Missing token" });
    }

    if (token != process.env.ACCESS_TOKEN) {
        return res.status(403).json({ sucess: false , message:"Unauthorized" });
    }

    return next();
}

module.exports = checkToken;