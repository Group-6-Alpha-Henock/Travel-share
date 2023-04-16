// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_TOKEN = "bunchOfRandomCharactersYouCanPutWhatEverYouWantHere";

const connectToDb = require("./config/connectToDb");
const TravelModel = require("./models/travel_model");
const UserDetailModel = require("./models/SignUp_model");
// Create an express app
const app = express();

// Configure express app
app.use(express.json());
app.use(cors());

// Connect to database
connectToDb();

// Routing

//////////////////////////////////////////////////////////
app.get("/travel", async (req, res) => {
  // Find the travels
  const travel = await TravelModel.find();

  // Respond with them
  res.json({ travel });
});

///////////////////////////////////////////////////////////////
app.get("/travel/:id", async (req, res) => {
  // Get id off the url
  const travelId = req.params.id;

  // Find the id using that id
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

//Login and signup form routing
//1 post api
//here we are registering our user
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;
  const bcryptPassword = await bcrypt.hash(password, 10);

  try {
    const alreadyUser = await UserDetailModel.findOne({ email });
    if (alreadyUser) {
      return res.send({
        error: "this email is already registered to an account",
      });
    }

    await UserDetailModel.create({
      fname,
      lname,
      email,
      password: bcryptPassword,
    });
    res.send({ status: "ok" });
    console.log("user created sucessfully");
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.listen(process.env.PORT);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserDetailModel.findOne({ email });
  if (!user) {
    return res.json({ error: "no account found registered to this email" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_TOKEN);
    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "wrong password" });
});

//api to get user data
app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_TOKEN);
    const userEmail = user.email;
    user
      .findOne({ email: userEmail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    console.log({ error: "error fetching userData" });
  }
});
