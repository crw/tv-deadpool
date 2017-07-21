import React from 'react';
import { connect } from 'react-redux';
import { startGetUser } from 'actions';
import UserAdminListItem from 'admin/UserAdminListItem';
import SelectSeason from 'admin/SelectSeason';
import SelectEpisode from 'admin/SelectEpisode';
// import AddWagerForm from 'admin/AddWagerForm';
// import UserWagers from 'admin/UserWagers';
import UserWagers from 'admin/UserWagers';
import WagerFormContainer from 'admin/WagerFormContainer';
import UserBalance from 'admin/UserBalance';


export class UserAdmin extends React.Component {

  constructor(props) {
    super(props);

    this.handleSeasonChange = this.handleSeasonChange.bind(this)
    this.handleEpisodeChange = this.handleEpisodeChange.bind(this)
    this.fetchUserData = this.fetchUserData.bind(this)

    this.state = {
      seasonId: null,
      episodeId: null
    }
  }

  componentDidMount() {
    this.fetchUserData();
  }

  fetchUserData() {
    const {userId, user, dispatch} = this.props;
    if (!user) {
      dispatch(startGetUser(userId));
    }
  }

  handleSeasonChange(value) {
    this.setState(() => {
      return { seasonId: value };
    });
  }

  handleEpisodeChange(value) {
    this.setState(() => {
      return { episodeId: value };
    });
  }

  render() {
    const { user } = this.props;
    const { seasonId, episodeId } = this.state;

    return (
      <div className="admin user">
        <UserAdminListItem { ...user }/>
        <SelectSeason onChange={ this.handleSeasonChange }/>

        { !(user && seasonId) ? '' :
          <UserBalance balance={ user.balance[seasonId] }/>
        }

        { !seasonId ? '' :
          <SelectEpisode onChange={ this.handleEpisodeChange } seasonId={ seasonId }/>
        }

        { !(user && episodeId) ? '' :
          <div className="wagers-list">
            <div className="new-wager">
              <WagerFormContainer formId="admin-wager-form-new" episodeId={ episodeId } user={ user }/>
            </div>
            <UserWagers userId={ user.id } episodeId={ episodeId }/>
          </div>
        }
      </div>
    );
  }
}

//        <AddWagerForm onSubmit={ this.addWager } episodeId={ episodeId } />
//        <UserWagers episodeId={ episodeId }/>


function mapStateToProps(state, ownProps) {
  const { userId } = ownProps.match.params;
  const user = state.users[userId];
  return { userId, user };
};

export default connect(mapStateToProps)(UserAdmin);