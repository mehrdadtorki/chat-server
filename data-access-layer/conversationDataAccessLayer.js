const db = require("../database/db");

const conversationDataAccessLayer = {
  getAllConversations: () => {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM conversations", [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  },

  createConversation: (participants) => {
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      db.run(
        "INSERT INTO conversations (participants, updatedAt) VALUES (?, ?)",
        [JSON.stringify(participants), updatedAt],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id: this.lastID, participants, updatedAt });
          }
        }
      );
    });
  },

  updateConversationLastMessage: (conversationId, lastMessageId) => {
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      db.run(
        "UPDATE conversations SET lastMessageId = ?, updatedAt = ? WHERE id = ?",
        [lastMessageId, updatedAt, conversationId],
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

module.exports = conversationDataAccessLayer;
