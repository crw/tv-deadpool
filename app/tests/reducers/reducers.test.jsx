import expect from 'expect';
import df from 'deep-freeze-strict';
import * as actions from 'actions';
import * as reducers from 'reducers';


describe('Reducers', () => {

  describe('Mass Update Reducers', () => {

    var sampleData = [{example:'example1'},{example:'example2'}];

    it('should update bets data', () => {
      var action = actions.updateBetsData(sampleData);
      var res = reducers.betsReducer(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

    it('should update events data', () => {
      var action = actions.updateEventsData(sampleData);
      var res = reducers.eventsReducer(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

    it('should update user data', () => {
      var action = actions.updateUserData(sampleData);
      var res = reducers.userReducer(undefined, df(action));
      expect(res).toEqual(sampleData);
    });

  });

  describe('Place Bet', () => {
    it('should place bet and update balance when bet can be covered', () => {
      var state = {
        balance: 100,
        bets: []
      }
      var action = actions.placeBet('123', 40, 'test comment');
      var res = reducers.userReducer(df(state), df(action));
      expect(res.bets.length).toBe(1);
      expect(res.balance).toBe(60);
      expect(res.bets[0].amount).toBe(40);
      expect(res.bets[0].comment).toBe(action.comment);
    });

    it('should not make changes when bet cannot be covered', () => {
      var state = {
        balance: 100,
        bets: []
      }
      var action = actions.placeBet('123', 101, 'test comment');
      var res = reducers.userReducer(df(state), df(action));
      expect(res.bets.length).toBe(0);
      expect(res.balance).toBe(100);
    });

    it('should update existing bet and tweak balance', () => {
      var state = {
        balance: 70,
        bets: [{
          'id': 'test1',
          amount: 30,
          comment: 'test comment 1'
        }]
      }
      var action = actions.placeBet('test1', 40, 'test comment 2');
      var res = reducers.userReducer(df(state), df(action));
      expect(res.bets.length).toBe(1);
      expect(res.balance).toBe( (state.balance + state.bets[0].amount) - action.wager);
      expect(res.bets[0].amount).toBe(action.wager);
      expect(res.bets[0].comment).toBe(action.comment);
    });
  });

  describe('Set money', () => {
    it('should update the balance', () => {
      var state = {balance: 70};
      var action = actions.setMoney(100);
      var res = reducers.userReducer(df(state), df(action));
      expect(res.balance).toBe(100);
    });

  });

  describe('Authentication Reducers', () => {
    it('should set login data on login action', () => {
      var loginData = {
        token: 'sometoken',
        uid: 'someuid'
      };
      var action = {
        type: 'LOGIN',
        ...loginData
      };
      var res = reducers.loginReducer(undefined, df(action));
      expect(res).toEqual(loginData);
    });

    it('should unset login data on logout action', () => {
      var loginData = {
        token: 'sometoken',
        uid: 'someuid'
      };
      var action = {
        type: 'LOGOUT'
      };
      var res = reducers.loginReducer(df(loginData), df(action));
      expect(res).toEqual({});
    });
  });

});