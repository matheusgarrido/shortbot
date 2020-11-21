import db from '../service/databaseConnection.js';

const { Schema } = db;

const contentSchema = new Schema({
  idUser: {
    type: String,
    required: true,
  },
  idGuild: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    required: true,
    default: 'text',
  },
  value: {
    type: String,
    required: true,
  },
  privacity: {
    type: String,
    required: true,
    //Only in the current server
    default: 'private',
  },
});

const contentModel = db.model('content', contentSchema, 'content');

export default contentModel;
