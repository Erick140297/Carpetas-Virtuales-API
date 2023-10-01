import "dotenv/config";
import app from "./app";
import dbConnect from "./config/mongo";

const PORT = process.env.PORT || 3001;

dbConnect().then(() => console.log("connected to the database"));

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
