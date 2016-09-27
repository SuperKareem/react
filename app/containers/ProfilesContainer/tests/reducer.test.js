import expect from 'expect';
import profilesContainerReducer from '../reducer';
import { fromJS } from 'immutable';

describe('profilesContainerReducer', () => {
  it('returns the initial state', () => {
    expect(profilesContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
