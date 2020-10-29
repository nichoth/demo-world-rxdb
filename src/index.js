import {
  createRxDatabase,
  RxDatabase,
  addRxPlugin
} from 'rxdb'
var pouch = require('pouchdb-adapter-idb')
var myHeroSchema = require('./heros.json')

addRxPlugin(pouch)

createRxDatabase({
    name: 'heroesdb',           // <- name
    adapter: 'idb',          // <- storage-adapter
    password: 'myPassword',     // <- password (optional)
    multiInstance: true,         // <- multiInstance (optional, default: true)
    eventReduce: false // <- eventReduce (optional, default: true)
}).then(async function (db) {
    console.log('db', db)
    db.$.subscribe(changeEvent => console.log(changeEvent));

    await db.collection({
        name: 'heroes',
        schema: myHeroSchema
    });
    console.log('name', db.heroes.name);
})
