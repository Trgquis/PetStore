const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./router/web.js");
const connectDB = require("./config/connectDB.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let app = express();

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
    cors({
        origin: "https://petstore-backend-pgof.onrender.com",
        credentials: true,
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});
