/**
 * This is a middleware---it authenticates all the API callbacks
 */
// import the json web token verifyer
const { verify } = require("jsonwebtoken");

// export the token authorizer
module.exports = {
    // takes three parameters
    authToken: (req, res, next) => {
        // initialize the token
        let token = req.get("authorization");

        // check if token exists
        if (token) {
            // remove the bearer // from the 7th index
            token = token.slice(7);
            // then call the token verifyer
            verify(token, process.env.JSWBTOKEN, (err, decodedObject) => {
                // if error got return message
                if(err) {
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                }
                // incase of no error call the next method
                else {
                    next();
                }
            })
        } 
        // if token does not exist
        else {
            // deny access
            res.json({
                success: 0,
                message: "Access denied! unauthorized user detected"
            });
        }


    }
}