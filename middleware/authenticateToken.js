import JWT from 'jsonwebtoken';
import User from '../modals/userModals.js';
export const authenticateToken = async(req, res, next) => {
    try {
        const bearerToken = req.headers['authorization'];

        if (!bearerToken) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        const parts = bearerToken.split(' ');
        
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                success: false,
                message: 'Invalid authorization format'
            });
        }

        const token = parts[1];
        const secret = process.env.JWT_SECRET || 'shhhhh';
        
        const decoded = JWT.verify(token, secret);
        // const user = await User.findOne({email:decoded.email}).select("_id");
        // Attach user data to request object for use in subsequent middleware/routes
        req.user = decoded;
        // req.user._id=user._id;
        
        next(); // Proceed to next middleware/route handler

    } catch (error) {
        console.error('Authentication error:', error);

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token'
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Token expired'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};