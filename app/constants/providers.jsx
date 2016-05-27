import firebase from 'app/api/firebase';


export const PROVIDERS = {
  github: {
    provider: firebase.auth.GithubAuthProvider,
    scope: ['user:email']
  },
  google: {
    provider: firebase.auth.GoogleAuthProvider,
    scope: [
      'https://www.googleapis.com/auth/plus.me',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  },
  facebook: {
    provider: firebase.auth.FacebookAuthProvider,
    scope: [
      'public_profile',
      'email'
    ]
  }
};


export default PROVIDERS;