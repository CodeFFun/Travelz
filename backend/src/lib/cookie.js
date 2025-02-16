const jwt = require('jsonwebtoken');
const dataResponse = require('./dataResponse.js');

const generateCookie = async (user, res) => {
    const token = await jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: 1000 * 60 * 60 * 24 * 30
    });
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
}

const verifyCookie = async (req, res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json(dataResponse(null, 'Login first to continue', 403));
    }
    try{
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decodeToken);
        res.locals.userId = decodeToken.user_id;
        res.locals.role = decodeToken.user_role;
        next();
    } catch(e){
        console.log(e.message);
        //clear defective token
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1,
            path:'/'
        });
        res.json(dataResponse(null, "Not enough credentials", 403));
    }
}

module.exports = {
    generateCookie,
    verifyCookie
}
