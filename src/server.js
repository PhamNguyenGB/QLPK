require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
// /user?id=7
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDb from "./config/connectDB";
import methodOverride from "method-override";

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

viewEngine(app);
initWebRoutes(app);

connectDb();

let port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log('listening on port ' + port + ' http://localhost:' + port);
});