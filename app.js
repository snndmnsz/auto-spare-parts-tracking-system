const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const system = require("./routes/system");
const customer = require("./routes/customer");
const order = require("./routes/order");
const part = require("./routes/part");
const storage = require("./routes/storage");


const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(system);
app.use(customer);
app.use(order);
app.use(part);
app.use(storage);

//app.use(errorController.get404);

app.listen(3000, () => console.log(`App running at http://localhost:3000/`));
