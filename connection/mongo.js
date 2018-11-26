exports.start_con                   = start_con;
exports.findMOngoPromisfy           = findMOngoPromisfy;
exports.insertpPaymentLogsPromisfy  = insertpPaymentLogsPromisfy;
exports.updateMongoPromisify        = updateMongoPromisify;


function start_con(){ 
    
    const MongoClient = require('mongodb').MongoClient;
    const assert = require('assert');
    const url = 'mongodb://localhost:27017';
    
  // Database Name
  const dbName = 'stripe-db';
  
  
   
  // Use connect method to connect to the server
  MongoClient.connect(url,{useNewUrlParser: true}, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to mongo database server");
   const dbo=client.db(dbName);
    global.db = dbo;
   // created schema
   //model.createModel();
  });
  
}

function insertpPaymentLogsPromisfy(insertObj){
    return new Promise((resolve,reject)=>{
        db.collection('tb_payment_logs').insertOne(insertObj,function(err,result){
            if(err){
                return reject(err);
            }
            return resolve();
        });
    });
}

function findMOngoPromisfy(findObj){
    return new Promise((resolve,reject)=>{
        db.collection('tb_stripe_token').findOne(findObj,function(err,result){
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

function updateMongoPromisify(findObj,updateObj){
    return new Promise((resolve,reject)=>{
        db.collection('tb_stripe_token').updateOne(findObj,{$set:updateObj},{upsert:true},function(err,result){
            if(err){
                return reject(err);
            }
            return resolve();
        })
    })
}