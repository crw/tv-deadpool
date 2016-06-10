import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
// App imports
import {LOCALE, CURRENCY_FORMAT} from 'app/constants/formats';
import {getKey} from 'app/utils';
import {DEFAULT_DISPLAY_NAME} from 'app/constants/strings';
import DisplayNameForm from 'DisplayNameForm';

export class Balance extends React.Component {
  static propTypes = {
    balance:     PropTypes.number,
    displayName: PropTypes.string
  };


  constructor(props) {
    super(props);

    this.state = {
      editingName: false
    };

    this.handleEditName = this.handleEditName.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleEditName(e) {
    e.preventDefault();
    this.setState({
      editingName: true
    });
  }

  handleCancel() {
    this.setState({
      editingName: false
    });
  }

  render() {
    const {id, balance, displayName} = this.props;
    const {editingName} = this.state;
    const initialValues = { userId: id };

    let renderDisplayName = () => {
      if (editingName) {
        return (
          <DisplayNameForm initialValues={initialValues} nameValue={displayName} onCancel={this.handleCancel}/>
        );
      } else {
        return (
          <div className="player-display-name row small-collapse">
            <div className="small-11 columns">
              <i className="fa fa-fw fa-user"/>
              <span className="display-name" title="Edit name" onClick={this.handleEditName}>{displayName || DEFAULT_DISPLAY_NAME}</span>
            </div>
            <div className="small-1 columns">
              <i className="fa fa-fw fa-pencil" title="Edit name" onClick={this.handleEditName} />
            </div>
          </div>
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
          {(balance || 0).toLocaleString(LOCALE, CURRENCY_FORMAT)}
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