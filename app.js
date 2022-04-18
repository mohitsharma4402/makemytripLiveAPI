let express = require('express');
let app = express();
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const dotenv = require('dotenv');
dotenv.config()
let port =process.env.PORT || 2100;
const mongoUrl = process.env.mongoUrllive   ;
const bodyParser = require('body-parser');
const cors = require('cors');

// middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())

app.get('/',(req,res) => {
    res.send("welcome to Express")
})

//collection
app.get('/data',(req,res) =>{
    db.collection('data').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})

//destination
app.get('/destination',(req,res) =>{
    db.collection('destination').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})

//destinationDetails
app.get('/details/:id',(req,res) => {
    let restId = mongo.ObjectId(req.params.id)
    db.collection('destination').find({_id:restId}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

//beachData
app.get('/mycollection_data/beach',(req,res) =>{
    db.collection('beachlocation').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})

//heritageData
app.get('/mycollection_data/heritage',(req,res) =>{
    db.collection('heritagelocation').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})

//honeymoonPackageData
app.get('/mycollection_data/honeymoonpackage',(req,res) =>{
    db.collection('honeymoonlocation').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})

//internationalPackageData
app.get('/mycollection_data/internationalpackage',(req,res) =>{
    db.collection('internationallocation').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)

    })
})




// place Order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})


// View Order
app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email){
        query = {"email":email}
    }
    db.collection('orders').find(query).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// delete order
app.delete('/deleteOrders',(req,res)=>{
    db.collection('orders').remove({},(err,result) => {
        res.send('order deleted')
    })
})


//update orders
app.put('/updateOrder/:id',(req,res) => {
    let oId = mongo.ObjectId(req.params.id);
    db.collection('orders').updateOne(
        {_id:oId},
        {$set:{
            "status":req.body.status,
            "bank_name":req.body.bankName
        }},(err,result) => {
            if(err) throw err
            res.send(`Status Updated to ${req.body.status}`)
        }
    )
})



//Connection with database
    MongoClient.connect(mongoUrl,(err,client) => {
     if(err) console.log(`Failed to connect db`,err);
     db = client.db('makemytrip');
        app.listen(port,() => {
        console.log(`server is running on port ${port}`)
    })
 })