import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return vote(state, action.entry)
  }
  return state;
}

/* What is interesting about the way this reducer works is how
it can be generically used to take the application from one state
to the next, given any type of action. Actually, given a collection
of past actions, you can actually just reduce that collection into
the current state. That's why the function is called a reducer:
It fulfills the contract of a reduce callback function. */