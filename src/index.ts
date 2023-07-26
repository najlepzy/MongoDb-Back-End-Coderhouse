import express, {ErrorRequestHandler, RequestHandler} from "express";
import dotenv from "dotenv";
import { initMongooseDb } from "../config/database";
import UserController from "./controllers/UserController"
import path from "path";
import {customResponseFormatter, customErrorResponseFormatter} from './middlewares/customErrorFormatter'

const envPath = path.resolve(__dirname, "../src/.env");
dotenv.config({ path: envPath }).parsed;

const app = express();
// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(((req,res,next)=>{customResponseFormatter(req,res,next)}) as RequestHandler);
initMongooseDb();

app.post("/signup", UserController.signUp);
app.post("/login", UserController.logIn);


// Error middleware
app.use(((err,req,res,next)=>{customErrorResponseFormatter(err,req,res)}) as ErrorRequestHandler);

// RUNNING SERVER --
if(!process.env.API_PORT)
  throw Error("API PORT is not configured. Please check .env file")
if(!process.env.API_ADDRESS)
  throw Error("API ADDRESS is not configured. Please check .env file")

app.listen(parseInt(process.env.API_PORT), process.env.API_ADDRESS, () => {
  console.log(`\n[OK] - Server running  ${process.env.API_ADDRESS}:${process.env.API_PORT}`);
});
