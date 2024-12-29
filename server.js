const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/listings.js');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utlis/wrapAsync');
const ExpressError = require('./utlis/ExpressError');
const { listSchema } = require('./listSchemaJoi');
require('dotenv').config();

main()
    .then((res) => {
        console.log("connection successfull");
    })
    .catch((err) => {
        console.log(err);
    })
async function main(){
    await mongoose.connect(process.env.DB_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}))
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "public")));

app.get('/', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings});
})

const validateListing = (req, res, next) => {
    const {error} = listSchema.validate(req.body);
    if(error){
        let errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(errMsg, 400);
    } else {
        next();
    }
}

// --- Index Route to show all listings--- //
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings});
})

// --- post new Listing --- //
// route for get request to add new post
app.get('/listings/add', (req, res) => {
    res.render("listings/addnew.ejs");
})
// post details to db
app.post('/listings', validateListing, wrapAsync(async (req, res, next) => {
    // let {title, description, image, price, location, country} = req.body;
    // let list = req.body.listing;
    // const newListing = new Listing(list);
    // console.log(newListing);
    // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');
}))


// show route to display a single listing information
app.get('/listings/:id', async (req, res) => {
    let { id } = req.params;
    let listdata = await Listing.findById(id);
    res.render("listings/show.ejs", {listdata});
})

// --- Editing Route --- //
// get edit request
app.get('/listings/:id/edit', async (req, res) => {
    let { id } = req.params;
    let listdata = await Listing.findById(id);
    res.render("listings/edit.ejs", { listdata });
})

// change details in DB
app.put('/listings/:id', validateListing, wrapAsync(async (req, res) => {
    let { id } = req.params;
    // if(!req.body.listing) throw new ExpressError('Add relevant details', 400);
    const updatedList = (req.body.listing);
    // console.log(updatedList);
    await Listing.findByIdAndUpdate(id, {...updatedList}, {runValidators : true, new : true});
    res.redirect(`/listings/${id}`);
}))

// Route to delete listings from DB
app.delete('/listings/:id', async (req, res) => {
    let { id } = req.params; 
    await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
})

app.use((err, req, res, next) => {
    const {message = "Something went wrong", statusCode = 500} = err;
    // res.status(statusCode).send(message);
    res.render("error.ejs", { message, statusCode});
})

app.listen(5050, () => {
    console.log("app listening on port 5050")
})