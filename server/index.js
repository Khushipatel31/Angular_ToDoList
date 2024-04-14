const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const routes = require("./routes/userRoutes")


dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

app.use(cors({ maxAge: 3600 }));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: false }));

app.use("/", routes);


require("./utils/dbConfig").getDBConnection();

const server = app.listen(port, () => {
    console.log(`Server is running at port ${port} `);
});
