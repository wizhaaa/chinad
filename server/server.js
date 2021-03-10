require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4747; 
const DB_URI = "mongodb://localhost:27017/";
const DB = "reactDB"; 

// Middleware
app.use(express.json());
app.use(express.urlencoded( {extended: true}));
app.use(cors());

// Establihs DB connection 
mongoose.connect(DB_URI + DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useFindAndModify: true, 
    connectTimeoutMS: 1000
});

const db = mongoose.connection; 

// Event listeners 
db.once('open', () => console.log('Connected to %{DB} database'));

// Create Schema 
let ItemSchema = new mongoose.Schema( 
    { 
        name: String, 
        price: Number 
    }, 
    { collection: "items" }
);

// Create Model 
let itemModel = db.model("ItemModel", ItemSchema); 

app.get("/api/people", (req, res) => {
    itemModel.find( {}, {__v: 0}, (err, docs) => {
        if (!err) { 
            res.json(docs); 
        } else {
            res.status(400).json({"error": err});
        }
    });
})

// Route to add Item
app.post("/api/person/add", (req, res) => {
    let item = new itemModel(req.body); 

    personalbar.save( (err, result) => { 
        if (!err) { 
            delete result._doc.__v; 
            res.json(result._doc);
        } else { 
            res.status(400).json( {'error': err});
        }
    });
})

app.listen(PORT, () => { 
    console.log(app.get("env").toUpperCase() + "Server started on port" + (PORT));
});