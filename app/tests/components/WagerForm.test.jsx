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

  it('should dispatch startPlaceWager on valid input', () => {
    const betId = '123';
    const wager = 40
    const comment = 'Foo';
    let action = actions.startPlaceWager(betId, wager, comment);
    let spy = expect.createSpy();
    let wagerForm = TestUtils.renderIntoDocument(<WagerForm id={betId} dispatch={spy}/>);

    wagerForm.refs.wager.value = wager;
    wagerForm.refs.comment.value = comment;
    TestUtils.Simulate.submit(wagerForm.refs.form);
    // expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(action);
  })

  it('should not dispatch startPlaceWager with a wager less than 0', () => {
    const betId = '123';
    const wager = -40
    const comment = 'Foo';
    let spy = expect.createSpy();
    let wagerForm = TestUtils.renderIntoDocument(<WagerForm id={betId} dispatch={spy}/>);

    wagerForm.refs.wager.value = wager;
    wagerForm.refs.comment.value = comment;
    TestUtils.Simulate.submit(wagerForm.refs.form);
    expect(spy).toNotHaveBeenCalled();
  })

});