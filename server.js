const express = require("express");
// const logger = require('morgan');
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = require("./config/keys").mongoURI;

// CONNECT TO MONGO
mongoose
	.connect(db, { useUnifiedTopology: true, useNewUrlParser: true })
  	.then(() => console.log("M O N G O D B   C O N N E C T E D . . ."))
	  .catch((err) => console.log("[ E R R O R ]: " + err));
	  

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`S E R V E R   S T A R T E D   O N   P O R T ${port}`));