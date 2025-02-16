const invalidCookieError = require("./controllers/invalidCookie");
const invalidCsrfTokenError = require("./controllers/invalidCsrfTokenError");
const LoginError = require("./controllers/loginError");
const OtpError = require("./controllers/OtpError");
const RefreshTokenError = require("./controllers/refreshTokenError");

(async () => {

    console.log('Processing Login Error stats...');
    await LoginError();

    console.log('Processing Otp Error stats...');
    await OtpError();

    console.log('Processing Refresh Error stats...');
    await RefreshTokenError();

    console.log('Processing invalidCsrfToken Error stats...');
    await invalidCsrfTokenError();

    console.log('Processing Invalid Cookie Error stats...');
    await invalidCookieError();



    
})();