import db from '../helper/databaseConnection.js';

const { Schema } = db;

const guildSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
});

const guildModel = db.model('guild', guildSchema, 'guild');

export default guildModel;
