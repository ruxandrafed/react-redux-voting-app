import Server from 'socket.io';

export default function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );
  /* we subscribe a listener to the store that reads
  the current state, turns it into a plain JavaScript
  object, and emits it as a state event on the Socket.io
  server. The result will be that a JSON-serialized snapshot
  of the state is sent over all active Socket.io connections.
   */

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    /* In addition to sending a state snapshot whenever state
    changes, it will be useful for clients to immediately receive
    the current state when they connect to the application.
    That lets them sync their client-side state to the latest
    server state right away.*/

    socket.on('action', store.dispatch.bind(store));
    /* We also need to receive updates from the clients, so we
     have our clients emit 'action' events that feed directly
     into the Redux store. Keep in mind security considerations:
     we're allowing any client to dispatch actions into the store */
  });

}


//Our server now operates essentially like this:
//A client sends an action to the server.
//  The server hands the action to the Redux Store.
//  The Store calls the reducer and the reducer executes the logic related to the action.
//  The Store updates its state based on the return value of the reducer.
//  The Store executes the listener function subscribed by the server.
//  The server emits a 'state' event.
//  All connected clients - including the one that initiated the original action - receive the new state.
