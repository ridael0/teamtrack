const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = '*_secrect_key_*';
module.exports.JWT_SECRET_KEY = JWT_SECRET_KEY;

module.exports.authMiddleware = function(req, res, next) {
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).json({error: 'Unauthorized'});
    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        req.admin = {id: decoded.id, email: decoded.email, name: decoded.name};
        next();
    }catch {
        res.status(401).json({error: 'Invalid token'});
    }
}