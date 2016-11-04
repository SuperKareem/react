import expect from 'expect';
import mikrotikUserPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('mikrotikUserPageReducer', () => {
  it('returns the initial state', () => {
    expect(mikrotikUserPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
