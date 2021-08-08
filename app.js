const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");

const staffRoutes = require("./server/routes/staffRoutes");
const connectDB = require("./server/database/server");
const { formatDate } = require("./server/services/hbs");
// load config
dotenv.config({ path: "./config/config.env" });

// connect to db
connectDB();

const app = express();

// body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// handlebars
app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

// routes
app.use("/", staffRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
