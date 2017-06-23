import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import firebase, {getUserRef} from 'app/api/firebase';
import * as ACTION_TYPE from 'redux/action_types';
import * as actions from 'actions';


describe('Actions', () => {

  describe('Static Actions', () => {
    it('should generate UPDATE_BETS_DATA action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_BETS_DATA,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateBetsData(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_EVENTS_DATA action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_EVENTS_DATA,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateEventsData(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_STATS_DATA action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_STATS_DATA,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateStatsData(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_LEADERBOARD_DATA action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_LEADERBOARD_DATA,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateLeaderboardData(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_USER action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_USER,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateUser(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_SECURE action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_SECURE,
        payload: {
          example: 'data'
        }
      };
      let res = actions.updateSecure(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_LABEL action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_LABEL,
        payload: {
          label: 'test label',
          data: 'test data'
        }
      };
      let res = actions.updateLabel(action.payload.label, action.payload.data);
      expect(res).toEqual(action);
    });

    it('should generate UPDATE_DISPLAY_NAME action', () => {
      let action = {
        type: ACTION_TYPE.UPDATE_DISPLAY_NAME,
        payload: {
          uid: 'testuid',
          displayName: 'testname'
        }
      };
      let res = actions.updateDisplayName(action.payload.uid, action.payload.displayName);
      expect(res).toEqual(action);
    });

    it('should generate SET_PREFERENCE action', () => {
      let action = {
        type: ACTION_TYPE.SET_PREFERENCE,
        payload: {
          context: 'test',
          pref: 'test',
          value: 'test'
        }
      };
      let res = actions.setPreference(action.payload.context, action.payload.pref, action.payload.value);
      expect(res).toEqual(action);
    });

    it('should generate SET_PREFERENCES action', () => {
      let action = {
        type: ACTION_TYPE.SET_PREFERENCES,
        payload: {
          context: 'test',
          prefs: {test: 'test'}
        }
      };
      let res = actions.setPreferences(action.payload.context, action.payload.prefs);
      expect(res).toEqual(action);
    });

    it('should generate LOGIN action', () => {
      var action = {
        type: 'LOGIN',
        payload: '1234'
      };
      var res = actions.login(action.payload);
      expect(res).toEqual(action);
    });

    it('should generate LOGOUT action', () => {
      var action = {type: 'LOGOUT'};
      var res = actions.logout();
      expect(res).toEqual(action);
    });

  });

  describe('Thunk Actions', () => {

    var createMockStore = configureMockStore([thunk]);
    var firebaseRef = firebase.database().ref();

    var userRef;
    var secureRef;
    var uid;
    var user = {
      balance: 1000,
      created_at: 1464953830373,
      displayName: "test name",
      id: "P0Uzz03ZhkMPlifeciK6k1iH4Ss2",
      wagers: {}
    };

    beforeEach((done) => {
      let credential = firebase.auth.GithubAuthProvider.credential(process.env.GITHUB_ACCESS_TOKEN);

      firebase.auth().signInWithCredential(credential).then((user) => {
        uid = user.uid;
        done();

      }, done);
    });

    // afterEach((done) => {
    //   firebaseRef.remove(() => done());
    // });

    // it('should start fetching bets data and generate UPDATE_BETS_DATA', (done) => {
    //   const store = createMockStore({});
    //   const action = actions.startBetsData();

    //   store.dispatch(action).then(() => {
    //     const mockActions = store.getActions();

    //     expect(mockActions[0]).toInclude({ type: ACTION_TYPE.UPDATE_BETS_DATA });
    //     expect(mockActions[0].payload).toBe(undefined);

    //     done();

    //   }).catch(done);
    // });

    it('should start fetching label data and generate UPDATE_LABEL', (done) => {
      const label = 'Test Label';
      const store = createMockStore({});
      const action = actions.startFetchLabel(label);

      store.dispatch(action).then(() => {
        const mockActions = store.getActions();

        expect(mockActions[0]).toInclude({ type: ACTION_TYPE.UPDATE_LABEL });
        expect(mockActions[0].payload).toInclude({ label });

        done();

      }).catch(done);
    });

    // it('should place wager and generate UPDATE_USER', (done) => {
    //   const wager = 50;
    //   const comment = 'foo';
    //   const betId = 'test-1-1';
    //   const store = createMockStore({login: {uid, user}});
    //   const action = actions.startPlaceWager(betId, wager, comment);

    //   store.dispatch(action).then(() => {
    //     const mockActions = store.getActions();

    //     expect(mockActions[0]).toInclude({ type: ACTION_TYPE.UPDATE_USER });

    //     done();

    //   }).catch(done);
    // });

  });


// export const startBetsData = () => {
// export const startEventsData = () => {
// export const startLeaderboardData = () => {
// export const startStatsData = () => {
// export const startFetchLabel = (label) => {
// export const startGetUser = (uid) => {
// export const startFetchLoginUser = () => {
// export const startUpdateDisplayName = (resolve, reject, uid, displayName) => {
// export const startPlaceWager = (betId, wager, comment) => {
// export const startLoginWith = (providerData) => {
// export const startLoginGoogle = () => {
// export const startLoginFacebook = () => {
// export const startLoginTwitter = () => {
// export const startLogout = () => {


});