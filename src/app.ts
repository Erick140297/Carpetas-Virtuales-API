import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(json());
app.use(router);

export default app;
