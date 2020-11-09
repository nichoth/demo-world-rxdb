import {
  createRxDatabase,
//   RxDatabase,
  addRxPlugin,
//   removeRxDatabase
} from 'rxdb'
import { RxDBReplicationGraphQLPlugin } from
    'rxdb/plugins/replication-graphql'
var pouchAdapter = require('pouchdb-adapter-idb')
var myHeroSchema = require('./heros.json')

addRxPlugin(RxDBReplicationGraphQLPlugin);
// addRxPlugin(pouchAdapter)

createRxDatabase({
    name: 'heroesdb' + new Date().getTime(),           // <- name
    adapter: 'idb',          // <- storage-adapter
    password: 'myPassword',     // <- password (optional)
    multiInstance: true,         // <- multiInstance (optional, default: true)
    eventReduce: false // <- eventReduce (optional, default: true)
}).then(async function (db) {
    console.log('*db*', db)

    db.$.subscribe(changeEvent => console.log('*change*', changeEvent));

    await db.collection({
        name: 'heroes',
        schema: myHeroSchema
    })
    console.log('*name*', db.heroes.name);

    var collection = db.heroes

    const doc = await collection.insert({
        name: 'foo',
        color: 'blue',
        birthyear: 1986
    });
    console.log('*doc*', doc)
})

// const attachment = await myDocument.putAttachment({
//     id,     // string, name of the attachment like 'cat.jpg'
//     data,   // (string|Blob|Buffer) data of the attachment
//     type    // (string) type of the attachment-data like 'image/jpeg'
// });

