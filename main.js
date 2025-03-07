const express = require("express");
require("dotenv").config({path:"./.env"});
var cors = require('cors')
const bodyParser = require("body-parser");
const v1ApiPage = require("./routes/api/v1/indexPage");
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())



app.post("/api/v1/getcookie", async (req, res) => {v1ApiPage.PostIndex(req,res)})


app.listen(process.env.PORT || 7000, function (error) {
    if (error) {
        console.error("Error in starting server",error.message);   
    }
    console.log("Server is running on port:", process.env.PORT || 7000);
});
