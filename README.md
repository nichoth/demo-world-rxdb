> To synchronize data between your clients and your server, RxDB provides replication modules for CouchDB and GraphQL.

The hasura demo uses a postgres DB from heroku

-------------------------------------------------

Doing what it says here: https://rxdb.info/rx-schema.html

attachments: https://rxdb.info/rx-attachment.html

sync: https://rxdb.info/replication.html

indexDB limits: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria#Storage_limits

rxdb depends on a server-side database; indexedDB is used like a local cache. Hence the postgres in the hasura example

Need to be able to delete data and not count on it being there -- this is something new for for flumeDB -- able to 'jump in' at any point in the merkle tree, just see the data that you care about

------------------------------------------------------

## 11-8-2020
Notes from https://rxdb.info/replication-graphql.html

* import a plugin to sync with graphql
```js
import { addRxPlugin } from 'rxdb'
import { RxDBReplicationGraphQLPlugin }
    from 'rxdb/plugins/replication-graphql';
addRxPlugin(RxDBReplicationGraphQLPlugin);
```

* For the pull-replication, you first need a `pullQueryBuilder`
* make a pull-query-builder, then you can then setup the pull-replication
```js
const replicationState = myCollection.syncGraphQL({
    url: 'http://example.com/graphql', // url to the GraphQL endpoint
    pull: {
        queryBuilder: pullQueryBuilder, // the queryBuilder from above
        modifier: doc => doc // (optional) modifies all pulled documents before they are handeled by RxDB. Returning null will skip the document.
    },
    deletedFlag: 'deleted', // the flag which indicates if a pulled document is deleted
    live: true // if this is true, rxdb will watch for ongoing changes and sync them, when false, a one-time-replication will be done
});
```

* For the push-replication, you also need a queryBuilder. Then setup the push-replication.
```js
const replicationState = myCollection.syncGraphQL({
    url: 'http://example.com/graphql', // url to the GraphQL endpoint
    push: {
        queryBuilder: pushQueryBuilder, // the queryBuilder from above
        batchSize: 5, // (optional) amount of documents that will be send in one batch
        modifier: d => d // (optional) modifies all pushed documents before they are send to the GraphQL endpoint. Returning null will skip the document.
    },
    deletedFlag: 'deleted', // the flag which indicates if a pulled document is deleted
    live: true // if this is true, rxdb will watch for ongoing changes and sync them
});
```

* it is recommended to setup GraphQL Subscriptions which will trigger the replication cycle when a change happens on the server

```js
import {
    SubscriptionClient
} from 'subscriptions-transport-ws';
// ... see webpage
// https://rxdb.info/replication-graphql.html#using-subscriptions
```

RxDB provides the helper functions `graphQLSchemaFromRxSchema()`, `pullQueryBuilderFromRxSchema()` and `pushQueryBuilderFromRxSchema()` that can be used to generate the GraphQL Schema from the RxJsonSchema. See https://github.com/pubkey/rxdb/tree/master/examples/graphql

-------------------------------------------------

[RxDB GraphQL example](https://github.com/pubkey/rxdb/tree/master/examples/graphql)
This is an example usage of RxDB with with the graphql-replication-plugin. It represents a simple hero-list which is two-way-replicated with the server.

[dont know what this is](https://www.apollographql.com/blog/full-stack-react-graphql-tutorial-582ac8d24e3b/)

### todo
Try this with netlify/fauna

https://www.inkandswitch.com/local-first.html
https://www.inkandswitch.com/cambria.html






