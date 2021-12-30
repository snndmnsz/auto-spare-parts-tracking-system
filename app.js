const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require("express-session");
const Employee = require("./Model/Employee");

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



app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(async (req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  const username = req.session.user.Username;
  const password = req.session.user.Password;
  const user = await Employee.findByName(username, password);
  req.user = user[0][0];
  next();
});



app.use(system);
app.use(customer);
app.use(order);
app.use(part);
app.use(storage);

//app.use(errorController.get404);

app.listen(3000, () => console.log(`App running at http://localhost:3000/`));
