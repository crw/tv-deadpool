// import configureMockStore from 'redux-mock-store';
// import thunk from 'redux-thunk';
import expect from 'expect';
// import firebase, {getUserRef} from 'api/firebase';
import * as actions from 'actions';

// var createMockStore = configureMockStore([thunk]);
// var firebaseRef = firebase.database().ref();


describe('Actions', () => {

  describe('Mass Update Actions', () => {
    it('should generate UPDATE_BETS_DATA action', () => {
      var action = {
        type: 'UPDATE_BETS_DATA',
        updatedData: {
          example: 'data'
        }
      };
      var res = actions.updateBetsData(action.updatedData);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_EVENTS_DATA action', () => {
      var action = {
        type: 'UPDATE_EVENTS_DATA',
        updatedData: {
          example: 'data'
        }
      };
      var res = actions.updateEventsData(action.updatedData);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_USER_DATA action', () => {
      var action = {
        type: 'UPDATE_USER_DATA',
        updatedData: {
          example: 'data'
        }
      };
      var res = actions.updateUserData(action.updatedData);
      expect(res).toEqual(action);
    });

  });

  describe('Data manipulators', () => {
    it('should generate PLACE_BET action', () => {
      var action = {
        type: 'PLACE_BET',
        bet_id: '123',
        wager: 30,
        comment: 'Some comment'
      };
      var res = actions.placeBet(action.bet_id, action.wager, action.comment);
      expect(res).toEqual(action);
    });

  });

  describe('Authentication Actions', () => {
    it('should generate LOGIN action', () => {
      var action = {
        type: 'LOGIN',
        token: 'abcd',
        uid: '1234'
      };
      var res = actions.login(action.uid, action.token);
      expect(res).toEqual(action);
    });

    it('should generate LOGOUT action', () => {
      var action = {type: 'LOGOUT'};
      var res = actions.logout();
      expect(res).toEqual(action);
    });

    it('should generate START_LOGIN_GOOGLE action', () => {
      var action = {type: 'START_LOGIN_GOOGLE'};
      var res = actions.startLoginGoogle();
      expect(res).toEqual(action);
    });

    it('should generate START_LOGOUT action', () => {
      var action = {type: 'START_LOGOUT'};
      var res = actions.startLogout();
      expect(res).toEqual(action);
    });

  });


});