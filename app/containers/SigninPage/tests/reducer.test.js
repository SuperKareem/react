import expect from 'expect';
import signinPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('signinPageReducer', () => {
  it('returns the initial state', () => {
    expect(signinPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
