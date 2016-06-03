import React from 'react';
import {connect} from 'react-redux';

export class Profile extends React.Component {
  static propTypes = {
    // name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let {dispatch, userId} = this.props;

    dispatch(fetchUser(userId));
  }

  render() {
    return (
      <div>
        <div className="header ">
          <div className="user-pic">
            <img src={profile_pic_url}/>
          </div>
          <div className="user-name">
            {name}
          </div>
        </div>

        <div className="score row">
          <div className="balance">
            Balance: {balance}
          </div>
          <div className="winnings">
            Winnings: {overall_winnings}
          </div>
          <div className="losses">
            Losses: {overall_losses}
          </div>
        </div>

        <EventList/>

      </div>
    );
  }
}


export default connect((state, ownProps) => {

})(Profile);