import expect from 'expect';
import mainPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('mainPageReducer', () => {
  it('returns the initial state', () => {
    expect(mainPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
