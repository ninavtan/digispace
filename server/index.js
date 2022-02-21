const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRoutes = require('./routes/main');
const authRoutes = require("./routes/auth");
const path = require('path');
var cors = require('cors')


var router = express.Router();

mongoose.connect("mongodb://localhost/finalproject", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(router);

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Headers", "http://localhost:3000/");
//   res.header("Access-Control-Allow-Credentials", true);

//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header(
//     "Access-Control-Allow-Headers, Content-Type","Access-Control-Allow-Credentials, Content-Type",
//     "Origin, X-Requested-With, Content-Type, Accept, Set-Cookie"
//   );
//   next();
// });

const corsOptions = {
  credentials: true
}

// app.use(cors(corsOptions));

app.use(mainRoutes);
app.use('/', authRoutes);


app.get("/api", (req, res) => {
  res.json({message: "Hello from Express!"});
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

