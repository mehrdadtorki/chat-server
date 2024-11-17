const messageDataAccessLayer = require("../data-access-layer/messageDataAccessLayer");
const conversationDataAccessLayer = require("../data-access-layer/conversationDataAccessLayer");
const userDataAccessLayer = require("../data-access-layer/userDataAccessLayer");

const resolvers = {
  Query: {
    getAllConversations: async () => {
      return await conversationDataAccessLayer.getAllConversations();
    },
    getMessagesByConversation: async (_, { conversationId }) => {
      return await messageDataAccessLayer.getMessagesByConversationId(
        conversationId
      );
    },
  },

  Mutation: {
    userSignUpMutation: async (
      _,
      { username, email, password, profileImage }
    ) => {
      return userDataAccessLayer.userRegistration({
        username,
        email,
        password,
        profileImage,
      });
    },
    userLoginMutation: async (
      _,
      { username, email, password, profileImage }
    ) => {
      return userDataAccessLayer.userLogin({
        username,
        email,
        password,
        profileImage,
      });
    },

    createConversation: async (_, { participants }) => {
      return await conversationDataAccessLayer.createConversation(participants);
    },
    sendMessage: async (_, { conversationId, content, author }) => {
      const message = await messageDataAccessLayer.createMessage({
        conversationId,
        content,
        author,
      });
      await conversationDataAccessLayer.updateConversationLastMessage(
        conversationId,
        message.id
      );

      // Emit message via WebSocket
      io.emit("newMessage", { conversationId, message });

      return message;
    },
    updateMessageStatus: async (_, { messageId, status }) => {
      await messageDataAccessLayer.updateMessageStatus(messageId, status);

      // Emit status update via WebSocket
      io.emit("messageStatusUpdate", { messageId, status });

      return true;
    },
  },
};

module.exports = resolvers;
