const dataResponse = require('../lib/dataResponse.js');

const checkRole = (req, res) => {
    const {role} = res.locals;
    if(role !== 'organization' && role !== 'admin'){
        return res.json(dataResponse(null, "You are not authorized to create event", 403));
    }
    next();
}

module.exports = checkRole;