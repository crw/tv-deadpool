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


  // describe('searchTextReducer', () => {
  //   it('should set searchText', () => {
  //     var action = {
  //       type: 'SET_SEARCH_TEXT',
  //       searchText: 'some search text'
  //     };
  //     var res = reducers.searchTextReducer(df(''), df(action));

  //     expect(res).toEqual(action.searchText);
  //   });
  // });
  // describe('showCompletedReducer', () => {
  //   it('should toggle showCompleted', () => {
  //     var action = {
  //       type: 'TOGGLE_SHOW_COMPLETED'
  //     };
  //     var res = reducers.showCompletedReducer(df(false), df(action));

  //     expect(res).toBe(true);
  //   });
  // });
  // describe('todoReducer', () => {
  //   it('should add new todo', () => {
  //     var action = {
  //       type: 'ADD_TODO',
  //       todo: {
  //         id: 1,
  //         text: ';foo;',
  //         completed: false,
  //         createdAt: 120,
  //         completedAt: undefined
  //       }
  //     };
  //     var res = reducers.todosReducer(df([]), df(action));

  //     expect(res.length).toBe(1);
  //     expect(res[0]).toEqual(action.todo);
  //   });

  //   it('should toggle completed when TOGGLE_TODO action is taken', () => {
  //     var state = [{
  //         id: '1',
  //         text: ';foo;',
  //         completed: false,
  //         createdAt: 120,
  //         completedAt: undefined
  //       }, {
  //         id: '2',
  //         text: 'bar',
  //         completed: false,
  //         createdAt: 300,
  //         completedAt: undefined
  //       }, {
  //         id: '3',
  //         text: 'wuzzle',
  //         completed: false,
  //         createdAt: 400,
  //         completedAt: undefined
  //     }];
  //     var action1 = {
  //       type: 'TOGGLE_TODO',
  //       todo: {
  //         id: '2',
  //         text: 'bar',
  //         completed: true,
  //         createdAt: 300,
  //         completedAt: 600
  //       }
  //     };
  //     var res = reducers.todosReducer(df(state), df(action1));
  //     expect(res[1].completed).toBe(true);
  //     expect(res[1].completedAt).toBeA('number');
  //     var action2 = {
  //       type: 'TOGGLE_TODO',
  //       todo: {
  //         id: '2',
  //         text: 'bar',
  //         completed: false,
  //         createdAt: 300,
  //         completedAt: undefined
  //       }
  //     };
  //     res = reducers.todosReducer(df(res), df(action2));
  //     expect(res[1].completed).toBe(false);
  //     expect(res[1].completedAt).toEqual(undefined);
  //   });

  //   it('should add existing todos', () => {
  //     var todos = [{
  //       id: '111',
  //       text: 'Anything',
  //       completed: false,
  //       completedAt: undefined,
  //       createdAt: 3000
  //     }];
  //     var action = {
  //       type: 'ADD_TODOS',
  //       todos
  //     };
  //     var res = reducers.todosReducer(df([]), df(action));

  //     expect(res.length).toEqual(1);
  //     expect(res[0]).toEqual(todos[0]);
  //   });

  //   it('should remove all todos on logout', () => {
  //     var todos = [{
  //       id: '111',
  //       text: 'Anything',
  //       completed: false,
  //       completedAt: undefined,
  //       createdAt: 3000
  //     }];
  //     var action = {
  //       type: 'LOGOUT'
  //     };
  //     var res = reducers.todosReducer(df([todos]), df(action));

  //     expect(res.length).toEqual(0);
  //   });

  // });

  // describe('loginReducer', () => {
  //   it('should set login data on login action', () => {
  //     var loginData = {
  //       token: 'sometoken',
  //       uid: 'someuid'
  //     };
  //     var action = {
  //       type: 'LOGIN',
  //       ...loginData
  //     };
  //     var res = reducers.loginReducer(undefined, df(action));
  //     expect(res).toEqual(loginData);
  //   });

  //   it('should unset login data on logout action', () => {
  //     var loginData = {
  //       token: 'sometoken',
  //       uid: 'someuid'
  //     };
  //     var action = {
  //       type: 'LOGOUT'
  //     };
  //     var res = reducers.loginReducer(df(loginData), df(action));
  //     expect(res).toEqual({});
  //   });
  // });

});