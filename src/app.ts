import express, { Application } from "express" 
import * as path from "path";
import cors from "cors";
import helmet from "helmet";
import router from "./routes";

const app: Application = express() 
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(router)

export default app