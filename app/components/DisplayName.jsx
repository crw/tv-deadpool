import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getKey } from 'app/utils';
import { DEFAULT_DISPLAY_NAME } from 'app/constants/strings';
import DisplayNameForm from 'DisplayNameForm';
import { SubmissionError } from 'redux-form';
import { startUpdateDisplayName } from 'actions';


const ERROR_DISPLAYNAME = 'Please enter a name.';
const ERROR_DUPLICATE = (value) => { return `Sorry, "${value}" is not available`};


export class DisplayName extends React.Component {

  static propTypes = {
    displayName: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      editingName: false
    };
    this.handleEditStart = this.handleEditStart.bind(this);
    this.handleEditStop = this.handleEditStop.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleEditStart(e) {
    e.preventDefault();
    this.setState({
      editingName: true
    });
  }

  handleEditStop() {
    this.setState({
      editingName: false
    });
  }

  handleSubmit(values) {
    const { dispatch } = this.props;
    const { userId, displayName } = values;

    return dispatch(startUpdateDisplayName(userId, displayName)).then(() => {
      this.handleEditStop();
    }, (err) => {
      throw new SubmissionError({ _error: ERROR_DUPLICATE(displayName) });
    });
  };

  handleCancel() {
    this.handleEditStop();
  }

  render() {
    const {id, displayName} = this.props;
    const {editingName} = this.state;
    const initialValues = { userId: id, displayName };

    const renderDisplayName = () => {
      if (editingName) {
        return (
          <DisplayNameForm
            initialValues={initialValues}
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
          />
        );
      } else {
        return (
          <div className="player-display-name row small-collapse">
            <div className="small-11 columns">
              <i className="fa fa-fw fa-user"/>
              <span
                className="display-name"
                title="Edit name"
                onClick={this.handleEditStart}>{displayName || DEFAULT_DISPLAY_NAME}
              </span>
            </div>
            <div className="small-1 columns">
              <i
                className="fa fa-fw fa-pencil"
                title="Edit name"
                onClick={this.handleEditStart}
              />
            </div>
          </div>
        );
      }
    };

    return (
      <div className="player-balance container">
        {renderDisplayName()}
      </div>
    );
  }
}


function mapStateToProps (state) {
  const user = getKey(state, 'login.user', null);
  return {
    ...user
  };
};

export default connect(mapStateToProps)(DisplayName);
