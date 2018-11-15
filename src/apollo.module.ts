import { TypeGraphQLModule, SchemaBuilder } from 'nest-type-graphql';
import { Module, OnModuleInit } from '@nestjs/common';
import { ApplicationReferenceHost } from '@nestjs/core';
import { ApolloServer } from 'apollo-server-express';

@Module({
  imports: [TypeGraphQLModule],
})
export class ApolloMdoule implements OnModuleInit {
  apolloServer: ApolloServer;
  constructor(
    private readonly appRefHost: ApplicationReferenceHost,
    private readonly graphQLFactory: SchemaBuilder,
  ) {}
  async onModuleInit() {
    if (!this.appRefHost) {
      return;
    }

    const httpServer = this.appRefHost.applicationRef;
    if (!httpServer) {
      return;
    }

    const app = httpServer.getInstance();
    const schema = await this.graphQLFactory.build();

    this.apolloServer = new ApolloServer({
      schema,
      context: ({ req }) => ({ req }),
      playground: true,
    });
    this.apolloServer.applyMiddleware({
      app,
    });
  }
}
