import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();
/* Since we also export the store, we can fire up a Node REPL
(with e.g. babel-node), require the index.js file and interact
with the application using the store. */

startServer(store);
/* we provide the store */