import expect from 'expect';
import serialsPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('serialsPageReducer', () => {
  it('returns the initial state', () => {
    expect(serialsPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
