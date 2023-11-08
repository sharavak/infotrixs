if (process.env.Node_ENV !== 'production') {
    require('dotenv').config();
}
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const crypto = require('crypto');
const Quotes = require('./models/quotesSchema');
const Expiry=require('./models/expirySchema');
const dbURL=process.env.DB_URL || 'mongodb://127.0.0.1:27017/quotes'
mongoose.connect(dbURL);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database Connected');
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function generateApiKey(size = 32, format = 'base64') {
    const buffer = crypto.randomBytes(size);
    return buffer.toString(format);
  }
const validApi=async(apikey)=>{
      const check=await Expiry.findOne({apikey:apikey});
      return check && apikey===check.apikey;
}
const errorJson=()=>{
      return {"error":"Invalid Api Key"};
}
// Home route
app.get("/", (req, res) => {
    res.json({'welcome':"Welcome to quotes REST API"});
})
// To generate the API KEY
app.get("/api/quotes/generate",async(req,res)=>{
    const expiry=new Expiry();
    const apikey=generateApiKey();
    expiry.apikey=apikey;
    await expiry.save();
    res.json({"apikey":apikey});
})
// To get random quotes
app.get('/api/quotes/random', async (req, res) => {
    const quotes = await Quotes.find({});
    let n = quotes.length;
    const ind = Math.ceil(Math.random() * n);
    const { author, quote } = quotes[ind - 1];
    res.json({ quote: { author, quote } });
})
// To post new quotes
app.post('/api/quotes', async (req, res) => {
    const { author, quote ,apikey} = req.body;
    if(!apikey){
        return res.json({"error":"Api Key is required"});
    }
    const check=await validApi(apikey);
    if(!check)
        return res.json(errorJson());
    if (!author || !quote)
        return res.json({ "error": 'empty field' });
    const newQuote = new Quotes({ author: author, quote: quote ,tempQuote:quote.toLowerCase()});
    await newQuote.save();
    res.json({ 'success': "Successfully created" });
})
// To filter the quotes by author
app.get('/api/quotes', async (req, res) => {
    const {apikey,author} = req.query;
    if(!apikey)
        return res.json({"error":"Api key is required"});
    const check=await validApi(apikey);
    if(!check)
        return res.json(errorJson());
    const arr = await Quotes.find({ author: author });
    if (!arr)
        res.json({ 'totalCount': arr.length, 'error': "Requested author is not found" });
    else
        res.json({ 'totalCount': arr.length, 'Author': arr });
})
// To delete the quote
app.delete('/api/quotes', async (req, res) => {
    const {apikey,quote} = req.body;
    if(!apikey)
        return res.json({"error":"Api key is required"});
    const check=await validApi(apikey);
    if(!check)
        return res.json(errorJson());
    const del = await Quotes.findOneAndDelete({ tempQuote: quote.toLowerCase() });
    if (!del)
        res.json({ "error": "Requested quote is not found" })
    else
        res.json({ "success": "Successfully Deleted" })
});
// Error handler for wrong request
app.all('*', (req, res) => {
    res.status(400).json({ 'error': "Bad request" })
})
app.listen(3000, () => {
    console.log('listening')
})