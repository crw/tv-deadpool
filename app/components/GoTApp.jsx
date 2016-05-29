import React from 'react';
import Navigation from 'Navigation';


var GoTApp = (props) => {
  return (
    <div>
      <Navigation />
      {props.children}
    </div>
  );
};


module.exports = GoTApp;