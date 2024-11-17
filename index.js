const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const http = require("http");
const { Server } = require("socket.io");

const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

const app = express();
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("sendMessage", (data) => {
    // Broadcast the new message to all clients
    io.emit("newMessage", data);
  });

  socket.on("updateMessageStatus", (data) => {
    // Broadcast the status update to all clients
    io.emit("messageStatusUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Setup Apollo Server
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.start().then(() => {
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const PORT = 4000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
});
