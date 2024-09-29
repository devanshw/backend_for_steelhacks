const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model.js'); // Assuming the schema is defined in user.model.js
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());
// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Test route to verify the backend is running
app.get('/', (req, res) => {
    res.send("Backend is running......");
});

// Create User API


app.post('/api/newuser', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// API to Fetch All Users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieves all users from the database
        res.status(200).json(users); // Sends back the list of users as JSON
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
});

// api to get specific user details
app.post('/api/getuserdetails', async (req, res) => {
    try {
      const { firstName } = req.body;
  
      // Find user by username
      const users = await User.find({});
      const user = users.find(user => user.firstName === firstName);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' }); // Use 404 for not found
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });




-
// Connect to MongoDB and start the server
mongoose.connect(
    'mongodb+srv://devanshw2004:q1vhvOqVWbyJ83tz@cluster0.ocsbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
)
    .then(() => {
        console.log('Connected to database');
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Connection failed:", error);
        process.exit(1);
    });
