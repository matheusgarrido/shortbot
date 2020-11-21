import db from '../service/databaseConnection.js';

const { Schema } = db;

const messageSchema = new Schema({
  language: {
    type: String,
    required: true,
  },
  countries: [
    {
      type: String,
    },
  ],
  messages: {
    type: 'object',
    help: {
      type: 'object',
      title: {
        type: String,
        required: true,
      },
      descriptions: {
        list: {
          type: String,
          required: true,
        },
        create: {
          type: String,
          required: true,
        },
        update: {
          type: String,
          required: true,
        },
      },
    },
  },
});

const messageModel = db.model('message', messageSchema, 'message');

export default messageModel;
