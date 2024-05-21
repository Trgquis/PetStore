const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./router/web.js");
const connectDB = require("./config/connectDB.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let app = express();

app.use(cookieParser());
const customCors = function (req, callback) {
    const whitelist = ["http://localhost:3000", "http://localhost:8888"];
    let corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
        corsOptions = { origin: true, credentials: true }; // Chấp nhận yêu cầu từ trang web trong whitelist
    } else {
        corsOptions = { origin: false }; // Từ chối yêu cầu từ các trang web khác
    }
    callback(null, corsOptions);
};

app.use(cors(customCors));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();

let port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});
