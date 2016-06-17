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
      <div className="login">
        <div className="title"><i className="fa fa-fw fa-sign-in"/> Login to play!</div>
        <div className="body">
          <div>
            <button className="button button__login button__twitter expanded" onClick={this.handleLoginTwitter}><i className="fa fw fa-twitter 4x"/> Twitter</button>
          </div>
          <div>
            <button className="button button__login button__google expanded" onClick={this.handleLoginGoogle}><i className="fa fw fa-google 4x"/> Google</button>
          </div>
          <div>
            <button className="button button__login button__facebook  expanded" onClick={this.handleLoginFacebook}><i className="fa fw fa-facebook 4x"/> Facebook</button>
          </div>
        </div>
      </div>
    );
  }
}


export default Redux.connect()(Login);