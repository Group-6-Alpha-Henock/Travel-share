// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require("./config/connectToDb");
const TravelModel = require("./models/travel_model");

// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing

//////////////////////////////////////////////////////////
app.get("/travel", async(req,res)=> {
  
    // Find the travels
    const travel = await TravelModel.find();
  
    // Respond with them
    res.json({ travel });
  
});


///////////////////////////////////////////////////////////////
app.get("/travel/:id", async (req, res) => {
  
  // Get id off the url
  const travelId = req.params.id;

  // Find the note using that id
  const travel = await TravelModel.findById(travelId);

  // Respond with the travel
  res.json({ travel });
});



///////////////////////////////////////////////////////////////


app.post("/travel", async (req, res) => {
  // Get the sent in data off request body
  const { title, content } = req.body;

  // Create a travel with it
  const travel = await TravelModel.create({
    title,
    content,
  });

  // respond with the new note
  res.json({ travel });
});



///////////////////////////////////////////////////////////////////


app.put("/travel/:id", async (req, res) => {
  // Get the id off the url
  const travelId = req.params.id;

  // Get the data off the req body
  const { title, content } = req.body;

  // Find and update the travel record
  await TravelModel.findByIdAndUpdate(travelId, {
    title,
    content,
  });

  // Find updated travel
  const travel = await TravelModel.findById(travelId);

  // Respond with it
  res.json({ travel });
});





//////////////////////////////////////////////////////////////////////


app.delete("/travel/:id", async (req, res) => {
  // get id off url
  const travelId = req.params.id;

  // Delete the travel record
  await TravelModel.deleteOne({ id: travelId });

  // Respond with:
  res.json({ msg: "Record deleted" });
});




app.listen(process.env.PORT);
