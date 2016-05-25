export var updateBetsData = (updatedData) => {
  return {
    type: 'UPDATE_BETS_DATA',
    updatedData
  };
};

export var updateEventsData = (updatedData) => {
  return {
    type: 'UPDATE_EVENTS_DATA',
    updatedData
  };
};

export var updateUserData = (updatedData) => {
  return {
    type: 'UPDATE_USER_DATA',
    updatedData
  };
};

export var placeBet = (bet_id, wager, comment) => {
  return {
    type: 'PLACE_BET',
    bet_id,
    wager,
    comment
  };
};

export var setMoney = (newBalance) => {
  return {
    type: 'SET_MONEY',
    newBalance
  };
};

// export var updateLoggedinUser = (user_id) => {
//   return {
//     type: 'UPDATE_LOGGEDIN_USER',
//     user_id
//   };
// };
