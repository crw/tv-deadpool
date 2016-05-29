import React from 'react';
import Navigation from 'Navigation';


var GoTApp = (props) => {
  return (
    <div>
      <Navigation />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};


module.exports = GoTApp;