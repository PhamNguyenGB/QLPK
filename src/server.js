require('dotenv').config();
import express from "express";
import bodyParser from "body-parser";
// /user?id=7
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";

let app = express();

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 8888;
app.listen(port, () => {
    console.log('listening on port ' + port + ' http://localhost:' + port);
});