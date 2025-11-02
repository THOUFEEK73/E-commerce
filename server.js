import express from "express";
import userRoute from "./routes/userRoute.js";
import path from "path";
import connectDB from "./config/db.js";
import { fileURLToPath } from "url";
import { sessionMiddleware } from "./middleWare/sessionMiddleware.js";
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session - Middleware
app.use(sessionMiddleware)

// Static files
app.use(express.static("public"));



// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/user", userRoute);
// app.get('/admin',adminRoute);









await connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/user`);
});
