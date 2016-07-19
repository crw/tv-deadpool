import expect from 'expect';
import df from 'deep-freeze-strict';
import * as actions from 'actions';
import * as reducers from 'reducers';


describe('Reducers', () => {

  const uid = 'P0Uzz03ZhkMPlifeciK6k1iH4Ss2';
  const user = {
    balance: 1000,
    created_at: 1464953830373,
    displayName: "test name",
    id: "P0Uzz03ZhkMPlifeciK6k1iH4Ss2",
    wagers: {}
  };
  const users = { [user.id]: user };


  describe('Mass Update Reducers', () => {

    const sampleData = [{example:'example1'},{example:'example2'}];

    it('should update bets data', () => {
      const action = actions.updateBetsData(sampleData);
      const res = reducers.bets(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

    it('should update events data', () => {
      const action = actions.updateEventsData(sampleData);
      const res = reducers.events(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

    it('should update leaderboard data', () => {
      const action = actions.updateLeaderboardData(sampleData);
      const res = reducers.leaderboard(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

  });

  describe('Users Reducers', () => {

    it('should update user data', () => {
      const payload = user;
      const action = actions.updateUser(payload);
      const res = reducers.users(undefined, df(action));
      expect(res).toEqual({[payload.id]: payload});
    });

    it('should update displayName', () => {
      const state = users;
      const payload = {uid, displayName: 'changed name'};
      const action = actions.updateDisplayName(payload.uid, payload.displayName);
      const res = reducers.users(df(state), df(action));
      expect(res[payload.uid].displayName).toEqual(payload.displayName);
    });

  });

  describe('Authentication Reducers', () => {

    it('should set login data on login action', () => {
      const payload = uid;
      const action = {
        type: 'LOGIN',
        payload
      };
      const res = reducers.login(undefined, df(action));
      expect(res).toEqual({uid: payload});
    });

    it('should update the login user data on updateUser action', () => {
      const state = {uid};
      const payload = user;
      const action = {
        type: 'UPDATE_USER',
        payload
      };
      const res = reducers.login(df(state), df(action));
      expect(res).toEqual({uid, user});
    });

    it('should unset login data on logout action', () => {
      const state = { uid, user };
      const action = { type: 'LOGOUT' };
      const res = reducers.login(df(state), df(action));
      expect(res).toEqual(null);
    });
  });

});