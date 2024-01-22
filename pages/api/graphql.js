import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import dbConnect from "../../utils/mongo";
import typeDefs from "../../utils/typeDefs";
import resolvers from "../../utils/resolvers";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => {
    await dbConnect();

    return {
      req,
      res,
    };
  },
});
