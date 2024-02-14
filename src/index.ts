import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRoutes";
import commentRoute from "./routes/commentRoutes";
import { initializeDB } from "./config/taskDB";

const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT || 3002;

app.use('/api/task', taskRoute);

initializeDB();


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
