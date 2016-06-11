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
          Win Or You Die</a></i> feature posted weekly on the AVClub by <a
          href="http://www.avclub.com/author/Marah%20Eakin/" target="_blank">Marah Eakin</a>.
        </p>
        <p>
          TVDeadpool.xyz is an independent site being run gratis by <a
          href="https://twitter.com/c_r_w" target="_blank">Craig Wright</a>. Site update announcements will be posted from <a
          href="https://twitter.com/c0diator" target="_blank">@c0diator</a>.
        </p>
        <h2>How It Works</h2>
        <p>
          <b>Every Friday</b>, the AVClub posts <i><a
          href="http://www.avclub.com/features/you-win-or-you-die/" target="_blank">You
          Win Or You Die</a></i>, the list of available deadpool bets with official odds. Please read
          the article for its in-depth, considered analysis of the positions. As soon
          as they are uploaded to the site, the betting window is open. Everyone starts with $100 fake dollars,
          per the AVClub rules.
        </p>
        <p>
          Betting closes at <b>0050 Monday UTC (8:50pm Eastern, 5:50pm Pacific)</b>. HBO releases the show
          simultaneously in all regions, which means you can bet right up to the last minute! If the show
          leaks, the betting will be closed as soon as possible and any bets placed between the leak and
          closing will be reviewed.
        </p>
        <p>
          <b>Every Tuesday</b>, the AVClub runs another <i>Game of Thrones</i> feature, <i><a
          href="http://www.avclub.com/features/all-men-must-die/" target="_blank">All Men Must Die</a></i>,
          that covers all of the named deaths in the previous week's episode. This article will be used as the
          source-of-truth for this site. That means you will not see updated results until Tuesday, even if it
          is pretty obvious who got it. The reason is occasionally characters are seen to be dying off-screen,
          but are not actually shown to be dead. If the weekly article calls them out as dead, then that is good
          enough for this site. It also is used for the over/under, since I am not always sure who they consider
          a named character.
        </p>
        <p>
          Results will be tallied using an offline script. Expect updates Tuesday/Wednesday. Then we
          anxiously await Friday's article and the cycle repeats.
        </p>
        <p>
          A few notes about the wager-placing interface. You may place a wager on any position, but it is not required.
          Any position not taken is considered to be a wager of $0. If you want to leave a comment on a position without
          wagering on it, enter "0" as your wager and your comment. You can change your wagers any time up to the time the episode closes, at
          which point the bets are "locked" in. The special season-long bets are only available while the episode is open,
          once the episode closes you may not place a wager on those positions. The special season-long bets will be reconciled
          on the episode that they occur if they are definitively proven true or false.
        </p>
        <p>
          The cost of your wager is deducted immediately from your overall balance. If you win a wager, your wager is refunded.
          So, for example, if you bet $5 against 20:1 odds and win, you would receive $105 (20/1 * wager + wager).
        </p>
        <h2>Why?</h2>
        <p>
          Purely for your own entertainment. This is not a real betting site. The dollar amount is just a means of
          keeping score.
        </p>
        <p>
          You may also ask, "why now," with only <strike>four</strike> three episodes left in the season. Unfortunately, I didn't start
          working on this until just before the sixth episode. If this is popular enough,
          and they finish Season 7 before GRRM finishes the next book, and the AVClub keeps
          writing this feature or I somehow get a professional bookie to make odds, we can start fresh next season!
          Theoretically, this site could be used for any kind of bets on other shows or events as well.
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
