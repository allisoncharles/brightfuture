import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import dbConnect from "../../utils/mongo";
import typeDefs from "../../utils/typeDefs";
import resolvers from "../../utils/resolvers";
import processRequest from "graphql-upload/processRequest.mjs";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
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
