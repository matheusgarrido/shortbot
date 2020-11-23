import db from "../service/databaseConnection.js";

const { Schema } = db;

const guildSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
    default: true,
  },
  currentShortcut: {
    type: Object,
    id: {
      type: String,
    },
    idMessage: {
      type: String,
    },
    idChannel: {
      type: String,
    },
    state: {
      type: String,
    },
  },
});

const guildModel = db.model("guild", guildSchema, "guild");

export default guildModel;
