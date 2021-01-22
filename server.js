require('dotenv').config();
const app = require('express')();
const cors = require('cors');
// body parser er notað fyrir POST
const bodyParser = require('body-parser');

let PORT = process.env.PORT || 5000;

// connecting to the MongoDB - passw: user - dbname: articleapp
const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://user:user@cluster0.txdfx.mongodb.net/articleapp?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true });

app.use(cors());
app.use(bodyParser.json());

// getting the data from the DB and displaying it on the dom
app.get('/api', (req, res) => {
  client.connect(async (err) => {
    const collection = client.db('articleapp').collection('articles');
    const data = await collection.find().toArray();
    res.send(JSON.stringify(data));
  });
});

app.post('/', (req, res) => {
    console.log(req.body);
    client.connect(async (err)=> {
        const collection = client.db('articleapp').collection('articles');
        collection.insertOne(req.body);
    });
});

app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`);
});
