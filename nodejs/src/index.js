const express = require("express");
const bodyParser = require("body-parser");
const initWebRoutes = require("./router/web.js");
const connectDB = require("./config/connectDB.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
let app = express();

app.use(cookieParser());
// app.use(cors());
// app.use(
//     cors({
//         origin: "http://localhost:3000", // Chỉ cho phép truy cập từ domain này
//         credentials: true, // Cho phép gửi cookie qua các domain khác nhau
//     })
// );
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow all origins
            callback(null, origin);
        },
        credentials: true, // Allow cookies to be sent
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app);
connectDB();

let port = process.env.PORT;

app.listen(port, () => {
    console.log("Backend Nodejs is running on the port: " + port);
});
