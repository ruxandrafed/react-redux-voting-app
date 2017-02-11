import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote',
        voteState => vote(voteState, action.entry));
    /* The main reducer function only hands parts of the state
    to lower-level reducer functions. We separate the job of
    finding the right location in the state tree from applying
    the update to that location. */
  }
  return state;
}

/* What is interesting about the way this reducer works is how
it can be generically used to take the application from one state
to the next, given any type of action. Actually, given a collection
of past actions, you can actually just reduce that collection into
the current state. That's why the function is called a reducer:
It fulfills the contract of a reduce callback function. */