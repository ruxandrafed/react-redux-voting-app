import {List, Map} from 'immutable';

export function setEntriesOriginal(state, entries) {
  return state.set('entries', entries);
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

function getWinners(vote) {
  if (!vote) return [];
  const [a, b] = vote.get('pair');
  const aVotes = vote.getIn(['tally', a], 0);
  const bVotes = vote.getIn(['tally', b], 0);
  if      (aVotes > bVotes)  return [a];
  else if (aVotes < bVotes)  return [b];
  else                       return [a, b];
}

export function next(state) {
  const entries = state.get('entries')
                       .concat(getWinners(state.get('vote')));
  /* It is generally a good idea in these state transformation
  functions to always morph the old state into the new one instead
  of building the new state completely from scratch.*/
  if (entries.size === 1) {
    return state.remove('vote')
      .remove('entries')
      .set('winner', entries.first());
  } else {
    return state.merge({
      vote: Map({pair: entries.take(2)}),
      entries: entries.skip(2)
    });
  }
}

/* Using updateIn makes this pleasingly succinct. What the code
expresses is "reach into the nested data structure path
['vote', 'tally', 'Trainspotting'], and apply this function there.
If there are keys missing along the path, create new Maps in their
place. If the value at the end is missing, initialize it with 0". /*
 */
export function vote(state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    tally => tally + 1
  );
}