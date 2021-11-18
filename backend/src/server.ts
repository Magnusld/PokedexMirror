import {ApolloServer} from 'apollo-server';
import {schema} from './schema';
import {context} from './context';

export function apolloServer() {
    return new ApolloServer({
        schema: schema,
        context: context,
    });
}
