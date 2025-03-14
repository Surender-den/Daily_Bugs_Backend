const AmazonVCPError = require("./controllers/AmazonVCPLoginError");
const BricreeLoginError = require("./controllers/BricreeLoginError");
const ClickPostLoginError = require("./controllers/ClickPostLoginError");
const DelhiveryBankLoginError = require("./controllers/DelhiveryBankLoginError");
const EasebuzzLoginError = require("./controllers/EazebuzzLoginError");
const EazebuzzLoginError = require("./controllers/EazebuzzLoginError");
const FbTokenError = require("./controllers/FbTokenError");
const invalidCookieError = require("./controllers/invalidCookie");
const invalidCsrfTokenError = require("./controllers/invalidCsrfTokenError");
const JiomartError = require("./controllers/JiomartError");
const JiomartLoginError = require("./controllers/JiomartLoginError");
const LoginError = require("./controllers/loginError");
const ModuleDisableError = require("./controllers/ModuleDisableError");
const NoSellerDetailFoundError = require("./controllers/NoSellerDetailFoundError");
const OtpError = require("./controllers/OtpError");
const RazorpayLoginError = require("./controllers/RazorpayLoginError");
const RefreshTokenError = require("./controllers/refreshTokenError");
const ShiprocketBankLoginError = require("./controllers/ShiprocketBankLoginError");
const ShiprocketLoginError = require("./controllers/ShiprocketLoginError");
const ShipwayLoginError = require("./controllers/ShipwayLoginError");
const StorageLocationError = require('./controllers/StorageLocationError');
const verifyOtpError = require("./controllers/VerifyOtpError");

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

    console.log('Processing Fb Token Error stats...');
    await FbTokenError();

    console.log('Processing Shiprocket Login Error stats...');
    await ShiprocketLoginError();

    console.log('Processing Shiprocket Bank Login Error stats...');
     await ShiprocketBankLoginError();
    
    
    
     console.log('Processing Delhivery Bank Login Error stats...');
     await DelhiveryBankLoginError();

     console.log('Processing Storage Location Bank Error stats...');
     await StorageLocationError();

     console.log('Processing Jiomart Error stats...');
     await JiomartError();

    console.log('Processing Jiomart Login Error stats...');
    await JiomartLoginError();


     console.log('Processing Module Disabled stats...');
     await ModuleDisableError();

     console.log('Processing AmazonVCP Login Error stats...');
     await AmazonVCPError();

     console.log('Processing Verify Otp Error stats...');
     await verifyOtpError();

     console.log('Processing Verify Click Post Login Error stats...');
     await ClickPostLoginError();

     console.log('Processing Verify Bricree Login Error stats...');
     await BricreeLoginError();
     
     console.log('Processing Verify Easebuzz Login Error stats...');
     await EasebuzzLoginError();

     console.log('Processing Verify Razorpay Login Error stats...');
     await RazorpayLoginError();

     console.log('Processing Verify Shipway Login Error stats...');
     await ShipwayLoginError();


     console.log('Processing Verify No Seller Details Found Error stats...');
     await NoSellerDetailFoundError();













    
})();