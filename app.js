let express                 = require('express');
let bodyParser              = require('body-parser');

let connectService          = require('./connection/mysql');
let mongoConnect            = require('./connection/mongo');
let stripeConnectValidator  = require('./validator/stripeConnectValidator');
let stripeValidator         = require('./validator/stripeValidator');
let userValidator           = require('./validator/userValidator');
let stripeConnectController = require('./controller/stripeConnectController');
let stripeController        = require('./controller/stripeController');
let userController          = require('./controller/userController');

let app  = express();
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));

app.post('/register_account', stripeConnectValidator.registerStripeAccount,  stripeConnectController.registerUser);
app.post('/get_stripe_account', stripeConnectValidator.getStripeAccountDetails, stripeConnectController.getStripeAccountDetails);
app.post('/transfer_balance', stripeConnectValidator.transferBalence, stripeConnectController.transferBalence);
app.post('/user_signup', userValidator.userSignup, userController.userSignup);
app.post('/charge_stripe', stripeValidator.chargeStripe, stripeController.chargeStripe);

let server = require('http').createServer(app);
let PORT = 3000 || process.env.PORT

server.listen(PORT,()=>{
    connectService.connect();
    mongoConnect.start_con();
    console.log("the server is listening on .......",PORT);
})
