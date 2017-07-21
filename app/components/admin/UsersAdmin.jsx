import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getKey, toArray } from 'app/utils';
import { watchUsersData } from 'actions';
import UserAdminListItem from 'admin/UserAdminListItem';


export class UsersAdmin extends React.Component {

  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      searchText: ''
    }
  }

  fetchData() {
    const { dispatch } = this.props;
    dispatch(watchUsersData());
  }

  typeDownFilter(arr, search) {
    return arr.filter(item =>
      item.fakeDisplayName &&
      item.fakeDisplayName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      item.displayName &&
      item.displayName.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
  }

  updateSearch(e) {
    e.preventDefault();
    const searchText = this.textInput.value;
    this.setState((prevState, props) => {
      return {
        searchText
      };
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {

    const { users, match: { url } } = this.props;
    const { searchText } = this.state;

    let i = 1;
    const userListItems = this.typeDownFilter(toArray(users), searchText).map(user => {
      return (
        <div key={ user.id }>
          <Link to={`${url}/${user.id}`}>
            <UserAdminListItem { ...user }/>
          </Link>
        </div>
      );
    });

    return (
      <div className="admin users">
        <div className="typedown-filter">
          <input
            type="text" ref={(input) => this.textInput = input }
            placeholder="Search names..." onChange={ this.updateSearch }/>
        </div>
        { userListItems }
      </div>
    );
  }

}

function mapStateToProps(state, ownProps) {
  const { users } = state;
  return { users };
};

export default connect(mapStateToProps)(UsersAdmin);