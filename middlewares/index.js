const fs = require('fs');
function logReqRes(filename){
    return (req, res, next) => {
        fs.appendFileSync(
            filename,
            `Date: ${new Date().toISOString()} | Method: ${req.method} | PATH: ${req.path} \n`
        )
        next();
    }
}

module.exports = {
    logReqRes
}