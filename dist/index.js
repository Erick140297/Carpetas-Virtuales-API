"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const mongo_1 = __importDefault(require("./config/mongo"));
const PORT = process.env.PORT || 3001;
(0, mongo_1.default)().then(() => console.log("connected to the database"));
app_1.default.listen(PORT, () => console.log(`API listening on port ${PORT}`));
