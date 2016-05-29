import React from 'react';
import {connect} from 'react-redux';
// App imports
import {startPlaceWager} from 'actions';

export class WagerForm extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let {id, dispatch} = this.props;
    var wager = parseInt(this.refs.wager.value, 10);
    var comment = this.refs.comment.value;
// var comment = parseInt(this.refs.comment.value, 10);
    e.preventDefault();
    if (typeof wager === 'number' && wager >= 0) {
      // dispatch(testPlaceWager(id, wager, comment));
      dispatch(startPlaceWager(id, wager, comment));
      this.refs.wager.value = '';
      this.refs.comment.value = '';
    }
  }

  render() {
    return (
      <div className="wager-form">
        <form ref="form" onSubmit={this.handleSubmit}>
          <div className="row small-collapse">
            <div className="small-3 columns">
              <input ref="wager" className="" placeholder="Wager" type="number"/>
            </div>
            <div className="small-6 columns">
                <input ref="comment" className="" placeholder="Notes" type="text"/>
            </div>
            <div className="small-3 columns">
              <input type="submit" className="secondary button" value="Place Bet"/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(WagerForm);