import expect from 'expect';
import userSignInReducer from '../reducer';
import { fromJS } from 'immutable';

describe('userSignInReducer', () => {
  it('returns the initial state', () => {
    expect(userSignInReducer(undefined, {})).toEqual(fromJS({}));
  });
});
