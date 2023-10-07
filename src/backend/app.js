const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", cors(), (req,res) => {

})

app.post("/", async(req,res) => {
    const {email, password,  username} = req.body

    try{
        const user = await collection.findOne({ email: email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(isPasswordValid);
      
      if (isPasswordValid) {
        res.json("valid");
      } else {
        res.json("invalid");
      }
    } else {
      res.json("notexist");
    }
  } catch (e) {
    res.json("error");
  }
});


app.post("/signup", async(req,res) => {
    const {email, password, username} = req.body

    const data = {
        email: email,
        password: password,
        username
    }

    try{
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const data = {
      email: email,
      password: hashedPassword, // Store hashed password
      username
    };

    const check = await collection.findOne({ email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("error");
  }
});

app.listen(8000, () => {
  console.log("port connected");
});