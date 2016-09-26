import expect from 'expect';
import networkPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('networkPageReducer', () => {
  it('returns the initial state', () => {
    expect(networkPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
