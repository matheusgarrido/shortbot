import mongoose from 'mongoose';
import dotenv from 'dotenv';

//Config
dotenv.config();

//Consts
const { URL_DB } = process.env;

//Connection
mongoose.connect(URL_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

export default mongoose;
