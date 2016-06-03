import React from 'react';
import {connect} from 'react-redux';
// App imports
import {getKey, sortObjectsByKey} from 'app/utils';
import {startGetUser} from 'actions';


export class Leaderboard extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  static defaultProps = {
    label: 'AVClub Staffers',
    members: [
      'avclub-staffer-1',
      'avclub-staffer-2',
      'avclub-staffer-3',
      'avclub-staffer-4',
      'avclub-staffer-5',
      'avclub-staffer-6',
      'avclub-staffer-7',
      'avclub-staffer-8',
      'avclub-staffer-9',
      'avclub-staffer-10'
    ]
  }

  constructor(props) {
    super(props);

  }

  componentDidMount() {

    let {dispatch, users, members} = this.props;
    if (users.length === 0) {
      members.forEach((member) => {
        dispatch(startGetUser(member));
      });
    }
  }

  render() {

    const {users, label} = this.props;

    const renderLeaders = () => {
      if (users.length === 0) {
        return <div/>;
      }
      return users.sort(sortObjectsByKey('balance', true)).map((user) => {
        return (
          <div key={user.id}>
            ${user.balance.toLocaleString()} - {user.displayName}
          </div>
        );
      });
    };

    return (
      <div className="leaderboard">
        <div className="title">
          {label}
        </div>
        <div className="standings">
          {renderLeaders()}
        </div>
      </div>
    );
  }
}


export default connect((state, ownProps) => {
  let members = [
      'avclub-staffer-1',
      'avclub-staffer-2',
      'avclub-staffer-3',
      'avclub-staffer-4',
      'avclub-staffer-5',
      'avclub-staffer-6',
      'avclub-staffer-7',
      'avclub-staffer-8',
      'avclub-staffer-9',
      'avclub-staffer-10'
    ];
  let tempUsers = members.map((id) => {
    return getKey(state, `users.${id}`);
  });
  let users = tempUsers.filter((el) => {return el !== undefined});
  return {
    users
  };
})(Leaderboard);
