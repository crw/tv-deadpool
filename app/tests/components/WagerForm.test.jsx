import React from 'react';
import TestUtils from 'react-addons-test-utils';
import expect from 'expect';
// App includes
import * as actions from 'actions';
import {WagerForm} from 'WagerForm';


describe('WagerForm', () => {
  it('should exist', () => {
    expect(WagerForm).toExist();
  });

  it('should dispatch PLACE_BET on valid input', () => {
    var action = actions.placeBet('123', 40, 'test comment 1');
    var spy = expect.createSpy();
    var wagerForm = TestUtils.renderIntoDocument(<WagerForm id={action.bet_id} dispatch={spy}/>);

    wagerForm.refs.wager.value = action.wager;
    wagerForm.refs.comment.value = action.comment;
    TestUtils.Simulate.submit(wagerForm.refs.form);
    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(action);
  })

  it('should not dispatch PLACE_BET with a non-number wager', () => {
    var action = actions.placeBet('123', 'asdf', 'test comment 2');
    var spy = expect.createSpy();
    var wagerForm = TestUtils.renderIntoDocument(<WagerForm id={action.bet_id} dispatch={spy}/>);

    wagerForm.refs.wager.value = action.wager;
    wagerForm.refs.comment.value = action.comment;
    TestUtils.Simulate.submit(wagerForm.refs.form);
    expect(spy).toNotHaveBeenCalled();
  })

  it('should not dispatch PLACE_BET with a wager less than 0', () => {
    var action = actions.placeBet('123', -40, 'test comment 3');
    var spy = expect.createSpy();
    var wagerForm = TestUtils.renderIntoDocument(<WagerForm id={action.bet_id} dispatch={spy}/>);

    wagerForm.refs.wager.value = action.wager;
    wagerForm.refs.comment.value = action.comment;
    TestUtils.Simulate.submit(wagerForm.refs.form);
    expect(spy).toNotHaveBeenCalled();
  })

});