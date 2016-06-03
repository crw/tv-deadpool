import React from 'react';
import * as Redux from 'react-redux';
import * as actions from 'actions';


export class Login extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
    this.handleLoginFacebook = this.handleLoginFacebook.bind(this);
    this.handleLoginTwitter = this.handleLoginTwitter.bind(this);
  }

  handleLoginGoogle(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(actions.startLoginGoogle());
  }

  handleLoginFacebook(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(actions.startLoginFacebook());
  }

  handleLoginTwitter(e) {
    var {dispatch} = this.props;
    e.preventDefault();
    dispatch(actions.startLoginTwitter());
  }

  render() {
    return (
      <div className="callout callout-auth">
        <h3>Login to play!</h3>
        <div>
          <button className="button" onClick={this.handleLoginTwitter}>Login with <i className="fa fw fa-twitter 3x"/></button>
        </div>
        <div>
          <button className="button" onClick={this.handleLoginGoogle}>Login with <i className="fa fw fa-google 3x"/></button>
        </div>
        <div>
          <button className="button" onClick={this.handleLoginFacebook}>Login with <i className="fa fw fa-facebook 3x"/></button>
        </div>
      </div>
    );
  }
}


export default Redux.connect()(Login);