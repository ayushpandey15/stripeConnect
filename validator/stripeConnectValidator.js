let Joi                                =  require('joi');

let validator                          = require("./validate");

exports.getStripeAccountDetails        = getStripeAccountDetails;
exports.registerStripeAccount          = registerStripeAccount;
exports.transferBalence                = transferBalence;

function registerStripeAccount(req,res, next){    

    let schema;

    if(req.body.bank_account_type== "individual"){


        //when account type is individual
        schema           = Joi.object().keys({
            
            //validate authentication           
            user_id               : Joi.number().options({convert : false}).required(),
            maerketplace_user_id  : Joi.number().options({convert : false}).required(),
            
            // minimum requirement by stripe to validate account
            city                  : Joi.string().options({convert : false}).required(),
            line1                 : Joi.string().options({convert : false}).required(),
            line2                 : Joi.string().options({convert : false}).optional(),
            personal_postal_code  : Joi.string().options({convert : false}).required(),
            dob_day               : Joi.number().options({convert : false}).required(),
            dob_month             : Joi.number().options({convert : false}).required(),
            dob_year              : Joi.number().options({convert : false}).required(),
            first_name            : Joi.string().options({convert : false}).required(),
            last_name             : Joi.string().options({convert : false}).required(),
            ssn                   : Joi.string().options({convert : false}).required(),
            ip                    : Joi.string().options({convert : false}).required(),
            bank_account_type     : Joi.string().valid('individual' , 'company').options({convert : false}).required(),
            country               : Joi.string().options({convert : false}).required(),
            state                 : Joi.string().options({convert : false}).required(),
            bank_name             : Joi.string().options({convert : false}).required(),
            branch_name           : Joi.string().options({convert : false}).required(),
            phone_no              : Joi.string().options({convert : false}).required(),
            
            //bank details for payout from stripe to0 bank account
            bank_account_currency : Joi.string().options({convert : false}).required(),
            bank_account_country  : Joi.string().options({convert : false}).required(),
            bank_account_number   : Joi.string().options({convert : false}).required(),
            routing_number        : Joi.string().options({convert : false}).required()    

        });
    }
    else{

        //when account is buissness type

        schema      = Joi.object().keys({


            //validate authentication
            access_token            : Joi.string().options({convert : false}).required(),
            marketplaces_user_id    : Joi.number().options({convert : false}).optional(),
            user_id                 : Joi.number().options({convert : false}).required(),
           
            //minimum requirement to validate account by stripe
            city                    : Joi.string().options({convert : false}).required(),
            line1                   : Joi.string().options({convert : false}).required(),
            line2                   : Joi.string().options({convert : false}).optional(),
            personal_postal_code    : Joi.string().options({convert : false}).required(),
            dob_day                 : Joi.number().options({convert : false}).required(),
            dob_month               : Joi.number().options({convert : false}).required(),
            dob_year                : Joi.number().options({convert : false}).required(),
            first_name              : Joi.string().options({convert : false}).required(),
            last_name               : Joi.string().options({convert : false}).required(),
            ssn                     : Joi.string().options({convert : false}).required(),
            ip                      : Joi.string().options({convert : false}).required(),
            bank_account_type       : Joi.string().valid('individual' , 'company').options({convert : false}).required(),
            country                 : Joi.string().options({convert : false}).required(),
            business_name           : Joi.string().options({convert : false}).required(),
            business_tax_id         : Joi.number().options({convert : false}).required(),
            state                   : Joi.string().options({convert : false}).required(),
            bank_name               : Joi.string().options({convert : false}).required(),
            branch_name             : Joi.string().options({convert : false}).required(),
            phone_no                : Joi.string().options({convert : false}).required(),
            
           //bank details for payout from stripe to bank account
            bank_account_currency   : Joi.string().options({convert : false}).required(),
            bank_account_country    : Joi.string().options({convert : false}).required(),
            bank_account_number     : Joi.string().options({convert : false}).required(),
            routing_number          : Joi.string().options({convert : false}).required()   
        }) 
    }

    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }

}

function getStripeAccountDetails(req, res, next){
    let schema =Joi.object().keys({
        user_id              : Joi.string().options({ convert: false}).required(),
        marketplace_user_id : Joi.string().options({ convert: false}).required() 
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }

}

function transferBalence(req, res, next){
    let schema  = Joi.object().keys({
        user_id              : Joi.number().options({convert : false}).required(),
        marketplaces_user_id : Joi.number().options({convert: false}).required(),
        percentage           : Joi.number().max(100).min(0).options({convert : false}).required(),
        job_id               : Joi.number().options({convert: false}).required()
    });
    let validFields  = validator.validateFields(req.body, res, schema);
    if (validFields) {
        next();
    }    
}