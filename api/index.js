const express = require("express")
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const movieRoute = require("./routes/movies");


dotenv.config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('process.env.mongodb+srv://brianpompey:Melissa1217@cluster0.tp6xn.mongodb.net/netflix?retryWrites=true&w=majority');

    console.log("DB Connection Successful");

  }

app.use(express.json());

app.use("/app/auth", authRoute);
app.use("/app/users", userRoute);
app.use("/api/movies", movieRoute);

app.listen(8800, ()=>{
    console.log("Backend Server is running!")
});
