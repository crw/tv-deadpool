import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { change } from 'redux-form'
import { toArray } from 'utils';
import * as api from 'api/redux';
import WagerFormContainer from 'admin/WagerFormContainer';


export class UserWagers extends React.Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
    wagers: PropTypes.array.isRequired,
    episodeId: PropTypes.string.isRequired
  }


  render() {
    const { user, wagers, episodeId } = this.props;

    return (
      <div>
        { wagers.map(wager => (
          <WagerFormContainer
            key={wager.id}
            formId={ `admin-wager-form-${wager.id}` }
            user={ user }
            episodeId={ episodeId }
            initialValues={ { ...wager, betId: wager.id } }/>
          ))
        }
      </div>
    );
  }
}


function mapStateToProps(state, props) {

  const { userId, episodeId } = props;
  const { bets, users } = state;

  return {
    user: users[userId],
    wagers: api.getWagersForEpisode(state, userId, episodeId)
  }

};

export default connect(mapStateToProps)(UserWagers);

