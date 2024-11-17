const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type AuthResponse {
    token: String!
    user: User!
  }

  type User {
    id: String!
    username: String!
    email: String!
    profileImage: String
  }

  type Message {
    id: ID!
    content: String!
    author: String!
    createdAt: String!
    status: String!
    title: String!
  }

  type Conversation {
    id: ID!
    participants: [String!]!
    lastMessageId: ID
    updatedAt: String!
  }

  type Query {
    getAllMessages(author: String, createdAt: String): [Message!]!
    getMessage(id: ID!): Message
    getAllConversations: [Conversation!]!
    getMessagesByConversation(conversationId: ID!): [Message!]!
  }

  type Mutation {
    userSignUpMutation(
      username: String!
      email: String!
      password: String!
      profileImage: String
    ): Boolean!

    userLoginMutation(
      username: String!
      email: String!
      password: String!
      profileImage: String
    ): AuthResponse!

    createConversation(participants: [String!]!): Conversation
    sendMessage(conversationId: ID!, content: String!, author: String!): Message
    updateMessageStatus(messageId: ID!, status: String!): Boolean
  }
`;

module.exports = typeDefs;
