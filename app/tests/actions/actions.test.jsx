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

    it('should generate SET_MONEY action', () => {
      var action = {
        type: 'SET_MONEY',
        newBalance: 200
      }
      var res = actions.setMoney(action.newBalance);
      expect(res).toEqual(action);
    });

  });


  // describe('Thunk Actions', () => {

  //   var uid = 'abc123';
  //   var todosRef;
  //   var testTodoRef;
  //   var testTodoId;

  //   var testTodo = {
  //     text: 'Test startToggleTodo',
  //     completed: false,
  //     createdAt: 3000
  //   };

  //   beforeEach((done) => {
  //     console.log(process.env.FIREBASE_SERVICE_ACCOUNT_FILE);
  //     var token = firebase.auth().createCustomToken(uid);
  //     // var todosRef = firebaseRef.child('todos');

  //     firebase.auth().signInWithCustomToken(token).then(() => {
  //       todosRef = getUserRef(uid).child('todos');
  //     }, () => {
  //       todosRef = getUserRef(uid).child('todos');
  //     }).then(() => {
  //       return todosRef.remove();
  //     }).then(() => {
  //       testTodoRef = todosRef.push();
  //       return testTodoRef.set(testTodo);
  //     }).then(() => {
  //       testTodoId = testTodoRef.key;
  //       done();
  //     }, done);
  //   });

  //   afterEach((done) => {
  //     todosRef.remove((e) => done(e));
  //   });

  //   it('should create todo and dispatch ADD_TODO', (done) => {
  //     const store = createMockStore({login: {uid}});
  //     const todoText = 'My todo item';

  //     store.dispatch(actions.startAddTodo(todoText)).then(() => {
  //       const actions = store.getActions();
  //       expect(actions[0]).toInclude({
  //         type: 'ADD_TODO'
  //       });
  //       expect(actions[0].todo).toInclude({
  //         text: todoText
  //       });
  //       done();
  //     }).catch(done);
  //   });

  //   it('should toggle todo and dispatch TOGGLE_TODO action', (done) => {
  //     const store = createMockStore({
  //       login: {
  //         uid
  //       },
  //       todos: [{
  //         id: testTodoId,
  //         text: 'Test startToggleTodo',
  //         completed: false,
  //         completedAt: undefined,
  //         createdAt: 3000
  //       }]});

  //     store.dispatch(actions.startToggleTodo(testTodoId)).then(() => {
  //       const actions = store.getActions();

  //       testTodoRef.once('value').then((snapshot) => {
  //         var val = snapshot.val();
  //         expect(val.completed).toBe(true);
  //         expect(val.completedAt).toBeA('number');
  //         expect(actions[0]).toInclude({
  //           type: 'TOGGLE_TODO'
  //         });
  //         expect(actions[0].todo).toInclude({
  //           id: testTodoId,
  //           completed: true
  //         });
  //         done();
  //       }, done);
  //     }, done);
  //   });

  //   it('should fetch todos and generate ADD_TODOS action', (done) => {
  //     const store = createMockStore({login: {uid}});
  //     store.dispatch(actions.startAddTodos()).then(() => {
  //       const actions = store.getActions();
  //       expect(actions[0].type).toEqual('ADD_TODOS');
  //       expect(actions[0].todos.length).toBe(1);
  //       expect(actions[0].todos[0]).toInclude(testTodo);
  //       done();
  //     }, done);

  //   });

  // });

});