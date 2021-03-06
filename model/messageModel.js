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
      selectOption: {
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
      createName: {
        type: String,
        required: true,
      },
      invalidValue: {
        type: String,
        required: true,
      },
      createSuccess: {
        type: String,
        required: true,
      },
      updateSuccess: {
        type: String,
        required: true,
      },
      deleteSuccess: {
        type: String,
        required: true,
      },
      shortcutFound: {
        type: String,
        required: true,
      },
      shortcutNotFound: {
        type: String,
        required: true,
      },
      updateCardTitle: {
        type: String,
        required: true,
      },
      updateCardText: {
        type: String,
        required: true,
      },
      deleteCardTitle: {
        type: String,
        required: true,
      },
      deleteCardText: {
        type: String,
        required: true,
      },
      finishCardTitle: {
        type: String,
        required: true,
      },
      finishCardText: {
        type: String,
        required: true,
      },
      confirmDeleteTitle: {
        type: String,
        required: true,
      },
      confirmDeleteText: {
        type: String,
        required: true,
      },
      newName: {
        type: String,
        required: true,
      },
      sameName: {
        type: String,
        required: true,
      },
      existingName: {
        type: String,
        required: true,
      },
      updateDescriptionCancel: {
        type: String,
        required: true,
      },
      invalidReactionTitle: {
        type: String,
        required: true,
      },
      invalidReactionText: {
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
      emptyTitle: {
        type: String,
        required: true,
      },
      emptyMessage: {
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
        cancel: {
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
    join: {
      type: Object,
      firstIn: {
        type: String,
        required: true,
      },
      notFirstIn: {
        type: String,
        required: true,
      },
    },
  },
});

const messageModel = db.model('message', messageSchema, 'message');

export default messageModel;
