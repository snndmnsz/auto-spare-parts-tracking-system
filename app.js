const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require('cors');

const main = require("./routes/mainRoutes");
const app = express();

app.use(cors());
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));


app.use(main);

//app.use(errorController.get404);

app.listen(3000, () => console.log(`app listening on port 3000!`));
