const sdk = require('node-appwrite');
const config = {
  project: 'test',
  endpoint: 'http://localhost/v1',
  key: 'd6606c6505f40a36c796193164e8afb9e6c51dba58c19ac0db2c6504de306fa1f4b92ea59a756d022a2ce6088c98e1d6da3817a6059db50bf4a6b8f6fb2e03324fb6e764208b0fa6a5ee4814386ff689064bb919d4eecd2a5dea63845994ecfa56493fb7425205f0d442ae8d66fe04e11e6996763f349e070ce4367a71990c6f',
};

// Init SDK
const client = new sdk.Client();

const database = new sdk.Database(client);

client
    .setSelfSigned(true)
    .setProject(config.project)
    .setKey(config.key)
    // .setJWT('jwt') // set this to authenticate using JWT
    .setEndpoint(config.endpoint)
;

const collectionName = 'tasks';
const read = ['role:all'];
const write = ['role:all'];

const promise = database.createCollection(collectionName, read, write);

promise.then(function(response) {
  console.log('success');
  database.createBooleanAttribute(response.$id, 'completed', true, false, false);
  database.createStringAttribute(response.$id, 'text', 255, true, '', false);
}, function(error) {
  console.log('error', error.type, error.message);
});

