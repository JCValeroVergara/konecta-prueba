// middleware/authorize.js
const authorize = (roles) => {
    return (req, res, next) => {
        const user = req.user; 

        if (!user || !user.ROL) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }

        
        if (roles.includes(user.ROL)) {
            return next(); 
        }

        return res.status(403).json({ message: 'Acceso denegado' });
    };
};

module.exports = authorize;
