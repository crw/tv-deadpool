import React from 'react';
import Navigation from 'Navigation';


var App = (props) => {
  return (
    <div>
      <Navigation />
      <div className="content">
        {props.children}
      </div>
    </div>
  );
};


module.exports = App;