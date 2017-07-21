import React from 'react';

export default class Help extends React.Component {
  static propTypes = {

  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
      <div className="small-12 medium-8 medium-centered columns">
        <h2>Help</h2>
        <h2>How It Works</h2>
        <p>
          <b>Every Friday</b>, the AVClub posts <i><a
          href="http://www.avclub.com/features/you-win-or-you-die/" target="_blank">You
          Win Or You Die</a></i>, the list of available betting positions with official odds (and color commentary). As soon as they are uploaded to the site, the betting window is open. Everyone starts with $100 fake dollars, per the AVClub rules. Unlike the AVClub rules, our players never run out of money (see <a href="#running-out-of-money">Running Out Of Money</a>, below.)
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
          but are not actually shown to be dead. I'm looking at you, Blackfish. If the weekly article calls them out as dead, then that is good enough for this site. It also is used for the over/under, since I am not always sure who they consider a named character.
        </p>
        <p>
          Results will be tallied using an offline script. Expect updates Tuesday/Wednesday. Then we
          anxiously await Friday's article and the cycle repeats.
        </p>
        <p>
          A few notes about the wager-placing interface. You may place a wager on any position, but it is not required. Any position not taken is considered to be a wager of $0. If you want to leave a comment on a position without wagering on it, enter "0" as your wager and your comment. You can clear out a previously-funded wager by entering 0 for that wager, your money will be refunded immediately. You can change your wagers any time up to the time the episode "closes," at which point the bets are "locked" in. The special season-long bets are only available while the episode is open, once the episode closes you may not place a wager on those positions. The special season-long bets will be reconciled on the episode that they occur if they are definitively proven true or false.
        </p>
        <p>
          The cost of your wager is deducted immediately from your overall balance. If you win a wager, your wager is refunded. So, for example, if you bet $5 against 20:1 odds and win, you would receive $105 (20/1 * wager + wager).
        </p>
        <a id="running-out-of-money"/>
        <h2>Running Out Of Money</h2>
        <p>
          If you ever lose more than $100, you will be topped up to $100. This should encourage you to spend through your money; lose big this week, win big next week! To account for this "free money," the site shows stats not just for the total balace but for total money <b>lost</b> as well as <b>won</b>.
        </p>
        <h2>Change your User Name</h2>
        <p>
          To change your name, click on your username in the upper-right on the home screen.
          If you have wagered in the past, this will update the leaderboard with your new name.
          If you are a new user, the next time the leaderboards are updated, your chosen name will be used (instead of the default "A Faceless Man").
          It is not possible to use the same name as another user.
        </p>
        <h2>Legend</h2>
        <p>
          <i className="fa fa-fw fa-user"/>: You!
        </p>
        <p>
          <i className="fa fa-fw fa-question"/>: Anonymous user with randomly-generated name.
        </p>
        <h2>Having difficulties?</h2>
        <p>
          This site is barely tested. Please report issues to <a href="mailto:bugs@tvdeadpool.xyz">bugs@tvdeadpool.xyz</a>.
        </p>
        <p className="callout">
          <i><b>Valar morghulis.</b></i>
        </p>
      </div>
      </div>
    );
  }
}
