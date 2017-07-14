import React from 'react';

export default class About extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
      <div className="small-12 medium-8 medium-centered columns">
        <p className="callout alert">
          <b>DISCLAIMER: This site is not associated with <a href="http://avclub.com" target="_blank">AVClub.com</a>.</b>
        </p>
        <h2>Brief Intro</h2>
        <p>
          Welcome TVDeadpool.xyz, the television show deadpool fake-money betting site,
          inspired by the <i><a href="http://www.avclub.com/features/you-win-or-you-die/" target="_blank">You
          Win Or You Die</a></i> feature posted weekly on the AVClub.
        </p>
        <p>
          TVDeadpool.xyz is an independent site being run gratis by <a
          href="https://twitter.com/c_r_w" target="_blank">Craig Wright</a>. Site update announcements will be posted from <a
          href="https://twitter.com/c0diator" target="_blank">@c0diator</a>.
        </p>

        <h2>Why?</h2>
        <p>
          Purely for your own entertainment. This is not a real betting site. The dollar amount is just a means of keeping score.
        </p>
        <h2>Having difficulties?</h2>
        <p>
          This site is barely tested. Please report issues to <a href="mailto:bugs@tvdeadpool.xyz">bugs@tvdeadpool.xyz</a>.
        </p>
        <h2>Acknowledgements</h2>
        <p>
          Thanks to Marah Eakin, Caitlin PenzeyMoog, Katie Rife, Myles McNutt and the staff of the AVClub for
          their comprehensive coverage of the <i>Game of Thrones</i> series. Thanks to oddsmaker Benjamin Eckstein.
          Thanks to the amazing community of commentors on the AVClub, you are an inspiration.
        </p>
        <p>
          Thanks to <a href="http://reddit.com/r/gameofthrones" target="_blank">reddit.com/r/gameofthrones</a> for showing up!
          Y'all are my fan-theory heroes. Stay hype.
        </p>
        <p>
          Thanks also to <a href="http://mead.io" target="_blank">Andrew Mead</a> for
          his <a href="https://www.udemy.com/the-complete-react-web-app-developer-course/" target="_blank">Udemy course on React</a>.
          Credit also to <a href="http://fontawesome.io/" target="_blank">Font Awesome</a> for the great icons
          and <a href="http://allfreefont.com/fonts/13629/game_of_thrones.php" target="_blank">Game of Thrones font</a> by <a href="http://allfreefont.com/search.php?d=1&q=Charlie+Samways" target="_blank">Charlie
          Samways</a>.
        </p>
        <p className="callout">
          <i><b>Valar morghulis.</b></i>
        </p>
      </div>
      </div>
    );
  }
}
