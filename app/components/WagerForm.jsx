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
    e.preventDefault();
    let {id, dispatch} = this.props;
    let wager = parseInt(this.refs.wager.value, 10) || 0;
    let comment = this.refs.comment.value || '';

    if (wager >= 0) {
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
                <input ref="comment" className="" placeholder="Comment" type="text"/>
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