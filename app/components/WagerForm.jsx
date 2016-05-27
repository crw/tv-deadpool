import React from 'react';
import {connect} from 'react-redux';
// App imports
import {placeBet} from 'actions';

export class WagerForm extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var wager = parseInt(this.refs.wager.value, 10);
    var comment = this.refs.comment.value;

    if (typeof wager === 'number' && wager >= 0) {
      this.props.dispatch(placeBet(this.props.id, wager, comment));
      this.refs.wager.value = '';
      this.refs.comment.value = '';
    }
  }

  render() {
    return (
      <form ref="form" onSubmit={this.handleSubmit}>
        <label>
          <input type="text" ref="wager" placeholder="Wager in dollars."/>
        </label>
        <label>
          <input type="text" ref="comment" placeholder="Notes about this wager."/>
        </label>
        <button type="submit" className="button">Wager</button>
      </form>
    );
  }
}

export default connect()(WagerForm);