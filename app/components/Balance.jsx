import React from 'react';
import {connect} from 'react-redux';
// App imports
import {getKey} from 'app/utils';
import {DEFAULT_DISPLAY_NAME} from 'app/constants/strings';


export class Balance extends React.Component {
  static propTypes = {
    balance: React.PropTypes.number,
    displayName: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      editingName: false
    };

    this.handleClickEditName = this.handleClickEditName.bind(this);
    this.handleClickCancelEditName = this.handleClickCancelEditName.bind(this);
  }

  componentDidUpdate() {
    let {editingName} = this.state;
    let {editname} = this.refs;

    if (editingName) {
      editname.focus();
    }
  }

  handleClickEditName(e) {
    e.preventDefault();
    this.setState({
      editingName: true
    });
  }

  handleClickCancelEditName(e) {
    e.preventDefault();
    let {editname} = this.refs;
    editname.value = '';
    this.setState({
      editingName: false
    });
  }

  handleSubmit() {
    return ;
  }

  render() {
    let {balance, displayName} = this.props;
    let {editingName} = this.state;
    let origDisplayName = displayName;

    displayName = displayName || DEFAULT_DISPLAY_NAME;
    balance = balance || 0;

    let renderDisplayName = () => {
      if (!editingName) {
        return (
          <div className="player-display-name">
            <i className="fa fa-fw fa-user"/>
            <span onClick={this.handleClickEditName} className="display-name">{displayName}</span>
          </div>
        );
      } else {
        let value = origDisplayName || '';
        return (
          <form onSubmit={this.handleSubmit}>
            <input type="text" ref="editname" placeholder="Change your name." value={value}/>
            <button className="button">Update</button>
            <button className="button" onClick={this.handleClickCancelEditName}>Cancel</button>
          </form>
        );
      }
    };

    return (
      <div className="player-balance container">
        {renderDisplayName()}
        <div className="balance-label">
          Balance
        </div>
        <div className="balance-value">
          ${balance.toLocaleString({currency: 'USD'})}
        </div>
      </div>
    );
  }
}

export default connect((state) => {
  let user = getKey(state, 'login.user', null);
  return {
    ...user
  };
})(Balance);