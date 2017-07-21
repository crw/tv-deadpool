import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route, Redirect, Switch } from 'react-router-dom';
import SeriesAdmin from 'admin/SeriesAdmin';
import Series from 'admin/Series';
import Season from 'admin/Season';
import Episode from 'admin/Episode';
import EditBet from 'admin/EditBet';
import UserAdmin from 'admin/UserAdmin';
import UsersAdmin from 'admin/UsersAdmin';


export class Admin extends React.Component {

  render() {

    const { match: { url } } = this.props;

    return (
      <div>
        <div className="admin-navbar row">
          <div className="small-12 columns">
            <Link to={ url + "/series" }>Series/Bets</Link>
            { ' - ' }
            <Link to={ url + "/reconcile" }>Reconcile Episode</Link>
            { ' - ' }
            <Link to={ url + "/users" }>Users</Link>
            { ' - ' }
            <Link to={ url + "/groups" }>Groups</Link>
          </div>
        </div>

        <div className="row">
          <div className="small-12 columns">
            <Switch>
              <Route exact
                path={ url + "/series/:seriesId/season/:seasonId/episode/:episodeId/bet/:betId" }
                component={ EditBet }
              />
              <Route exact
                path={ url + "/series/:seriesId/season/:seasonId/episode/:episodeId" }
                component={ Episode }
              />
              <Route exact path={ url + "/series/:seriesId/season/:seasonId" } component={ Season }/>
              <Route exact path={ url + "/series/:seriesId" } component={ Series }/>
              <Route exact path={ url + "/users/:userId" } component={ UserAdmin }/>
              <Route exact path={ url + "/users" } component={ UsersAdmin }/>
              <Route path={ url + "/series" } component={ SeriesAdmin }/>
              <Redirect from={ url } to={ url + "/series" }/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
};


export default connect()(Admin);