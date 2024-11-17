const db = require("../database/db");

const messageDataAccessLayer = {
  getMessagesByConversationId: (conversationId) => {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM messages WHERE conversationId = ? ORDER BY createdAt ASC',
        [conversationId],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
  },

  createMessage: ({ conversationId, content, author }) => {
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      db.run(
        'INSERT INTO messages (conversationId, content, author, createdAt) VALUES (?, ?, ?, ?)',
        [conversationId, content, author, createdAt],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, conversationId, content, author, createdAt, status: 'sent' });
          }
        }
      );
    });
  },

  updateMessageStatus: (messageId, status) => {
    return new Promise((resolve, reject) => {
      db.run(
        'UPDATE messages SET status = ? WHERE id = ?',
        [status, messageId],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  },
};

module.exports = messageDataAccessLayer;

