import expect from 'expect';
import logsReducer from '../reducer';
import { fromJS } from 'immutable';

describe('logsReducer', () => {
  it('returns the initial state', () => {
    expect(logsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
