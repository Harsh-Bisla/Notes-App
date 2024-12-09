const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
const router = require('./routes/user');
const URI = process.env.MONGO_URI;
const connectMongoDb = require('./dbConnection');
const cookieParser = require('cookie-parser');
const notesRouter = require('./routes/notes');
const cors = require('cors');


//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true               // Allow cookies
}));



//dbConnnection
connectMongoDb(`${URI}`)
    .then(() => console.log("Mongo Db Connected Successfully"))
    .catch((err) => console.log("Mongo Connection error", err));



app.use("/api", router);
app.use("/api", notesRouter);

app.listen(PORT, () => {
    console.log(`Server id running on the Port ${PORT}`);
})