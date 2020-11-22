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
  contentType: [
    {
      type: Object,
      name: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
  ],
  messages: {
    type: Object,
    crud: {
      type: Object,
      reserved: {
        type: String,
        required: true,
      },
      cancelCreate: {
        type: String,
        required: true,
      },
      cancelUpdate: {
        type: String,
        required: true,
      },
      cancelFalse: {
        type: String,
        required: true,
      },
      nameExisting: {
        type: String,
        required: true,
      },
      nameInvalid: {
        type: String,
        required: true,
      },
    },
    content: {
      type: Object,
      notFound: {
        type: String,
        required: true,
      },
    },
    list: {
      type: Object,
      title: {
        type: String,
        required: true,
      },
    },
    help: {
      type: Object,
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
        shortcutExample: {
          type: String,
          required: true,
        },
        shortcut: {
          type: String,
          required: true,
        },
      },
    },
  },
});

const messageModel = db.model('message', messageSchema, 'message');

export default messageModel;
